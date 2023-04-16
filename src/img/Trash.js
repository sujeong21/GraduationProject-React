import React from "react";

// 영화 상세보기 페이지 댓글 지우기 아이콘 svg
function Trash({ width, onClick, style }) {
  return (
    <svg
      style={style}
      onClick={onClick}
      width={width}
      height={width}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.54166 5.3125V14.5208H13.4583V5.3125" stroke="black" />
      <path d="M2.125 4.25L14.875 4.25" stroke="black" strokeLinejoin="round" />
      <path d="M7.08334 7.08325V12.3958" stroke="black" />
      <path
        d="M9.91666 7.08325V12.3958"
        stroke="black"
        strokeLinejoin="round"
      />
      <path
        d="M5.60589 3.83512C5.60589 3.4594 5.75515 3.09906 6.02083 2.83339C6.2865 2.56771 6.64684 2.41846 7.02256 2.41846H8.43923H9.85589C10.2316 2.41846 10.592 2.56771 10.8576 2.83339C11.1233 3.09906 11.2726 3.4594 11.2726 3.83512"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Trash;
