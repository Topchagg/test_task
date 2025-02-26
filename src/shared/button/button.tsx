import { FC } from 'react'

import { buttonInterface } from './button.interface'
import './button.css'


const Button:FC<buttonInterface> = ({text}) => {
    return (
        <button className='default-btn'>
            {text}
        </button>
    )
}

export default Button