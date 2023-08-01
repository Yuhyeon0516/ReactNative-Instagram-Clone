const defaultFeedListState = {
  list: [],
};

export function feedListReducer(state = defaultFeedListState, action: any) {
  return {
    ...state,
  };
}
