import { useSelector } from "react-redux";
import { TypeRootReducer } from "../store/store";
import { FeedInfo } from "../@types/FeedInfo";
import { UserInfo } from "../@types/UserInfo";

export const useMyFeedList = () =>
  useSelector<TypeRootReducer, FeedInfo[]>((state) => {
    return state.userInfo.myFeedList;
  });

export const useMyInfo = () =>
  useSelector<TypeRootReducer, UserInfo | null>((state) => {
    return state.userInfo.userInfo;
  });
