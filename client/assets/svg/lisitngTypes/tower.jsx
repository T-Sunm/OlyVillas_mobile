import React from "react";
import Svg, { Path } from "react-native-svg"
export default function Tower(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        enableBackground: "new 0 0 51 51",
      }}
      viewBox="0 0 51 51"
      {...props}
    >
      <Path d="M46.5 0h-6a1 1 0 0 0-1 1v7h-1V1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7h-1V1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7h-1V1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7h-1V1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6.942l-1.94 33.943a.994.994 0 0 0 .272.743.993.993 0 0 0 .726.314h30a1 1 0 0 0 .998-1.056L39.558 16H46.5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm-5 2h4v6h-4V2zm-9 0h4v6h-4V2zm-9 0h4v6h-4V2zm-9 0h4v6h-4V2zm-9 0h4v6h-4V2zm17 47V37h7v12h-7zm16.941 0H31.5V36a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1v13h-8.941l1.886-33h24.111l1.885 33zM45.5 14h-40v-4h40v4z" />
    </Svg>
  );
}
