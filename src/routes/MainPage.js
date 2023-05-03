import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { genres } from "../App";
import MainPageHeader from "../components/main_page/MainPageHeader";
import MainPageList from "../components/main_page/MainPageList";
import MainPageSkeleton from "../components/main_page/MainPageSkeleton";
import MainPageContextProvider from "../components/provider/MainPageProvider";
import "../css/MainPage.css";
import "react-loading-skeleton/dist/skeleton.css";

const MainPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [searchList, setSearchList] = useState();

  function setMovies() {
    genres.map((item, index) => {
      if (index === 0) {
        axios
          .get("https://yts.mx/api/v2/list_movies.json", {
            params: {
              limit: 20,
              sort_by: "rating",
              order_by: "desc",
            },
          })
          .then((res) => {
            setMovieList((m) => [
              ...m,
              {
                movieList: res.data.data.movies,
                pageNumber: res.data.data.page_number,
                movieCnt: res.data.data.movie_count,
              },
            ]);
          });
      } else {
        axios
          .get("https://yts.mx/api/v2/list_movies.json", {
            params: {
              limit: 20,
              genre: item,
              sort_by: "date_added",
              order_by: "desc",
            },
          })
          .then((res) => {
            setMovieList((m) => [
              ...m,
              {
                movieList: res.data.data.movies,
                pageNumber: res.data.data.page_number,
                movieCnt: res.data.data.movie_count,
              },
            ]);
          });
      }
    });
  }

  useEffect(() => {
    setMovies();
  }, []);

  useEffect(() => {
    if (movieList.length === genres.length) {
      setIsLoading(true);
    }
  }, [movieList]);

  useEffect(() => {
    console.log("=======================");
    console.log(searchList);
    console.log("=======================");
    if (searchList && searchList.movieList) {
      setIsLoading(true);
    }
  }, [searchList]);

  return (
    <MainPageContextProvider
      movieList={movieList}
      setMovieList={setMovieList}
      searchData={searchData}
      setSearchData={setSearchData}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      searchList={searchList}
      setSearchList={setSearchList}
    >
      <div className="background_list">
        <MainPageHeader />
        {searchData === "" ? (
          isLoading ? (
            genres.map((item, index) => {
              if (index === 0) {
                return <MainPageList key={index} title={item} index={index} />;
              } else {
                return (
                  <MainPageList
                    key={index}
                    title={`장르 - ${item}`}
                    index={index}
                    isSearch={false}
                  />
                );
              }
            })
          ) : (
            genres.map((item, index) => {
              return <MainPageSkeleton key={index} />;
            })
          )
        ) : (
          <div className="search_page">
            {isLoading ? (
              <MainPageList key={0} title={"검색 결과"} isSearch={true} />
            ) : (
              <MainPageSkeleton />
            )}
          </div>
        )}
      </div>
    </MainPageContextProvider>
  );
};

export default MainPage;
