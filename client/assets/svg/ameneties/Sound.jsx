import React from 'react'
import Svg, { Path } from "react-native-svg"
const Sound = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path d="M24 1a5 5 0 0 1 5 4.78V26a5 5 0 0 1-4.78 5H8a5 5 0 0 1-5-4.78V6a5 5 0 0 1 4.78-5H8zm0 2H8a3 3 0 0 0-3 2.82V26a3 3 0 0 0 2.82 3H24a3 3 0 0 0 3-2.82V6a3 3 0 0 0-2.82-3zm-8 10a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-14a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </Svg>
    )
}

export default Sound