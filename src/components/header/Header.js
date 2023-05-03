import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { CURRENT_USER, genres } from "../../App";
import "../../css/Header.css";
import { GlobalContext } from "../provider/GlobalProvider";

// 앱 전반에 걸쳐 디스플레이 되는 헤더.
const Header = () => {
  const ref = useRef();
  // 이 유저정보는 useState 변수이므로, 어디서든 로그인/로그아웃처리가 되면
  // 헤더에 유저정보가 갱신된다.
  const { userObj } = useContext(GlobalContext);

  return (
    <div className="header_background">
      <Link to="/" className="web_name_text">
        Media-Introducation
      </Link>
      <div className="header_button_list">
        <Link to="/" className="header_button_text">
          Introducation
        </Link>
        <div className="genres_button">
          <div
            className="header_button_genre_text"
            onClick={() => {
              console.log(ref.current.classList.contains("close"));
              if (ref.current.classList.contains("close")) {
                ref.current.classList.remove("close");
                ref.current.classList.add("open");
              } else {
                ref.current.classList.add("close");
                ref.current.classList.remove("open");
              }
            }}
          >
            Genres
          </div>
          <div className="genres_popup close" ref={ref}>
            {genres.map((item, index) => {
              if (index === 0) {
                return <div key={index}></div>;
              } else {
                return (
                  <Link
                    to={`/genres/${item}`}
                    key={index}
                    onClick={() => {
                      ref.current.classList.add("close");
                      ref.current.classList.remove("open");
                    }}
                    className="genres_item"
                  >
                    {item}
                  </Link>
                );
              }
            })}
          </div>
        </div>
        <div className='login_signup_button_list'>
          {/* 유저 정보 없으면 LOGIN | SIGNUP 버튼 표시 / 있으면 유저정보 표시 */}
          {JSON.stringify(userObj) === '{}' ? (
            <>
              <Link to='/login' className='header_button_text'>
                Login
              </Link>
              <div style={{ color: "black", fontSize: 14 }}>&nbsp;|&nbsp;</div>
              <Link to="/sign_up" className="header_button_text">
                SignUp
              </Link>
            </>
          ) : (
            <div
              onClick={() => {
                // 아이디를 누르면 localStorage에서 유저정보 제거 및 새로고침
                localStorage.removeItem(CURRENT_USER);
                window.location.reload();
              }}
            >
              {userObj.userId}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;