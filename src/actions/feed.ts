import { FeedInfo } from "../@types/FeedInfo";
import { TypeRootReducer } from "../store/store";
import { sleep } from "../utils/sleep";
import { ThunkAction } from "redux-thunk";

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
  await sleep(500);

  dispatch(
    getFeedListSuccess([
      {
        id: "ID1",
        content: "Content1",
        writer: {
          name: "Writer1",
          uid: "UID1",
        },
        image: "ImageURL1",
        likeHistory: ["UID1", "UID2", "UID3"],
        createdAt: new Date().getTime(),
      },
      {
        id: "ID2",
        content: "Content2",
        writer: {
          name: "Writer2",
          uid: "UID2",
        },
        image: "ImageURL2",
        likeHistory: ["UID1", "UID2", "UID3"],
        createdAt: new Date().getTime(),
      },
      {
        id: "ID3",
        content: "Content3",
        writer: {
          name: "Writer3",
          uid: "UID3",
        },
        image: "ImageURL3",
        likeHistory: ["UID1", "UID2", "UID3"],
        createdAt: new Date().getTime(),
      },
    ])
  );
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
    const createAt = new Date().getTime();
    const userInfo = getState().userInfo.userInfo;
    await sleep(1000);
    dispatch(
      createFeedSuccess({
        id: "ID-010",
        content: item.content,
        writer: {
          name: userInfo?.name ?? "Unknown",
          uid: userInfo?.uid ?? "Unknown",
        },
        image: item.image,
        likeHistory: [],
        createdAt: createAt,
      })
    );
  };

export function favoriteFeedRequest() {
  return {
    type: FAVORITE_FEED_REQUEST,
  };
}

export function favoriteFeedSuccess(feedId: FeedInfo["id"]) {
  return {
    type: FAVORITE_FEED_SUCCESS,
    feedId,
  };
}

export function favoriteFeedFailure() {
  return {
    type: FAVORITE_FEED_FAILURE,
  };
}

export const favoriteFeed =
  (item: FeedInfo): TypeFeedListThunkAction =>
  async (dispatch) => {
    dispatch(favoriteFeedRequest());
    await sleep(1000);
    dispatch(favoriteFeedSuccess(item.id));
  };

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
