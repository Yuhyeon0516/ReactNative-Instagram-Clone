import { FeedInfo } from "../@types/FeedInfo";
import { TypeFeedListActions } from "../actions/feed";

const defaultFeedListState: TypeFeedListReducer = {
  list: [],
};

export function feedListReducer(state: TypeFeedListReducer = defaultFeedListState, action: TypeFeedListActions) {
  return {
    ...state,
  };
}

export type TypeFeedListReducer = {
  list: FeedInfo[];
};
