import React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
export default function Workplace(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: [{ translateX: 0 }, { translateY: 0 }],
        visibility: 'visible',
      }}
      {...props}
    >
      <Defs>
        <ClipPath id="a">
          <Path d="M0 0h45v45H0z" />
        </ClipPath>
      </Defs>
      <G
        clipPath="url(#a)"
        style={{
          display: "block",
        }}
      >
        <Path
          fill="none"
          stroke="#222"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2 22.375h30M5 36.375v-14M29 36.375v-14M5 22.375h24v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-8zM25 21.375v-6M23 9.375h4l2 7h-8l2-7zM8 17.375h5v5H8v-5zM9.792 17.403 8 13.375"
        />
      </G>
    </Svg>
  );
}
