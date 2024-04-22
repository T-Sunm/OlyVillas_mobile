import React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
export default function FirstAid(props) {

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
          d="M-10-12h20a4 4 0 0 1 4 4V8a4 4 0 0 1-4 4h-20a4 4 0 0 1-4-4V-8a4 4 0 0 1 4-4z"
          style={{
            display: "block",
          }}
          transform="translate(17.375 22.5)"
        />
        <Path
          fill="none"
          stroke="#222"
          d="M-2 2c-.062.875 0 4 0 4h4V2h4v-4H2v-4h-4v4h-4v4s3-.062 4 0z"
          style={{
            display: "block",
          }}
          transform="translate(17.375 22.5)"
        />
      </G>
    </Svg>
  );
}
