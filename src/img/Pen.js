import React from "react";

// 미사용, 수정 아이콘 svg
function Pen({ width, style = {} }) {
  return (
    <svg
      style={style}
      width={width}
      height={width}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3946 5.77585L5.31249 14.1667H2.99632V11.7143L4.15441 10.4881L11.0784 3.32345M13.3946 5.77585L14.1667 4.95838C14.5527 3.32345 13.3946 2.09722 11.8505 2.50597L11.0784 3.32345M13.3946 5.77585L11.0784 3.32345"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Pen;
