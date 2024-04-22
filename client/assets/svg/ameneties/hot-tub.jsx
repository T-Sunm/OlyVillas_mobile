import React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
export default function HotTub(props) {
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
        <ClipPath id="c">
          <Path
            fill="#fff"
            d="M55.875 27.097H30.706l.069 10.078h25.169l-.069-10.078"
          />
        </ClipPath>
        <ClipPath id="b">
          <Path fill="#fff" d="M55.9 26H30.731l.019 9.875h25.169L55.9 26" />
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
            d="M5 20.5h24v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-15zM32 20.5h-3M5 20.5H2"
          />
        </G>
        <Path
          fill="#222"
          d="M0-4.44A4.505 4.505 0 0 0-4.5.06C-4.5 2.197-3 3.983-1 4.44V2.349A2.503 2.503 0 0 1-2.5.06c0-1.378 1.122-2.5 2.5-2.5S2.5-1.318 2.5.06A2.503 2.503 0 0 1 1 2.349V4.44C3 3.983 4.5 2.197 4.5.06c0-2.481-2.019-4.5-4.5-4.5z"
          style={{
            display: "block",
          }}
          transform="translate(10.5 12.94)"
        />
        <Path
          fill="none"
          stroke="#222"
          strokeWidth={2}
          d="M-2.217 2a4 4 0 0 1 4-4H1.52h.697"
          style={{
            display: "block",
          }}
          transform="translate(7.217 18.5)"
        />
        <Path
          fill="none"
          stroke="#222"
          strokeWidth={2}
          d="M-5.699-4.5h.74A4 4 0 0 1-2.13-3.329L5.699 4.5"
          style={{
            display: "block",
          }}
          transform="translate(17.301 21)"
        />
        <G
          clipPath="url(#b)"
          style={{
            display: "block",
          }}
          transform="translate(-14.125 -18.375)"
        >
          <Path
            fill="none"
            stroke="#222"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M42.994 4C42.999 8.833 39 10.083 39 15s3.999 6.167 3.994 11C42.989 30.833 39 32.167 39 37m3.994-55.066c.005 4.833-3.994 6.083-3.994 11s3.999 6.167 3.994 11V4C42.999 8.833 39 10.083 39 15s3.999 6.167 3.994 11C42.989 30.833 39 32.167 39 37"
          />
        </G>
        <G
          clipPath="url(#c)"
          style={{
            display: "block",
          }}
          transform="translate(-13.325 -19.575)"
        >
          <Path
            fill="none"
            stroke="#222"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M37.994 4C37.999 8.833 34 10.083 34 15s3.999 6.167 3.994 11C37.989 30.833 34 32.167 34 37m3.994-55.066c.005 4.833-3.994 6.083-3.994 11s3.999 6.167 3.994 11V4C37.999 8.833 34 10.083 34 15s3.999 6.167 3.994 11C37.989 30.833 34 32.167 34 37"
          />
        </G>
      </G>
    </Svg>
  );
}
