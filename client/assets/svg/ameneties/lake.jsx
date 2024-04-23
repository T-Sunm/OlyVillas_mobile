import React from "react";
import Svg, { G, Path, Mask, Defs, ClipPath } from "react-native-svg"
export default function Lake() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 45 45"
      width="30px"
      height="30px"
    >
      <G clipPath="url(#a)">
        <Path
          fill="#3C3C3C"
          d="M37 23.501v2H9v-10c0-.25.094-.491.26-.674l.09-.087 6.354-5.441a2 2 0 0 1 2.467-.106l.136.106 6.344 5.442c.19.163.311.39.341.635l.008.125v8m-7.995-12.683L11 15.96v7.541h3v-5a1 1 0 0 1 .883-.993l.117-.007h4c.513 0 .936.385.993.882l.007.118v5h3V15.96l-5.995-5.142ZM18 19.501h-2v4h2v-4Z"
        />
        <Path
          fill="#3C3C3C"
          d="M31.011 25.037h2.027L33.026 8.5h-2.028l.013 16.537Z"
        />
        <Path
          fill="#3C3C3C"
          d="M31.313 13.332c-.922.795-2.465 1.409-4.006 1.463l-.286.005v-2c2.314 0 3.543-1.278 3.933-3.211l.021-.129c.014-.108.022-.224.026-.336l-.004-.093.004-.272-.002-.259M32.65 13.273c.979.844 2.655 1.526 4.333 1.526v-2l-.235-.003c-2.162-.084-3.322-1.34-3.698-3.207l-.05-.22h-.773l.423 3.904ZM32.703 14.996 31 15.084l-.03.184c-.358 1.312-1.556 2.232-3.95 2.232v2l.306-.004c1.523-.045 2.75-.426 3.675-1.05l1.327-1.287.375-2.163Z"
        />
        <Path
          fill="#3C3C3C"
          d="M33 18.446c.986.666 2.316 1.054 3.981 1.054v-2l-.261-.004c-2.221-.065-3.353-.963-3.698-2.226l-.899.116-.834 1.907L33 18.446Z"
        />
        <Mask
          id="b"
          width={80}
          height={80}
          x={-17}
          y={-18}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "alpha",
          }}
        >
          <Path fill="#F2DDBB" d="M63-18h-80v80h80v-80Z" />
        </Mask>
        <G fill="#3C3C3C" mask="url(#b)">
          <Path d="M4.959 27.875a4.402 4.402 0 0 1 3.016 1.176c.39.365.901.584 1.444.628l.206.008v2a4.402 4.402 0 0 1-3.017-1.176 2.405 2.405 0 0 0-1.649-.636c-.62 0-1.212.225-1.65.636a4.402 4.402 0 0 1-3.017 1.176 4.413 4.413 0 0 1-2.838-1.017l-.179-.159a2.407 2.407 0 0 0-1.65-.636c-.62 0-1.211.225-1.649.636a4.404 4.404 0 0 1-3.018 1.176 4.402 4.402 0 0 1-3.017-1.176 2.403 2.403 0 0 0-1.649-.636c-.62 0-1.211.225-1.65.636a4.391 4.391 0 0 1-2.778 1.17l-.239.006v-2c.551 0 1.079-.178 1.498-.506l.152-.13a4.407 4.407 0 0 1 3.017-1.176 4.407 4.407 0 0 1 3.017 1.176 2.403 2.403 0 0 0 1.649.636c.62 0 1.211-.224 1.65-.636a4.411 4.411 0 0 1 3.017-1.176 4.407 4.407 0 0 1 3.017 1.176c.439.411 1.03.636 1.65.636.62 0 1.211-.225 1.649-.636a4.407 4.407 0 0 1 3.018-1.176Z" />
          <Path d="M32.084 27.875a4.402 4.402 0 0 1 3.016 1.176c.39.365.901.584 1.444.628l.206.008v2a4.402 4.402 0 0 1-3.017-1.176 2.405 2.405 0 0 0-1.649-.636c-.62 0-1.212.225-1.65.636a4.402 4.402 0 0 1-3.017 1.176 4.413 4.413 0 0 1-2.838-1.017l-.179-.159a2.407 2.407 0 0 0-1.65-.636c-.62 0-1.211.225-1.649.636a4.404 4.404 0 0 1-3.018 1.176 4.402 4.402 0 0 1-3.017-1.176 2.403 2.403 0 0 0-1.649-.636c-.62 0-1.211.225-1.65.636a4.391 4.391 0 0 1-2.778 1.17l-.239.006v-2c.551 0 1.079-.178 1.498-.506l.152-.13a4.407 4.407 0 0 1 3.017-1.176 4.407 4.407 0 0 1 3.017 1.176 2.403 2.403 0 0 0 1.649.636c.62 0 1.211-.224 1.65-.636a4.411 4.411 0 0 1 3.017-1.176 4.407 4.407 0 0 1 3.017 1.176c.439.411 1.03.636 1.65.636.62 0 1.211-.225 1.649-.636a4.407 4.407 0 0 1 3.018-1.176Z" />
          <Path d="M59.584 27.875a4.402 4.402 0 0 1 3.016 1.176c.39.365.901.584 1.444.628l.206.008v2a4.402 4.402 0 0 1-3.017-1.176 2.405 2.405 0 0 0-1.649-.636c-.62 0-1.212.225-1.65.636a4.402 4.402 0 0 1-3.017 1.176 4.413 4.413 0 0 1-2.838-1.017l-.179-.159a2.407 2.407 0 0 0-1.65-.636c-.62 0-1.211.225-1.649.636a4.404 4.404 0 0 1-3.018 1.176 4.402 4.402 0 0 1-3.017-1.176 2.403 2.403 0 0 0-1.649-.636c-.62 0-1.211.225-1.65.636a4.391 4.391 0 0 1-2.778 1.17l-.239.006v-2c.551 0 1.079-.178 1.498-.506l.152-.13a4.407 4.407 0 0 1 3.017-1.176 4.407 4.407 0 0 1 3.017 1.176 2.403 2.403 0 0 0 1.649.636c.62 0 1.211-.224 1.65-.636a4.411 4.411 0 0 1 3.017-1.176 4.407 4.407 0 0 1 3.017 1.176c.439.411 1.03.636 1.65.636.62 0 1.211-.225 1.649-.636a4.407 4.407 0 0 1 3.018-1.176Z" />
        </G>
        <Mask
          id="c"
          width={80}
          height={80}
          x={-17}
          y={-18}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "alpha",
          }}
        >
          <Path fill="#F2DDBB" d="M63-18h-80v80h80v-80Z" />
        </Mask>
        <G fill="#3C3C3C" mask="url(#c)">
          <Path d="M4.959 32.5a4.402 4.402 0 0 1 3.016 1.176c.39.365.901.584 1.444.628l.206.008v2a4.402 4.402 0 0 1-3.017-1.176 2.405 2.405 0 0 0-1.649-.636c-.62 0-1.212.225-1.65.636a4.402 4.402 0 0 1-3.017 1.176 4.413 4.413 0 0 1-2.838-1.017l-.179-.159a2.407 2.407 0 0 0-1.65-.636c-.62 0-1.211.225-1.649.636a4.404 4.404 0 0 1-3.018 1.176 4.402 4.402 0 0 1-3.017-1.176 2.403 2.403 0 0 0-1.649-.636c-.62 0-1.211.225-1.65.636a4.391 4.391 0 0 1-2.778 1.17l-.239.006v-2c.551 0 1.079-.178 1.498-.506l.152-.13a4.407 4.407 0 0 1 3.017-1.176 4.407 4.407 0 0 1 3.017 1.176 2.403 2.403 0 0 0 1.649.636c.62 0 1.211-.224 1.65-.636A4.411 4.411 0 0 1-4.375 32.5a4.407 4.407 0 0 1 3.017 1.176c.439.411 1.03.636 1.65.636.62 0 1.211-.225 1.649-.636A4.407 4.407 0 0 1 4.959 32.5Z" />
          <Path d="M32.084 32.5a4.402 4.402 0 0 1 3.016 1.176c.39.365.901.584 1.444.628l.206.008v2a4.402 4.402 0 0 1-3.017-1.176 2.405 2.405 0 0 0-1.649-.636c-.62 0-1.212.225-1.65.636a4.402 4.402 0 0 1-3.017 1.176 4.413 4.413 0 0 1-2.838-1.017l-.179-.159a2.407 2.407 0 0 0-1.65-.636c-.62 0-1.211.225-1.649.636a4.404 4.404 0 0 1-3.018 1.176 4.402 4.402 0 0 1-3.017-1.176 2.403 2.403 0 0 0-1.649-.636c-.62 0-1.211.225-1.65.636a4.391 4.391 0 0 1-2.778 1.17l-.239.006v-2c.551 0 1.079-.178 1.498-.506l.152-.13a4.407 4.407 0 0 1 3.017-1.176 4.407 4.407 0 0 1 3.017 1.176 2.403 2.403 0 0 0 1.649.636c.62 0 1.211-.224 1.65-.636A4.411 4.411 0 0 1 22.75 32.5a4.407 4.407 0 0 1 3.017 1.176c.439.411 1.03.636 1.65.636.62 0 1.211-.225 1.649-.636a4.407 4.407 0 0 1 3.018-1.176Z" />
          <Path d="M59.584 32.5a4.402 4.402 0 0 1 3.016 1.176c.39.365.901.584 1.444.628l.206.008v2a4.402 4.402 0 0 1-3.017-1.176 2.405 2.405 0 0 0-1.649-.636c-.62 0-1.212.225-1.65.636a4.402 4.402 0 0 1-3.017 1.176 4.413 4.413 0 0 1-2.838-1.017l-.179-.159a2.407 2.407 0 0 0-1.65-.636c-.62 0-1.211.225-1.649.636a4.404 4.404 0 0 1-3.018 1.176 4.402 4.402 0 0 1-3.017-1.176 2.403 2.403 0 0 0-1.649-.636c-.62 0-1.211.225-1.65.636a4.391 4.391 0 0 1-2.778 1.17l-.239.006v-2c.551 0 1.079-.178 1.498-.506l.152-.13a4.407 4.407 0 0 1 3.017-1.176 4.407 4.407 0 0 1 3.017 1.176 2.403 2.403 0 0 0 1.649.636c.62 0 1.211-.224 1.65-.636A4.411 4.411 0 0 1 50.25 32.5a4.407 4.407 0 0 1 3.017 1.176c.439.411 1.03.636 1.65.636.62 0 1.211-.225 1.649-.636a4.407 4.407 0 0 1 3.018-1.176Z" />
        </G>
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h45v45H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}