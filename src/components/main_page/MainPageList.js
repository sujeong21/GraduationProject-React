import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { genres } from "../../App";
import LeftArrow from "../../img/LeftArrow";
import RightArrow from "../../img/RightArrow";
import { MainPageContext } from "../provider/MainPageProvider";

const MainPageList = ({ title, index, isSearch }) => {
  const [x, setX] = useState(0);
  const [clickCnt, setClickCnt] = useState(1);

  const { movieList, setMovieList, searchList, setSearchList } =
    useContext(MainPageContext);

  return (
    <div className="list_background" style={{ zIndex: 100 - index * 2 }}>
      <div className="list_title_text">{title}</div>
      <div className="movie_list">
        {x < 0 && (
          <div
            className="move_to_left"
            onClick={() => {
              setX(x + (window.innerWidth - 220 + 15));
              setClickCnt(clickCnt - 1);
            }}
          >
            <LeftArrow />
          </div>
        )}
        {!isSearch
          ? clickCnt < movieList[index].movieList.length / 5 && (
              <div
                className="move_to_right"
                onClick={() => {
                  if (isSearch) {
                    if (clickCnt === searchList.movieList.length / 5 - 1) {
                      axios
                        .get("https://yts.mx/api/v2/list_movies.json", {
                          params: {
                            limit: 20,
                            page: searchList.pageNumber + 1,
                            sort_by: "rating",
                            order_by: "desc",
                          },
                        })
                        .then((res) => {
                          var searchs = { ...searchList };
                          searchs.pageNumber = res.data.data.page_number;
                          searchs.movieList = [
                            ...searchs.movieList,
                            ...res.data.data.movies,
                          ];
                          setSearchList(searchs);
                        });
                    }
                  } else {
                    if (
                      clickCnt ===
                      movieList[index].movieList.length / 5 - 1
                    ) {
                      axios
                        .get("https://yts.mx/api/v2/list_movies.json", {
                          params: {
                            limit: 20,
                            page: movieList[index].pageNumber + 1,
                            sort_by: "rating",
                            order_by: "desc",
                            genre: index > 0 ? genres[index] : undefined,
                          },
                        })
                        .then((res) => {
                          var movies = [...movieList];
                          movies[index].pageNumber = res.data.data.page_number;
                          movies[index].movieList = [
                            ...movies[index].movieList,
                            ...res.data.data.movies,
                          ];
                          console.log(movies[index].movieList);
                          setMovieList(movies);
                        });
                    }
                  }
                  setX(x - (window.innerWidth - 220 + 15));
                  console.log(window.innerWidth);
                  setClickCnt(clickCnt + 1);
                }}
              >
                <RightArrow />
              </div>
            )
          : clickCnt < searchList.movieList.length / 5 && (
              <div
                className="move_to_right"
                onClick={() => {
                  if (isSearch) {
                    if (clickCnt === searchList.movieList.length / 5 - 1) {
                      axios
                        .get("https://yts.mx/api/v2/list_movies.json", {
                          params: {
                            limit: 20,
                            page: searchList.pageNumber + 1,
                            sort_by: "rating",
                            order_by: "desc",
                          },
                        })
                        .then((res) => {
                          var searchs = { ...searchList };
                          searchs.pageNumber = res.data.data.page_number;
                          searchs.movieList = [
                            ...searchs.movieList,
                            ...res.data.data.movies,
                          ];
                          setSearchList(searchs);
                        });
                    }
                  } else {
                    if (
                      clickCnt ===
                      movieList[index].movieList.length / 5 - 1
                    ) {
                      axios
                        .get("https://yts.mx/api/v2/list_movies.json", {
                          params: {
                            limit: 20,
                            page: movieList[index].pageNumber + 1,
                            sort_by: "rating",
                            order_by: "desc",
                            genre: index > 0 ? genres[index] : undefined,
                          },
                        })
                        .then((res) => {
                          var movies = [...movieList];
                          movies[index].pageNumber = res.data.data.page_number;
                          movies[index].movieList = [
                            ...movies[index].movieList,
                            ...res.data.data.movies,
                          ];
                          console.log(movies[index].movieList);
                          setMovieList(movies);
                        });
                    }
                  }
                  setX(x - (window.innerWidth - 220 + 15));
                  console.log(window.innerWidth);
                  setClickCnt(clickCnt + 1);
                }}
              >
                <RightArrow />
              </div>
            )}
        <div
          className="track"
          style={{
            transform: `translateX(${x}px)`,
          }}
        >
          {isSearch
            ? searchList &&
              searchList.movieList &&
              searchList.movieList.map((item, idx) => {
                return (
                  <div
                    className="movie_item"
                    key={idx}
                    onClick={() => {
                      console.log("Clicked!", item);
                      window.location = `/detail/${item.id}`;
                    }}
                  >
                    <div className="cover_image_container">
                      <img
                        src={item.large_cover_image}
                        className="cover_image"
                      />
                    </div>
                    <div className="move_item_container">
                      <div>
                        {item.title && item.title.length > 20
                          ? item.title.substring(0, 20) + "..."
                          : item.title}
                      </div>
                      <div className="move_item_date">
                        <div>
                          {item.date_uploaded &&
                            item.date_uploaded.substring(0, 10)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : movieList &&
              movieList.length > 0 &&
              movieList[index].movieList.map((item, idx) => {
                return (
                  <div
                    className="movie_item"
                    key={idx}
                    onClick={() => {
                      console.log("Clicked!", item);
                      window.location = `/detail/${item.id}`;
                    }}
                  >
                    <div className="cover_image_container">
                      <img
                        src={item.large_cover_image}
                        className="cover_image"
                      />
                    </div>
                    <div className="move_item_container">
                      <div>
                        {item.title && item.title.length > 20
                          ? item.title.substring(0, 20) + "..."
                          : item.title}
                      </div>
                      <div className="move_item_date">
                        <div>
                          {item.date_uploaded &&
                            item.date_uploaded.substring(0, 10)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default MainPageList;
