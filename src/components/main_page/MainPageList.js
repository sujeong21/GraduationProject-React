import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LeftArrow from "../../img/LeftArrow";
import RightArrow from "../../img/RightArrow";
import { MainPageContext } from "../provider/MainPageProvider";

const MainPageList = ({ title, index }) => {
  const [x, setX] = useState(0);
  const [clickCnt, setClickCnt] = useState(1);

  const { movieList, setMovieList } = useContext(MainPageContext);

  useEffect(() => {
    console.log(movieList);
  }, []);

  return (
    <div className="list_background">
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
        {clickCnt < movieList[index].movieList.length / 5 && (
          <div
            className="move_to_right"
            onClick={() => {
              if (clickCnt === movieList[index].movieList.length / 5 - 1) {
                axios
                  .get("https://yts.mx/api/v2/list_movies.json", {
                    params: {
                      limit: 20,
                      page: movieList[index].pageNumber + 1,
                      sort_by: "rating",
                      order_by: "desc",
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
          {movieList &&
            movieList.length > 0 &&
            movieList[index].movieList.map((item, idx) => {
              return (
                <div className="movie_item" id={idx}>
                  <img src={item.small_cover_image} className="cover_image" />
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
