import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  defaultRating: PropTypes.number,
  size: PropTypes.number,
  messages: PropTypes.array
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  function handleMouseEnter(i) {
    setTempRating(i);
  }

  function handleMouseLeave() {
    setTempRating(0);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverin={() => handleMouseEnter(i + 1)}
            onHoverout={() => handleMouseLeave()}
            full={tempRating ? i + 1 <= tempRating : i + 1 <= rating}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

function Star({ onRate, onHoverin, onHoverout, full, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverin}
      onMouseLeave={onHoverout}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width={`${size / 1.4}pt`}
          height={`${size / 1.4}pt`}
          viewBox="0 0 32.000000 34.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,34.000000) scale(0.100000,-0.100000)"
            fill={color}
          >
            <path
              d="M139 270 c-11 -37 -14 -39 -57 -42 -25 -2 -47 -9 -50 -15 -2 -7 11
-26 29 -43 32 -29 33 -31 20 -66 -19 -53 -2 -64 47 -31 l39 25 29 -24 c50 -41
74 -27 52 32 -12 35 -12 36 21 63 46 38 38 61 -23 61 -39 0 -45 3 -51 27 -7
30 -23 53 -36 53 -4 0 -14 -18 -20 -40z m65 -52 c6 -4 29 -8 51 -8 43 -1 44 0
-20 -46 -17 -12 -18 -17 -6 -50 16 -45 10 -52 -27 -25 -37 26 -37 26 -74 0
-36 -26 -44 -20 -29 23 12 32 10 34 -25 66 l-37 32 36 0 c52 0 65 8 78 48 l12
37 15 -35 c8 -19 19 -38 26 -42z"
            />
          </g>
        </svg>
      )}
    </span>
  );
}

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR



*/
