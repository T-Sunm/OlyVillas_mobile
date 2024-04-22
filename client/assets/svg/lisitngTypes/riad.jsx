import React from "react";
import Svg, { Path } from "react-native-svg"
export default function Riad(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        fill="#222"
        d="m1.347-13.701.179.098 9.983 5.899-1.018 1.722L9-6.864v5.021a.963.963 0 0 1-.027.229L15.6 3.357l-1.2 1.6L13 3.906v9.251a1 1 0 0 1-.884.993l-.116.007h-24a1 1 0 0 1-.993-.884l-.007-.116V3.906l-1.4 1.051-1.2-1.6 6.626-4.971-.019-.113L-9-1.843v-5.021l-1.491.882-1.018-1.722 9.983-5.899a3 3 0 0 1 2.873-.098zM-7 4.156l-4 .001v8l4-.001v-8zm12 .001H-5v8l2-.001V7.157a1 1 0 0 1 .883-.994L-2 6.157h4a1 1 0 0 1 .993.883L3 7.157v4.999l2 .001v-8zm6 0-4-.001v8l4 .001v-8zm-10 4h-2v4h2v-4zm9.667-6.001-4-2.999-1.902-.001 1.8 3h4.102zm-21.334 0h4.101l1.8-3-1.901.001-4 2.999zM2.435-.843h-4.869l-1.8 2.999h8.468L2.435-.843zM-4-6.844l-3 .001v4l3-.001v-4zm6 0h-4v4h4v-4zm5 .001-3-.001v4l3 .001v-4zm-7.388-5.099-.121.061-5.14 3.037H5.648L.509-11.881a1.001 1.001 0 0 0-.897-.061z"
        style={{
          display: "block",
        }}
        transform="translate(17.375 22.843)"
      />
    </Svg>
  );
}
