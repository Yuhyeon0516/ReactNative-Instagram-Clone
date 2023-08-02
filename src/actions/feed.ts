import { FeedInfo } from "../@types/FeedInfo";
import { TypeRootReducer } from "../store/store";
import { sleep } from "../utils/sleep";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import { Platform } from "react-native";

export const GET_FEED_LIST_REQUEST = "GET_FEED_LIST_REQUEST" as const;
export const GET_FEED_LIST_SUCCESS = "GET_FEED_LIST_SUCCESS" as const;
export const GET_FEED_LIST_FAILURE = "GET_FEED_LIST_FAILURE" as const;

export const CREATE_FEED_REQUEST = "CREATE_FEED_REQUEST" as const;
export const CREATE_FEED_SUCCESS = "CREATE_FEED_SUCCESS" as const;
export const CREATE_FEED_FAILURE = "CREATE_FEED_FAILURE" as const;

export const FAVORITE_FEED_REQUEST = "FAVORITE_FEED_REQUEST" as const;
export const FAVORITE_FEED_SUCCESS = "FAVORITE_FEED_SUCCESS" as const;
export const FAVORITE_FEED_FAILURE = "FAVORITE_FEED_FAILURE" as const;

export function getFeedListRequest() {
  return {
    type: GET_FEED_LIST_REQUEST,
  };
}

export function getFeedListSuccess(list: FeedInfo[]) {
  return {
    type: GET_FEED_LIST_SUCCESS,
    list,
  };
}

export function getFeedListFailure() {
  return {
    type: GET_FEED_LIST_FAILURE,
  };
}

export const getFeedList = (): TypeFeedListThunkAction => async (dispatch) => {
  dispatch(getFeedListRequest());

  const lastFeedList = await database()
    .ref("/feed")
    .once("value")
    .then((snapshot) => snapshot.val());

  const result = Object.keys(lastFeedList).map((key) => {
    return {
      ...lastFeedList[key],
      id: key,
      likeHistory: lastFeedList[key].likeHistory ?? [],
    };
  });

  dispatch(getFeedListSuccess(result.sort((a: FeedInfo, b: FeedInfo) => b.createdAt - a.createdAt)));
};

export function createFeedRequest() {
  return {
    type: CREATE_FEED_REQUEST,
  };
}

export function createFeedSuccess(item: FeedInfo) {
  return {
    type: CREATE_FEED_SUCCESS,
    item,
  };
}

export function createFeedFailure() {
  return {
    type: CREATE_FEED_FAILURE,
  };
}

export const createFeed =
  (item: Omit<FeedInfo, "id" | "writer" | "createdAt" | "likeHistory">): TypeFeedListThunkAction =>
  async (dispatch, getState) => {
    dispatch(createFeedRequest());
    const createdAt = new Date().getTime();
    const userInfo = getState().userInfo.userInfo;
    const pickPhotoUrlList = item.image.split("/");
    const pickPhotoFileName = pickPhotoUrlList[pickPhotoUrlList.length - 1];

    const putFileUrl = await storage()
      .ref(pickPhotoFileName)
      .putFile(Platform.OS === "ios" ? item.image.replace("file://", "") : item.image)
      .then((result) => {
        return storage().ref(result.metadata.fullPath).getDownloadURL();
      });

    const feedDB = await database().ref("/feed");
    const saveItem: Omit<FeedInfo, "id"> = {
      content: item.content,
      writer: {
        name: userInfo?.name || "Unknown",
        uid: userInfo?.uid || "Unknown",
      },
      image: putFileUrl,
      likeHistory: [],
      createdAt: createdAt,
    };

    await feedDB.push().set({
      ...saveItem,
    });

    const lastFeedList = await feedDB.once("value").then((snapshot) => snapshot.val());

    Object.keys(lastFeedList).forEach((key) => {
      const item = lastFeedList[key];

      if (item.createdAt === createdAt && putFileUrl === item.image) {
        dispatch(
          createFeedSuccess({
            id: key,
            content: item.content,
            writer: item.writer,
            image: item.image,
            likeHistory: item.likeHistory ?? [],
            createdAt,
          })
        );
      }
    });
  };

export function favoriteFeedRequest() {
  return {
    type: FAVORITE_FEED_REQUEST,
  };
}

export function favoriteFeedSuccess(feedId: FeedInfo["id"], myId: string, action: "add" | "delete") {
  return {
    type: FAVORITE_FEED_SUCCESS,
    feedId,
    myId,
    action,
  };
}

export function favoriteFeedFailure() {
  return {
    type: FAVORITE_FEED_FAILURE,
  };
}

export const favoriteFeed =
  (item: FeedInfo): TypeFeedListThunkAction =>
  async (dispatch, getState) => {
    dispatch(favoriteFeedRequest());

    const myId = getState().userInfo.userInfo?.uid || null;

    if (!myId) {
      dispatch(favoriteFeedFailure());
      return;
    }

    const feedDB = database().ref(`/feed/${item.id}`);
    const feedItem = (await feedDB.once("value").then((snapshot) => snapshot.val())) as FeedInfo;

    if (!feedItem.likeHistory) {
      await feedDB.update({
        likeHistory: [myId],
      });
      dispatch(favoriteFeedSuccess(item.id, myId, "add"));
    } else {
      const hasMyId = feedItem.likeHistory.filter((likeUserId) => likeUserId === myId).length > 0;
      if (hasMyId) {
        await feedDB.update({
          likeHistory: feedItem.likeHistory.filter((likeUserId) => likeUserId !== myId),
        });

        dispatch(favoriteFeedSuccess(item.id, myId, "delete"));
      } else {
        await feedDB.update({
          likeHistory: feedItem.likeHistory.concat([myId]),
        });

        dispatch(favoriteFeedSuccess(item.id, myId, "add"));
      }
    }
  };

export type TypeFeedListDispatch = ThunkDispatch<TypeRootReducer, undefined, TypeFeedListActions>;
export type TypeFeedListThunkAction = ThunkAction<void, TypeRootReducer, undefined, TypeFeedListActions>;
export type TypeFeedListActions =
  | ReturnType<typeof getFeedListRequest>
  | ReturnType<typeof getFeedListSuccess>
  | ReturnType<typeof getFeedListFailure>
  | ReturnType<typeof createFeedRequest>
  | ReturnType<typeof createFeedSuccess>
  | ReturnType<typeof createFeedFailure>
  | ReturnType<typeof favoriteFeedRequest>
  | ReturnType<typeof favoriteFeedSuccess>
  | ReturnType<typeof favoriteFeedFailure>;
