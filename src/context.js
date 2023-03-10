// context creation
// provider
// consumer
// useContext hook

import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

const API = "http://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  query: "HTML",
  nbPages: 0,
  page: 0,
  hits: [],
};

const AppContext = React.createContext();

// to create a provider function
const AppProvider = ({ children }) => {
  // const [state, setstate] = useState(initialState);

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchApiData = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "GET_STORIES",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
      // isLoading = false;
    } catch (error) {
      console.log(error);
    }
  };

  // to remove the post
  const removePost = (post_id) => {
    dispatch({ type: "REMOVE_POST", payload: post_id });
  };

  // search
  const searchPost = (searchQuery) => {
    dispatch({ type: "SEARCH_POST", payload: searchQuery });
  };

  // Pagination
  const getNextPage = () => {
    dispatch({ type: "NEXT_PAGE" });
  };
  const getPrevPage = () => {
    dispatch({ type: "PREV_PAGE" });
  };

  // to call the API
  useEffect(() => {
    fetchApiData(`${API}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, removePost, searchPost, getPrevPage, getNextPage }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook creation
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
