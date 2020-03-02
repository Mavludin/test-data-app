import React from 'react';

const CurrentRowInfo = ({ currentRowInfo }) => {

    const obj = currentRowInfo;

    return (

        <div>
            Выбран пользователь <b>{`${obj.firstName} ${obj.lastName}`}</b>
            Описание:
            <textarea defaultValue={obj.description} />
            Адрес проживания: <b>{obj.address.streetAddress}</b>
            Город: <b>{obj.address.city}</b>
            Провинция/штат: <b>{obj.address.state}</b>
            Индекс: <b>{obj.address.zip}</b>
        </div>
    )
}

export default CurrentRowInfo;