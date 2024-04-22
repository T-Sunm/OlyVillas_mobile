import React from 'react'
import Svg, { Path } from "react-native-svg"
const PoolTable = (props) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path d="M28 5a3 3 0 0 1 3 2.82V24a3 3 0 0 1-2.82 3h-4.46l1.23 3.68-1.9.64L21.61 27H4a3 3 0 0 1-3-2.82V8a3 3 0 0 1 2.82-3H28zm0 18a1 1 0 0 0-.12 2h.24a1 1 0 0 0-.12-2zM4 23a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM25.17 7H19v1.18a3 3 0 0 1-6 0V7H6.83A3 3 0 0 1 3 10.83v10.34A3 3 0 0 1 6.83 25H13v-1a3 3 0 0 1 6-.18V25h1.95l-3.22-9.64 1.9-.63L23.05 25h2.12a2.99 2.99 0 0 1-.17-.82V24a3 3 0 0 1 4-2.83V10.83A3 3 0 0 1 25.17 7zM16 23a1 1 0 0 0-1 .88V25h2v-1a1 1 0 0 0-1-1zm2-11a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm10-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM4 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm13 0h-2v1.12a1 1 0 0 0 2 0V7z" />
        </Svg>
    )
}

export default PoolTable