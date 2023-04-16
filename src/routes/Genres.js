import axios from "axios";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { genres } from "../App";
import GenreHeader from "../components/genre/GenreHeader";
import GenreItem from "../components/genre/GenreItem";
import GenreItemSkeleton from "../components/genre/GenreItemSkeleton";
import GenreContextProvider from "../components/provider/GenreProvider";
import "../css/Genres.css";
import "aos/dist/aos.css";
import Aos from "aos";

const Genres = () => {
  const [movieList, setMovieList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isScrollBottom, setIsScrollBottom] = useState(false);

  const ref = useRef();

  const { genre } = useParams();

  const refs = useRef([]);

  useEffect(() => {
    if (isLoading === true) {
      setIsLoading(false);
    }
    getList();
  }, [genre]);

  function getList() {
    axios
      .get("https://yts.mx/api/v2/list_movies.json", {
        params: {
          limit: 20,
          sort_by: "rating",
          order_by: "desc",
          genre: genre,
        },
      })
      .then((res) => {
        setMovieList({
          movieList: res.data.data.movies,
          pageNumber: res.data.data.page_number,
          movieCnt: res.data.data.movie_count,
        });
      });
  }

  function getListMore(page) {
    axios
      .get("https://yts.mx/api/v2/list_movies.json", {
        params: {
          limit: 20,
          page: page,
          sort_by: "rating",
          order_by: "desc",
          genre: genre,
        },
      })
      .then((res) => {
        var movies = { ...movieList };
        movies.pageNumber = res.data.data.page_number;
        movies.movieList = [...movies.movieList, ...res.data.data.movies];
        console.log(movies.movieList);
        setMovieList(movies);
        setIsScrollBottom(false);
      });
  }

  const listenScrollEvent = () => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    // IE에서는 document.documentElement 를 사용.
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
    if (scrollHeight - innerHeight - scrollTop < 100) {
      setIsScrollBottom(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    Aos.init();

    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      ref.current.classList.add("loading");
    } else {
      ref.current.classList.remove("loading");
    }
  }, [isLoading]);

  useEffect(() => {
    if (movieList) {
      setIsLoading(true);
    }
    console.log(movieList);
  }, [movieList]);

  useEffect(() => {
    if (isScrollBottom === true && movieList) {
      getListMore(movieList.pageNumber + 1);
    }
  }, [isScrollBottom]);

  return (
    <GenreContextProvider
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      movieList={movieList}
      setMovieList={setMovieList}
    >
      <div ref={ref} className="genre_background">
        <GenreHeader />
        {isLoading ? (
          <div className="genre_list_background">
            {movieList &&
              movieList.movieList &&
              movieList.movieList.map((item, index) => {
                return (
                  <GenreItem
                    refs={refs}
                    key={index}
                    item={item}
                    index={index}
                  />
                );
              })}
          </div>
        ) : (
          <div className="genre_list_background">
            <GenreItemSkeleton key={0} />
            <GenreItemSkeleton key={1} />
            <GenreItemSkeleton key={2} />
            <GenreItemSkeleton key={3} />
            <GenreItemSkeleton key={4} />
            <GenreItemSkeleton key={5} />
            <GenreItemSkeleton key={6} />
            <GenreItemSkeleton key={7} />
          </div>
        )}
      </div>
    </GenreContextProvider>
  );
};

export default Genres;
