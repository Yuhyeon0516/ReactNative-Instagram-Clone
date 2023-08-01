import { FeedInfo } from "../@types/FeedInfo";
import { UserInfo } from "../@types/UserInfo";
import { TypeRootReducer } from "../store/store";
import { sleep } from "../utils/sleep";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

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

export const signIn =
  (idToken: string): TypeUserInfoThunkAction =>
  async (dispatch) => {
    // await sleep(1000);
    // dispatch(
    //   setUserInfo({
    //     uid: "TEST_UID",
    //     name: "TEST_NAME",
    //     profileImage: "Test_ProfileImage",
    //   })
    // );

    const googleSignInCredential = auth.GoogleAuthProvider.credential(idToken);
    const signInResult = await auth().signInWithCredential(googleSignInCredential);

    const userDB = await database().ref(`/users/${signInResult.user.uid}`);

    const user = await userDB.once("value").then((snapshot) => snapshot.val());

    const now = new Date().getTime();

    if (!user) {
      await userDB.set({
        name: signInResult.user.displayName,
        profileImage: signInResult.user.photoURL,
        uid: signInResult.user.uid,
        createdAt: now,
        lastLoginAt: now,
      });
    } else {
      await userDB.update({
        lastLoginAt: now,
      });
    }

    dispatch(
      setUserInfo({
        uid: signInResult.user.uid,
        name: signInResult.user.displayName ?? "Unknown",
        profileImage: signInResult.user.photoURL ?? "",
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
