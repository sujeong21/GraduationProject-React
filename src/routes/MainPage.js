import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { genres } from "../App";
import MainPageHeader from "../components/main_page/MainPageHeader";
import MainPageList from "../components/main_page/MainPageList";
import MainPageSkeleton from "../components/main_page/MainPageSkeleton";
import MainPageContextProvider, {
  MainPageContext,
} from "../components/provider/MainPageProvider";
import "../css/MainPage.css";
import "react-loading-skeleton/dist/skeleton.css";

const MainPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState("");

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
            // movies.push({
            //   movieList: res.data.data.movies,
            //   pageNumber: res.data.data.page_number,
            //   movieCnt: res.data.data.movie_count,
            // });
            // console.log(movies);
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
            // console.log(item);
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

/*   useEffect(() => {
     if (searchData === "") {
       setIsLoading(true);
     }
  }, [searchData]);
 */
  return (
    <MainPageContextProvider
      movieList={movieList}
      setMovieList={setMovieList}
      searchData={searchData}
      setSearchData={setSearchData}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    >
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
                />
              );
            }
          })
        ) : (
          genres.map((item) => {
            return <MainPageSkeleton />;
          })
        )
      ) : (
        <div className="search_page">
          {isLoading ? <></> : <MainPageSkeleton />}
        </div>
      )}
    </MainPageContextProvider>
  );
};

export default MainPage;
