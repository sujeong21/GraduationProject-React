import React from 'react';

// 메인페이지 리스트 ">" 아이콘 svg
const RightArrow = ({ width }) => {
  return (
    <svg
      width={width}
      height='45'
      viewBox='0 0 19 45'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.79395 42.8143L17.2444 22.4137'
        stroke='white'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <path
        d='M1.99994 2L17.2444 21.8143'
        stroke='white'
        strokeWidth='3'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default RightArrow;
