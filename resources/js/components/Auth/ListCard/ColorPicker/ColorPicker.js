import React from 'react'
import classes from './ColorPicker.module.css'
import Button from "../../../UI/Button/Button";

const ColorPicker = props => {


    let colors =
        props.background.map((color, index) => {
                let active;

                if (index === props.activeColor) {
                    active = 'activeColor'
                }
                const cls = [classes.ColorBg, classes[active]];
                return (
                    <div className={cls.join(' ')} key={index}
                         style={{background: `url(${color})`, backgroundSize: 'contain'}}>
                        <Button
                            onClick={() => props.onPickColor(index, props.listId, props.name)}
                            type='colorPicker'
                        />
                    </div>
                )
            }
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
