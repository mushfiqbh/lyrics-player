import React from "react";

const LoadMore = ({ length, activeIndex, setActiveIndex }) => {
  return (
    <div className="showcase_loadmore">
      <button
        onClick={() => setActiveIndex(activeIndex - 1)}
        disabled={activeIndex == 0}
      >
        <span>&#129168;</span> আগে
      </button>
      <b>
        {length ? activeIndex + 1 : 0}/{Math.ceil(length / 10)}
      </b>
      <button
        onClick={() => setActiveIndex(activeIndex + 1)}
        disabled={activeIndex + 1 == Math.ceil(length / 10)}
      >
        পরে <span>&#129170;</span>
      </button>
    </div>
  );
};

export default LoadMore;
