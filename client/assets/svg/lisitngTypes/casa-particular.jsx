import React from "react";
import Svg, { Path } from "react-native-svg"
export default function CasaParticular(props) {

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 45 45"
      {...props}
    >
      <Path
        fill="#3C3C3C"
        d="M35 8.5a2.001 2.001 0 0 1 1.995 1.85l.005.15v2a2.001 2.001 0 0 1-1.85 1.995L35 14.5v9h2v2h-2v9a2.001 2.001 0 0 1-1.85 1.995L33 36.5H11a1.997 1.997 0 0 1-1.995-1.85L9 34.5v-9H7v-2h2v-9l-.15-.005a2.002 2.002 0 0 1-1.844-1.838L7 12.5v-2a2.001 2.001 0 0 1 1.85-1.995L9 8.5h26Zm-2 17H11v9h2v-3a4.002 4.002 0 0 1 3.9-3.999 4.003 4.003 0 0 1 4.095 3.799l.005.2v3h2v-3a4.002 4.002 0 0 1 3.9-3.999 4.003 4.003 0 0 1 4.095 3.799l.005.2v3h2v-9Zm-16 4a2.001 2.001 0 0 0-1.995 1.85L15 31.5v3h4v-3a2 2 0 0 0-2-2Zm10 0a2.001 2.001 0 0 0-1.995 1.85L25 31.5v3h4v-3a2 2 0 0 0-2-2Zm6-15H11v9h2v-3a4.002 4.002 0 0 1 3.9-3.999 4.003 4.003 0 0 1 4.095 3.799l.005.2v3h2v-3a4.002 4.002 0 0 1 3.9-3.999 4.003 4.003 0 0 1 4.095 3.799l.005.2v3h2v-9Zm-16 4a2.001 2.001 0 0 0-1.995 1.85L15 20.5v3h4v-3a2 2 0 0 0-2-2Zm10 0a2.001 2.001 0 0 0-1.995 1.85L25 20.5v3h4v-3a2 2 0 0 0-2-2Zm8-8H9v2h26v-2Z"
      />
    </Svg>
  );
}
