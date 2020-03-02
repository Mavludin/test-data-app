import React from 'react';

const Filter = ( { filterData }) => {

    return (
        <form action="/">
            <input onChange={(e)=>filterData(e.target.value)} type="text" placeholder="Введите что-нибудь"/>    
        </form>
    )
}

export default Filter;