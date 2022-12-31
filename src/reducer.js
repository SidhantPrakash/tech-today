const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_STORIES":
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case "REMOVE_POST":
      return {
        ...state,
        hits: state.hits.filter(
          (newsItem) => newsItem.objectID !== action.payload
        ),
      };
    case "SEARCH_POST":
      return {
        ...state,
        query: action.payload,
      };
    case "NEXT_PAGE":
      let pageNumInc = state.page + 1;
      if (pageNumInc >= state.nbPages) {
        pageNumInc = state.nbPages - 1;
      }
      return {
        ...state,
        page: pageNumInc,
      };
    case "PREV_PAGE":
      let pageNumDec = state.page - 1;
      if (pageNumDec <= 0) {
        pageNumDec = 0; //when displayed in pagination btn, it is made +1
      }
      return {
        ...state,
        page: pageNumDec,
      };
    default:
      return state;
  }
};

export default reducer;
