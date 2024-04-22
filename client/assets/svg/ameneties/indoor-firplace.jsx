import React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
export default function IndoorFirplace(props) {
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
      <G clipPath="url(#a)">
        <G
          style={{
            display: "block",
          }}
        >
          <Path
            fill="none"
            stroke="#222"
            strokeWidth={2}
            d="M9.125 21.25v15h-4v-22h24v22h-4v-15a1 1 0 0 0-1-1h-14a1 1 0 0 0-1 1z"
          />
          <Path
            fill="none"
            stroke="#222"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.125 14.25h30M2.125 10.25h30"
          />
        </G>
        <G
          style={{
            display: "block",
          }}
        >
          <Path
            fill="none"
            stroke="#222"
            strokeWidth={2}
            d="M17.125 25.52c2.667 2.303 4 4.546 4 6.728a4 4 0 0 1-4 4c-2.209 0-4-1.818-4-4s1.333-4.425 4-6.728z"
          />
          <Path
            fill="none"
            stroke="#222"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.125 32a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5z"
          />
        </G>
      </G>
    </Svg>
  );
}
