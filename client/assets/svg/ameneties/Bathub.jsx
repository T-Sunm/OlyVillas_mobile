import React from 'react'
import Svg, { Path } from "react-native-svg"
const Bathub = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path d="M7.5 2a4.5 4.5 0 0 1 4.47 4H14v2H8V6h1.95A2.5 2.5 0 0 0 5 6.34V16h26v2h-2v5a5 5 0 0 1-3 4.58V30h-2v-2H8v2H6v-2.42a5 5 0 0 1-3-4.34V18H1v-2h2V6.5A4.5 4.5 0 0 1 7.5 2zM27 18H5v5a3 3 0 0 0 2.65 2.98l.17.01L8 26h16a3 3 0 0 0 3-2.82V23z" />
        </Svg>
    )
}

export default Bathub