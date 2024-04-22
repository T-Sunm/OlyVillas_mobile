import React from "react";
import Svg, { Path } from "react-native-svg"
export default function Windmill(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" {...props}>
      <Path d="M6 5 3.5 7.5l1 1L7 6v-.5l.5-.5.5.5V6l2.5 2.5 1-1L9 5h-.5L8 4.5l.5-.5H9l2.5-2.5-1-1L8 3v.5l-.5.5-.5-.5V3L4.5.5l-1 1L6 4h.5l.5.5-.5.5H6zm5.5 8h-1l-1-4-2-2-2 2-1 4h-1a.5.5 0 1 0 0 1h8a.5.5 0 0 0 0-1zM8 13H7v-1.502c0-.275.223-.498.498-.498.277 0 .502.225.502.502V13z" />
    </Svg>
  );
}
