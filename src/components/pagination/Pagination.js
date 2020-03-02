import React from 'react';
import classes from './Pagination.module.css';

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
                            <a onClick={(e) => paginate(e, number)} href="!#" className={classes.PageLink}>
                                {number}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Pagination;