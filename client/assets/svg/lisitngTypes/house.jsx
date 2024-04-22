import React from "react";
import Svg, { Path } from "react-native-svg"
export default function House(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 -1 22 22"
      {...props}
    >
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M2 11c-.92 0-1.352-1.137-.664-1.747l9-8a1 1 0 0 1 1.328 0l9 8C21.352 9.863 20.92 11 20 11h-1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7H2Zm6 6v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3v-7a1 1 0 0 1 .512-.873L11 3.337l-6.512 5.79A1 1 0 0 1 5 10v7h3Zm2 0v-4h2v4h-2Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
