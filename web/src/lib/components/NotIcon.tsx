import React from 'react'
import { NotIconClass } from '../class'

interface NotTpye {
    data: any 
}

const NotIcon: React.FC<NotTpye> = ({ data })=>{
    return (
    <span className={NotIconClass}>{data}</span>
  )
}

export default NotIcon