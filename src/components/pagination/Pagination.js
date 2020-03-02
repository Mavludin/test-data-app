import React from 'react';
import classes from './Pagination.module.css';
import { NavLink } from 'react-router-dom';

const Pagination = ({ dataPerPage, totalData, paginate }) => {
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(totalData / dataPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className={classes.Pagination}>
                {pageNumbers.map(number => {
                    return(
                        <li key={number} className={classes.PageItem}>
                            <NavLink activeClassName={classes.ActivePage} onClick={()=>paginate(number)} exact={true} to={`/data/${number}`} className={classes.PageLink}>
                                {number}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Pagination;