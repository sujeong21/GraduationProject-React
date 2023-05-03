import { createContext } from "react";

export const MainPageContext = createContext({
  movieList: [],
  setMovieList: (obj) => {},
  searchData: "",
  setSearchData: (obj) => {},
  isLoading: false,
  setIsLoading: (obj) => {},
  searchList: {},
  setSearchList: (obj) => {},
});

const MainPageContextProvider = ({
  children,
  movieList,
  setMovieList,
  searchData,
  setSearchData,
  isLoading,
  setIsLoading,
  searchList,
  setSearchList,
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
        searchList: searchList,
        setSearchList: setSearchList,
      }}
    >
      {children}
    </MainPageContext.Provider>
  );
};

export default MainPageContextProvider;
