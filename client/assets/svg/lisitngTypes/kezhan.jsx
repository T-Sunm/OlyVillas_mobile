import React from "react";
import Svg, { Path } from "react-native-svg"
export default function Kezhan(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        fill="#222"
        d="M-9-12v-2H9v2H5l.001 2.035c.285.053.556.169.793.338l.138.108 6.186 5.304a3.005 3.005 0 0 0 1.877-2.609L14-7v-1h2v1a5 5 0 0 1-2.999 4.583L13 12a2 2 0 0 1-1.851 1.994L11 14h-22a2.001 2.001 0 0 1-1.995-1.851L-13 12V-2.416a5 5 0 0 1-2.995-4.367L-16-7v-1h2v1c0 1.262.779 2.341 1.882 2.785l5.905-5.063A3.007 3.007 0 0 1-5-9.907V-12h-4zM11-2h-22v14h6V2C-5 .946-4.184.082-3.149.005L-3 0h6c1.054 0 1.918.816 1.995 1.851L5 2v10h6V-2zM3 2h-6v10h6V2zM4.63-8h-8.89c-.191 0-.377.055-.537.156l-.114.085L-9.298-4H9.297L4.63-8zM3-12h-6v2h6v-2z"
        style={{
          display: "block",
        }}
        transform="translate(17.875 22.5)"
      />
    </Svg>
  );
}
