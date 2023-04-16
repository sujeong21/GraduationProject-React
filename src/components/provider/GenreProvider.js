import React from "react";

import { createContext } from "react";

export const GenreContext = createContext({
  movieList: [],
  setMovieList: (obj) => {},
  isLoading: false,
  setIsLoading: (obj) => {},
});

const GenreContextProvider = ({
  children,
  movieList,
  setMovieList,
  isLoading,
  setIsLoading,
}) => {
  return (
    <GenreContext.Provider
      value={{
        movieList: movieList,
        setMovieList: setMovieList,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
};

export default GenreContextProvider;
