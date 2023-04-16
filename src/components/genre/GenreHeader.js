import React from "react";
import { useParams } from "react-router-dom";

const GenreHeader = () => {
  const { genre } = useParams();
  
  return <div className="genre_header_background">{genre}</div>;
};

export default GenreHeader;
