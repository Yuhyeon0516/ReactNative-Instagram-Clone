import { FeedInfo } from "../@types/FeedInfo";
import { TypeRootReducer } from "../store/store";
import { sleep } from "../utils/sleep";
import { ThunkAction } from "redux-thunk";

export const GET_FEED_LIST_REQUEST = "GET_FEED_LIST_REQUEST" as const;
export const GET_FEED_LIST_SUCCESS = "GET_FEED_LIST_SUCCESS" as const;
export const GET_FEED_LIST_FAILURE = "GET_FEED_LIST_FAILURE" as const;

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
export type TypeFeedListThunkAction = ThunkAction<void, TypeRootReducer, undefined, TypeFeedListActions>;
export type TypeFeedListActions = ReturnType<typeof getFeedListRequest> | ReturnType<typeof getFeedListSuccess> | ReturnType<typeof getFeedListFailure>;
