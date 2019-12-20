import React from 'react'
import classes from './ColorPicker.module.css'
import Button from "../../../UI/Button/Button";

const ColorPicker = props => {
    let colors =
        props.background.map((color, index) => (
                <div key={index} style={{background: `url(${color})`}}>
                    <Button
                        onClick={() => props.onPickColor(index, props.listId, props.name)}
                        type='colorPicker'
                    />
                </div>
            )
        );
    return (
        <div className={classes.ColorPicker}>
            <p>Выберите оформление подложки</p>
            <div className={classes.ColorPickerBody}>
                {colors}
            </div>
        </div>
    )
};

export default ColorPicker
