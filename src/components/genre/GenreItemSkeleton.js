import React from "react";
import Skeleton from "react-loading-skeleton";

const GenreItemSkeleton = () => {
  return (
    <div className="genre_skeleton">
      <Skeleton width="100%" height="100%" style={{ bordeRadius: 10 }} />
    </div>
  );
};

export default GenreItemSkeleton;
