import React from 'react';
import classes from './Pagination.module.css';
import { Link } from 'react-router-dom';

const Pagination = ({ dataPerPage, totalData, paginate }) => {
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(totalData / dataPerPage); i++) {
        pageNumbers.push(i);
    }

    const toggleActiveClass = (e) => {
        e.target.classList.toggle(classes.ActiveLink);
    }

    return (
        <nav>
            <ul className={classes.Pagination}>
                {pageNumbers.map(number => {
                    return(
                        <li key={number} className={classes.PageItem}>
                            <Link 
                                onClick={(e)=>{paginate(number);toggleActiveClass(e);}}
                                to={`/data?page=${number}`} 
                                className={classes.PageLink}
                            >
                                {number}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Pagination;