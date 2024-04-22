import React from "react";
import Svg, { G, Path } from "react-native-svg"
export default function SharedRoom(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <G data-name="Layer 2">
        <Path d="M30 1H2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1v20a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1V6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1ZM3 3h26v1H3Zm10 23V6h2v20ZM4 6h7v20H4Zm25 23H3v-1h26Zm-1-3H17V6h11Z" />
        <Path d="M19 19a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1Z" />
      </G>
    </Svg>
  );
}
