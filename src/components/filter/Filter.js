import React from 'react';

const Filter = ( { filterData }) => {

    return (
        <form action="/">
            <input onChange={(e)=>filterData(e.target.value)} type="text" placeholder="Поиск"/>
            <button>Найти</button>
        </form>
    )
}

export default Filter;