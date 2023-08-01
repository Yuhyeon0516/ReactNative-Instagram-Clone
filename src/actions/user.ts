import { FeedInfo } from "../@types/FeedInfo";
import { UserInfo } from "../@types/UserInfo";
import { TypeRootReducer } from "../store/store";
import { sleep } from "../utils/sleep";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export const SET_USER_INFO = "SET_USER_INFO" as const;
export const GET_MY_FEED_REQUEST = "GET_MY_FEED_REQUEST" as const;
export const GET_MY_FEED_SUCCESS = "GET_MY_FEED_SUCCESS" as const;
export const GET_MY_FEED_FAILURE = "GET_MY_FEED_FAILURE" as const;

export function setUserInfo(user: UserInfo) {
  return {
    type: SET_USER_INFO,
    user,
  };
}

export function getMyFeedRequest() {
  return {
    type: GET_MY_FEED_REQUEST,
  };
}

export function getMyFeedSuccess(list: FeedInfo[]) {
  return {
    type: GET_MY_FEED_SUCCESS,
    list,
  };
}

export function getMyFeedFailure() {
  return {
    type: GET_MY_FEED_FAILURE,
  };
}

export const signIn = (): TypeUserInfoThunkAction => async (dispatch) => {
  await sleep(1000);
  dispatch(
    setUserInfo({
      uid: "TEST_UID",
      name: "TEST_NAME",
      profileImage: "Test_ProfileImage",
    })
  );
};

export const getMyFeedList = (): TypeUserInfoThunkAction => async (dispatch) => {
  dispatch(getMyFeedRequest());
  await sleep(1000);
  dispatch(
    getMyFeedSuccess([
      {
        id: "ID1",
        content: "Content1",
        writer: {
          name: "Writer1",
          uid: "UID1",
        },
        image: "https://docs.expo.dev/static/images/tutorial/background-image.png",
        likeHistory: ["UID1", "UID2"],
        createdAt: new Date().getTime(),
      },
      {
        id: "ID2",
        content: "Content2",
        writer: {
          name: "Writer2",
          uid: "UID2",
        },
        image: "https://docs.expo.dev/static/images/tutorial/background-image.png",
        likeHistory: ["UID1", "UID2", "UID3"],
        createdAt: new Date().getTime(),
      },
    ])
  );
};

export type TypeUserInfoDispatch = ThunkDispatch<TypeRootReducer, undefined, TypeUserInfoActions>;
export type TypeUserInfoThunkAction = ThunkAction<Promise<void>, TypeRootReducer, undefined, TypeUserInfoActions>;
export type TypeUserInfoActions =
  | ReturnType<typeof setUserInfo>
  | ReturnType<typeof getMyFeedRequest>
  | ReturnType<typeof getMyFeedSuccess>
  | ReturnType<typeof getMyFeedFailure>;
