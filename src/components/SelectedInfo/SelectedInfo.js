import React from 'react';
import classes from './SelectedInfo.module.css';

const SelectedInfo = ({ selectedInfo, selectedInfoBlock }) => {

    const obj = selectedInfo;

    return (

        <div ref={selectedInfoBlock} className={classes.SelectedInfo}>
            <div>
                Выбран пользователь <b>{`${obj.firstName} ${obj.lastName}`}</b>
            </div>
            <div>Описание:
                <textarea cols="50" rows="5" value={obj.description} readOnly/>
            </div>
            <div>
                Адрес проживания: <b>{obj.address.streetAddress}</b>
            </div>
            <div>
                Город: <b>{obj.address.city}</b>
            </div>
            <div>
                Провинция/штат: <b>{obj.address.state}</b>
            </div>
            <div>
                Индекс: <b>{obj.address.zip}</b>
            </div>
        </div>
    )
}

export default SelectedInfo;