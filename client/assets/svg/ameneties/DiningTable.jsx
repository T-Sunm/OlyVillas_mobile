import React from 'react'
import Svg, { Path } from "react-native-svg"
const DiningTable = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path d="M31 9v21h-2v-7h-6v7h-2v-7a2 2 0 0 1 1.85-2H29V9h2zM3 9v12h6a2 2 0 0 1 2 1.85V30H9v-7H3v7H1V9h2zm14-2v2.08a6 6 0 0 1 5 5.7V15h5v2H17v13h-2V17H5v-2h5a6 6 0 0 1 5-5.92V7h2zm-1 4a4 4 0 0 0-4 3.8v.2h8a4 4 0 0 0-4-4z" />
        </Svg>
    )
}

export default DiningTable