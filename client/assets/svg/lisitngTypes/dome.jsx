import React from "react";
import Svg, { Path } from "react-native-svg"
export default function Dome(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 45 45"
      {...props}
    >
      <Path
        fill="#3C3C3C"
        d="M34 8.5v6.786a13.923 13.923 0 0 1 1.993 6.776L36 22.5v12a2.001 2.001 0 0 1-1.85 1.995L34 36.5H10a1.997 1.997 0 0 1-1.995-1.85L8 34.5v-12c0-7.732 6.268-14 14-14 3.918 0 7.46 1.61 10 4.203V8.5h2Zm-12 2c-6.525 0-11.834 5.209-11.996 11.695L10 22.5v12h7v-10h-2v-2h14v2h-2v10h7v-12c0-6.627-5.373-12-12-12Zm3 14h-6v10h6v-10Zm-3-7a.997.997 0 0 1 1 1 .997.997 0 0 1-1 1 .997.997 0 0 1-1-1 .997.997 0 0 1 1-1Z"
      />
    </Svg>
  );
}
