import { applyMiddleware, combineReducers, createStore } from "redux";
import { TypeUserInfoReducer, userInfoReducer } from "../reducers/UserInfo";
import { TypeFeedListReducer, feedListReducer } from "../reducers/FeedList";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  feedList: feedListReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export type TypeRootReducer = {
  userInfo: TypeUserInfoReducer;
  feedList: TypeFeedListReducer;
};
