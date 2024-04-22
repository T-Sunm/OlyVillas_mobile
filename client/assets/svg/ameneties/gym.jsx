import React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
export default function Gym(props) {
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
          d="M28 16.5h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1zM24 12.5h2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-18a1 1 0 0 1 1-1zM10 12.5h2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-18a1 1 0 0 1 1-1zM6 16.5h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1zM31 22.5h3M13 22.5h10M2 22.5h3"
        />
      </G>
    </Svg>
  );
}
