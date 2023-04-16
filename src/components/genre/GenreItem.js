import React, { useEffect, useRef } from "react";

const GenreItem = ({ item, index, refs }) => {
  const ref = useRef();
  const discripRef = useRef();
  const discrip2Ref = useRef();
  const titleRef = useRef();
  const summaryRef = useRef();

  useEffect(() => {
    if (index % 2 !== 0) {
      ref.current.classList.add("reverse");
      discripRef.current.classList.add("genre_item_reverse");
      discrip2Ref.current.classList.add("reverse");
      titleRef.current.classList.add("title_reverse");
      summaryRef.current.classList.add("genre_summary_reverse");
    }
    console.log(item);

    refs.current.push(ref);
  }, []);

  return (
    <div
      ref={(r) => {
        ref.current = r;
      }}
      className="genre_item_background"
      data-aos={index % 2 !== 0 ? "fade-left" : "fade-right"}
      onClick={() => {
        window.location = `/detail/${item.id}`;
      }}
    >
      <div classNmae="genre_cover_background">
        <img className="genre_cover_image" src={item.medium_cover_image} />
      </div>
      <div ref={discripRef} className="genre_item_description_container">
        <div ref={titleRef} className="genre_title_container">
          <div className="genre_title_text">{item.title_long}</div>
          <div ref={summaryRef} className="genre_summary_text">
            {item.summary}
          </div>
        </div>
        <div ref={discrip2Ref} className="genre_text_container">
          <div className="genre_text">{item.genres.join(", ")}</div>
          <div className="genre_data_text">
            {item.date_uploaded && item.date_uploaded.substring(0, 10)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreItem;
