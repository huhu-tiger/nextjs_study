

import useStore from './Store/ZustandStore'
import React from 'react'
import { Button } from '@chakra-ui/react'

const ZustandDemo:React.FC=()=>{
    const {count,increment,decrement,reset} = useStore()



    return (
        <Button>{count}</Button>

    )
}

export default ZustandDemo