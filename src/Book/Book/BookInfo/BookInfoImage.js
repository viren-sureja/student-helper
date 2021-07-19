import React, { useState } from "react";
import "./BookInfoImage.css";

const BookInfoImage = (props) => {
  return (
    <div className="bookCardInfo-container">
      <div className="bookCardInfo-card-wrap">
        <div className="bookCardInfo-card">
          <div
            className="bookCardInfo-card-bg"
            style={{
              backgroundImage: `url(${props.imageUrl})`,
              // left: "-5px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoImage;
