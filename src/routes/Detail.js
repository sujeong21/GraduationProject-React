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
  const [comment, setComment] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const { id } = useParams();
  const [changeIndex, setChangeIndex] = useState(null);
  const [changeText, setChangeText] = useState(null);
  const {
    userObj: { userId },
  } = useContext(GlobalContext);

  const handleCommentInput = (e) => setCommentInput(e.target.value);
  const handleChageText = (e) => setChangeText(e.target.value);

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

    console.log("asdfasdfasdfasdf", storedCommentsObj);

    const currentComment = storedCommentsObj.map((item) => {
      if (item.movieId === id) {
        return item;
      }
    });
    setComment(currentComment);
    console.log("=========");
    console.log(currentComment);
    console.log("=========");

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
  const onDeleteComment = (commentId) => {
    let storedCommentsObj = JSON.parse(
      localStorage.getItem(STORED_COMMENTS) ?? "[]"
    );
    const index = storedCommentsObj.findIndex(
      (item) => item.commentId === commentId
    );

    storedCommentsObj.splice(index, 1);
    localStorage.setItem(STORED_COMMENTS, JSON.stringify(storedCommentsObj));
    let commentList = [...comment];
    const deleteComment = commentList.map((item) => {
      if (item && item.commentId && commentId && item.commentId !== commentId) {
        return item;
      }
    });
    setComment(deleteComment);
  };

  const onSaveComment = () => {
    const commentObj = {
      movieId: id,
      userId,
      commentContent: commentInput,
      createdAt: Date.now(),
      commentId: Math.random(),
    };
    const comments = [...comment];
    setComment([...comments, commentObj]);

    console.log("--------");
    console.log(localStorage.getItem(STORED_COMMENTS));

    let storedCommentsObj = JSON.parse(
      localStorage.getItem(STORED_COMMENTS) ?? "[]"
    );
    console.log(...storedCommentsObj);
    console.log("--------");
    storedCommentsObj = [...storedCommentsObj, commentObj];
    console.log(storedCommentsObj);
    localStorage.setItem(STORED_COMMENTS, JSON.stringify(storedCommentsObj));

    setCommentInput("");
  };

  const onChangeComment = () => {
    let stored = JSON.parse(localStorage.getItem(STORED_COMMENTS) ?? "[]");
    console.log(changeText);

    if (changeText !== "") {
      stored.map((item) => {
        if (
          item &&
          item.commentId &&
          changeIndex &&
          item.commentId === changeIndex
        ) {
          item.commentContent = changeText;
        }
      });
      localStorage.setItem(STORED_COMMENTS, JSON.stringify(stored));
      let commentList = [...comment];
      commentList.map((item) => {
        if (
          item &&
          item.commentId &&
          changeIndex &&
          item.commentId === changeIndex
        ) {
          item.commentContent = changeText;
        }
      });
      setComment(commentList);
    }

    setChangeIndex(null);
    setChangeText("");
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

          {comment &&
            comment.map((item, index) => {
              console.log("asdfasd", item);
              if (item) {
                return (
                  <div className="comment_container" key={index}>
                    <div className="comment_header">
                      <span>{item.userId}</span>
                      <div
                        onClick={() => {
                          console.log(item.commentId);
                          setChangeIndex(item.commentId);
                        }}
                      >
                        <Pen
                          width={17}
                          style={{ marginRight: "5px", marginLeft: "16px" }}
                        />
                      </div>
                      <div
                        onClick={() => {
                          console.log(item.commentId);
                          onDeleteComment(item.commentId);
                        }}
                      >
                        <Trash width={17} style={{ marginTop: "5px" }} />
                      </div>
                    </div>

                    <div className="comment_item">
                      {item &&
                      item.commentId &&
                      item.commentId === changeIndex ? (
                        <input
                          type="text"
                          placeholder={item.commentContent}
                          value={changeText}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              onChangeComment();
                            }
                          }}
                          onChange={handleChageText}
                        />
                      ) : (
                        <span>{item.commentContent}</span>
                      )}
                    </div>
                  </div>
                );
              } else {
                return <div key={index}></div>;
              }
            })}
        </div>
      )}
    </div>
  );
};

export default Detail;

// [
//   {
//     movieId: "51016",
//     userId: "hello",
//     commentContent: "ff",
//     createdAt: 1682501159665,
//   },
// ];
