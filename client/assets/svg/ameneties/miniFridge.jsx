import React from 'react'
import Svg, { Path } from "react-native-svg"
const miniFridge = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path d="M27 3a2 2 0 0 1 2 1.85V26a2 2 0 0 1-1.85 2H26v2h-2v-2H8v2H6v-2H5a2 2 0 0 1-2-1.85V5a2 2 0 0 1 1.85-2H5zm0 12H5v11h4v-3a2 2 0 0 1 1.85-2H11v-3h2v3a2 2 0 0 1 2 1.85V26h2v-3a2 2 0 0 1 1.85-2H19v-3h2v3a2 2 0 0 1 2 1.85V26h4zm-14 8h-2v3h2zm8 0h-2v3h2zm6-18H5v8h22zM8 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </Svg>
    )
}

export default miniFridge