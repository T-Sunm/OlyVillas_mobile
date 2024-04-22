import React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
export default function FireExt(props) {
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
          strokeWidth={2}
          d="M13.25 15.25a6 6 0 0 1 6 6v15a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-15l.004-.225a6 6 0 0 1 5.996-5.775zM4.25 29.25h4-4zM13.25 11.25v4-4z"
        />
        <Path
          fill="none"
          stroke="#222"
          strokeWidth={2}
          d="M20.25 11.25h-7c-5.523 0-10 4.477-10 10v13M13.25 11.25l5-4-5 4z"
        />
        <Path
          fill="#FFF"
          d="M13.25 13.25a2 2 0 1 0 .001-3.999 2 2 0 0 0-.001 3.999z"
        />
        <Path
          fill="none"
          stroke="#222"
          strokeWidth={2}
          d="M13.25 13.25a2 2 0 1 0 .001-3.999 2 2 0 0 0-.001 3.999z"
        />
      </G>
    </Svg>
  );
}
