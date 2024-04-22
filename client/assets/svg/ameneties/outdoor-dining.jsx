import React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
export default function OutdoorDining(props) {
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
        <Path
          fill="none"
          stroke="#222"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M0-4C5.585-4 10.406-.73 12.653 4h-25.306C-10.406-.73-5.585-4 0-4z"
          style={{
            display: "block",
          }}
          transform="translate(15 12.375)"
        />
        <Path
          fill="none"
          stroke="#222"
          strokeWidth={2}
          d="M0-10.5v21"
          style={{
            display: "block",
          }}
          transform="translate(15 26.875)"
        />
        <G
          style={{
            display: "block",
          }}
        >
          <Path
            fill="none"
            stroke="#222"
            strokeWidth={2}
            d="M27 37.375v-16M27 30.375h-7a1 1 0 0 0-1 1v6M3 37.375v-16M3 30.375h7a1 1 0 0 1 1 1v6M6 26.375h18"
          />
        </G>
      </G>
    </Svg>
  );
}
