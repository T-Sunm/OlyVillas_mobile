import React from 'react'
import Svg, { Path } from "react-native-svg"
const PocketWifi = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path d="M21 1a5 5 0 0 1 5 4.78V26a5 5 0 0 1-4.78 5H11a5 5 0 0 1-5-4.78V6a5 5 0 0 1 4.78-5H11zm0 2H11a3 3 0 0 0-3 2.82V26a3 3 0 0 0 2.82 3H21a3 3 0 0 0 3-2.82V6a3 3 0 0 0-2.82-3zM10 25a2 2 0 0 1 2 1.85V27h-2zm0-4a6 6 0 0 1 6 5.78V27h-2a4 4 0 0 0-3.8-4H10zm0-4a10 10 0 0 1 10 9.72V27h-2a8 8 0 0 0-7.75-8H10z" />
        </Svg>
    )
}

export default PocketWifi