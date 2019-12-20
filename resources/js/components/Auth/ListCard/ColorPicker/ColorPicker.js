import React from 'react'
import classes from './ColorPicker.module.css'

const ColorPicker = props => {
    console.log(props.background);
    return (
        <div className={classes.ColorPicker}>
            <p>Выберите оформление подложки</p>
            {props.background.forEach((color, index) => (
                    <div style={{background: color[index]}}>
                    </div>
                )
            )}
        </div>
    )
}

export default ColorPicker
