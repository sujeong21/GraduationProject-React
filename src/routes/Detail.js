import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { STORED_COMMENTS, STORED_USERS } from "../App";
import { GlobalContext } from "../components/provider/GlobalProvider";
import "../css/Detail.css";
import Heart from "../img/Heart";
import Trash from "../img/Trash";
import Pen from "../img/Pen";
/*
demoComments : [
  {
    movieId: number;
    comments: [
      {
        commendId: number;
        userId: string;
        commentContent: string;
        createdAt: Date;
      }
    ]
  }
]
*/
const Detail = () => {
  const [movie, setMovie] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const { id } = useParams();
  const {
    userObj: { userId },
  } = useContext(GlobalContext);

  const handleCommentInput = (e) => setCommentInput(e.target.value);

  useEffect(() => {
    let likeList = JSON.parse(localStorage.getItem(STORED_USERS) ?? "[]");
    const index = likeList.findIndex((item) => item === id);
    console.log("likeList: ", likeList, ", id: ", id, ", index: ", index);
    if (index >= 0) {
      setIsLike(true);
    }

    const storedCommentsObj = JSON.parse(
      localStorage.getItem(STORED_COMMENTS) ?? "[]"
    );
    const currentComment = storedCommentsObj.find(
      (item) => item.movieId === id
    );
    setComment(currentComment);

    axios
      .get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then((res) => {
        // console.log('movie detail!', res.data);

        const {
          data: { movie: movieResponse },
        } = res.data;
        console.log("moviemovie", movieResponse);

        setMovie(movieResponse);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("movie detail err!", err.response.data);
      });
  }, []);

  const onLikeContent = () => {
    setIsLike(() => {
      let likeList = JSON.parse(localStorage.getItem(STORED_USERS) ?? "[]");
      const index = likeList.findIndex((item) => item === id);
      if (index >= 0) {
        likeList.splice(index, 1);
        localStorage.setItem(STORED_USERS, JSON.stringify(likeList));
        return false;
      } else {
        likeList.push(id);
        localStorage.setItem(STORED_USERS, JSON.stringify(likeList));
        return true;
      }
    });
  };
  const onDeleteComment = () => {
    let storedCommentsObj = JSON.parse(
      localStorage.getItem(STORED_COMMENTS) ?? "[]"
    );
    const index = storedCommentsObj.findIndex((item) => item.movieId === id);

    storedCommentsObj.splice(index, 1);
    localStorage.setItem(STORED_COMMENTS, JSON.stringify(storedCommentsObj));
    setComment();
  };
  const onSaveComment = () => {
    const commentObj = {
      movieId: id,
      userId,
      commentContent: commentInput,
      createdAt: Date.now(),
    };
    setComment(commentObj);

    let storedCommentsObj = JSON.parse(
      localStorage.getItem(STORED_COMMENTS) ?? "[]"
    );
    const index = storedCommentsObj.findIndex((item) => item.movieId === id);

    storedCommentsObj.splice(index, 1);
    storedCommentsObj = [...storedCommentsObj, commentObj];
    localStorage.setItem(STORED_COMMENTS, JSON.stringify(storedCommentsObj));

    setCommentInput("");
  };
  return (
    <div className="container">
      {isLoading ? (
        <h1 style={{ textAlign: "center" }}>loading...</h1>
      ) : (
        <div>
          <h1>{movie.title_long}</h1>
          <div className="poster_container">
            <img alt="poster_area" src={movie.large_cover_image} />
            <p>
              {movie.description_intro?.length > 200
                ? movie.description_intro?.slice(0, 200) + "..."
                : movie.description_intro}
            </p>
            <div className="rating_container">
              <span>
                Rating: {movie.rating} | Year: {movie.year}
              </span>
            </div>
            <div className="like_container">
              <div className="like" onClick={onLikeContent}>
                <Heart width={24} isLike={isLike} />
                <p>좋아요</p>
              </div>
              <div className="input_container">
                <input
                  type="text"
                  placeholder="댓글 입력"
                  value={commentInput}
                  onChange={handleCommentInput}
                />
                <div className="send_button" onClick={onSaveComment}>
                  전송
                </div>
              </div>
            </div>
          </div>

          {comment && (
            <div className="comment_container">
              <div className="comment_header">
                <span>{userId}</span>
                { <Pen
                  width={17}
                  style={{ marginRight: '5px', marginLeft: '16px' }}
                /> }
                <Trash
                  onClick={onDeleteComment}
                  width={17}
                  style={{ marginTop: "5px" }}
                />
              </div>

              <div className="comment_item">
                <span>{comment.commentContent}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Detail;
