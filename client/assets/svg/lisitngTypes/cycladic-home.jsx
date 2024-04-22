import React from "react";
import Svg, { Path } from "react-native-svg"
export default function CycladicHome(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 45 45"
      {...props}
    >
      <Path
        fill="#3C3C3C"
        d="M33 8.5c1.054 0 1.918.816 1.995 1.851L35 10.5v24a2 2 0 0 1-1.851 1.994L33 36.5H11a2.001 2.001 0 0 1-1.995-1.851L9 34.5v-24c0-1.054.816-1.918 1.851-1.995L11 8.5h22Zm0 2H11v24h6v-13a5 5 0 0 1 9.995-.217L27 21.5v13h6v-24Zm-8 22h-6v2h6v-2Zm0-4h-6v2h6v-2Zm-3-10a3 3 0 0 0-2.995 2.824L19 21.5v5h6v-5a3 3 0 0 0-3-3Zm0-6a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
      />
    </Svg>
  );
}
