import { createContext, useState } from "react";

export const MainPageContext = createContext({
  movieList: [],
  setMovieList: (obj) => {},
  searchData: "",
  setSearchData: (obj) => {},
  isLoading: false,
  setIsLoading: (obj) => {},
});

const MainPageContextProvider = ({
  children,
  movieList,
  setMovieList,
  searchData,
  setSearchData,
  isLoading,
  setIsLoading,
}) => {
  return (
    <MainPageContext.Provider
      value={{
        movieList: movieList,
        setMovieList: setMovieList,
        searchData: searchData,
        setSearchData: setSearchData,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
      }}
    >
      {children}
    </MainPageContext.Provider>
  );
};

export default MainPageContextProvider;
