import { useSelector } from "react-redux";
import { TypeRootReducer } from "../store/store";
import { FeedInfo } from "../@types/FeedInfo";

export const useTotalFeedList = () =>
  useSelector<TypeRootReducer, FeedInfo[]>((state) => {
    return state.feedList.list.sort((a, b) => b.createdAt - a.createdAt);
  });
