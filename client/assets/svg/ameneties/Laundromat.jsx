import React from 'react'
import Svg, { Path } from "react-native-svg"
const Laundromat = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path d="M24 1a2 2 0 0 1 2 1.85V5h2a2 2 0 0 1 2 1.85V28a3 3 0 0 1-3 3H5a3 3 0 0 1-3-2.82V3a2 2 0 0 1 1.85-2H4zm4 6h-2v21a1 1 0 0 0 2 .12V28zM8 3H4v25a1 1 0 0 0 .88 1H24V3h-4a6 6 0 0 1-12 .23zm6 22a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-4.67a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-4.66a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM14 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4-8h-8a4 4 0 0 0 8 .2z" />
        </Svg>
    )
}

export default Laundromat