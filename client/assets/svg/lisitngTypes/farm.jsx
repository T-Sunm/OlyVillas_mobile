import React from "react";
import Svg, { Path } from "react-native-svg"
export default function Farm(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        enableBackground: "new 0 0 512 512",
      }}
      viewBox="0 0 512 512"
      {...props}
    >
      <Path d="M467.592 274.939V112.327h31.347V52.245c0-10.082-8.203-18.286-18.286-18.286H240.327c-10.082 0-18.286 8.203-18.286 18.286v60.082h31.347v162.612h-47.02v-37.224h23.51v-15.673H20.898v15.673h23.51v37.224H0v15.673h512v-15.673h-44.408zm-350.041 0H60.082v-37.224h57.469v37.224zm73.143 0h-57.469v-37.224h57.469v37.224zm47.02-178.286V52.245c0-1.416 1.196-2.612 2.612-2.612h39.184v28.735h15.673V49.633h57.469v28.735h15.673V49.633h57.469v28.735h15.673V49.633h39.184c1.416 0 2.612 1.196 2.612 2.612v44.408H237.714zm161.959 177.633h-78.367v-78.367h31.347v49.633h15.673v-49.633h31.347v78.367zm52.245 0h-36.571v-78.367h13.061v-15.673H292.571v15.673h13.061v78.367h-36.571V112.327h182.857v161.959z" />
      <Path d="M308.245 138.449h57.469v15.673h-57.469zM381.388 138.449h20.898v15.673h-20.898zM104.49 28.735c-30.249 0-54.857 24.608-54.857 54.857s24.608 54.857 54.857 54.857 54.857-24.608 54.857-54.857-24.608-54.857-54.857-54.857zm0 94.04c-21.606 0-39.184-17.577-39.184-39.184s17.577-39.184 39.184-39.184 39.184 17.577 39.184 39.184-17.578 39.184-39.184 39.184zM0 336.98h512v15.673H0zM0 399.673h512v15.673H0zM31.347 446.694h26.122v15.674H31.347zM104.49 467.592h26.122v15.673H104.49zM188.082 436.245h26.122v15.673h-26.122zM261.224 467.592h26.122v15.673h-26.122zM334.367 436.245h26.122v15.673h-26.122zM397.061 467.592h26.122v15.673h-26.122zM459.755 436.245h26.122v15.673h-26.122z" />
    </Svg>
  );
}