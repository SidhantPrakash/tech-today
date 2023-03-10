import React from "react";
import { useGlobalContext } from "./context";

const Search = () => {
  const { query, searchPost } = useGlobalContext();
  return (
    <>
      <div>
        <h1>Tech Today</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              placeholder="Search Here"
              value={query}
              onChange={(e) => searchPost(e.target.value)}
            ></input>
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
