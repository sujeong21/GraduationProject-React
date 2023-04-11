import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { genres } from "../../App";
import "../../css/MainPage.css";
import Search from "../../img/Search";
import { MainPageContext } from "../provider/MainPageProvider";

const MainPageHeader = () => {
  const inputRef = useRef();
  const { searchData, setSearchData, setIsLoading } =
    useContext(MainPageContext);

  // useEffect(() => {
  //   console.log(searchData);
  // }, [searchData]);

  function search() {}

  return (
    <div className="main_page_header_background">
      <div className="main_page_header_search_bar">
        <input
          ref={inputRef}
          className="search_bar_text_input"
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              setSearchData(inputRef.current.value);
              setIsLoading(false);
              if (inputRef.current.value === "") {
                setIsLoading(true);
              }
            }
          }}
        />
        <div className="search_button">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default MainPageHeader;
