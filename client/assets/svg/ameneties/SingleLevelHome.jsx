import React from 'react'
import Svg, { Path } from "react-native-svg"
const SingleLevelHome = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path d="M11 23H5v4h20.59L2.29 3.7l1.42-1.4L27 25.58V5h-4v6h-8V9h6V3h8v24.59l.7.7-1.4 1.42-.72-.71H3v-8h6v-6h2z" />
        </Svg>
    )
}

export default SingleLevelHome