import { FeedInfo } from "../@types/FeedInfo";
import { UserInfo } from "../@types/UserInfo";
import { TypeUserInfoActions } from "../actions/user";

const defaultUserInfoState: TypeUserInfoReducer = {
  userInfo: null,
  myFeedList: [],
};

export function userInfoReducer(state: TypeUserInfoReducer = defaultUserInfoState, action: TypeUserInfoActions) {
  return {
    ...state,
  };
}

export type TypeUserInfoReducer = {
  userInfo: UserInfo | null;
  myFeedList: FeedInfo[];
};
