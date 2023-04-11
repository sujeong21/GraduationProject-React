import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { genres } from "../../App";
import "../../css/Header.css";

const Header = () => {
  const ref = useRef();

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
                return <></>;
              } else {
                return <div className="genres_item">{item}</div>;
              }
            })}
          </div>
        </div>
        <div className="login_signup_button_list">
          <Link to="/login" className="header_button_text">
            Login
          </Link>
          <div style={{ color: "black", fontSize: 14 }}>&nbsp;|&nbsp;</div>
          <Link to="/sign_up" className="header_button_text">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
