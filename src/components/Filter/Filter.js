import React from 'react';

const Filter = ( { filterData, getFiltered }) => {

    return (
        <form action="/">
            <input onChange={(e)=>filterData(e.target.value)} type="text" placeholder="Поиск"/>
            <button onClick={(e)=>{e.preventDefault(); getFiltered()}}>Найти</button>
        </form>
    )
}

export default Filter;