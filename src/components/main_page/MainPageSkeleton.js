import React from "react";
import Skeleton from "react-loading-skeleton";

const MainPageSkeleton = ({ children }) => {
  return (
    <div className="list_background">
      <div className="list_title_text">
        <Skeleton width={200} height={25.5} />
      </div>
      <div className="movie_list">
        <div className="track">
          <div className="movie_item_skeleton">
            <Skeleton width="100%" height="100%" />
          </div>
          <div className="movie_item_skeleton">
            <Skeleton width="100%" height="100%" />
          </div>
          <div className="movie_item_skeleton">
            <Skeleton width="100%" height="100%" />
          </div>
          <div className="movie_item_skeleton">
            <Skeleton width="100%" height="100%" />
          </div>
          <div className="movie_item_skeleton">
            <Skeleton width="100%" height="100%" />
          </div>
          <div className="movie_item_skeleton">
            <Skeleton width="100%" height="100%" />
          </div>
          <div className="movie_item_skeleton">
            <Skeleton width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageSkeleton;
