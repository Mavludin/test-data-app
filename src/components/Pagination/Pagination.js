import React from 'react';
import classes from './Pagination.module.css';
import { Link } from 'react-router-dom';

class Pagination extends React.Component {

    state = {
        activeItemId: 0
    }

    toggleActive = (id) => {
        this.setState({
            activeItemId: id
        })
    }

    render() {

        const { dataPerPage, totalData, paginate } = this.props;

        const pageNumbers = [];

        for (let i=1; i<=Math.ceil(totalData / dataPerPage); i++) {
            pageNumbers.push(i);
        }

        const { activeItemId } = this.state;
    
        return (
            <nav className={classes.Pagination}>
                <ul>
                    {pageNumbers.map((number, pos) => {
                        return(
                            <li key={number} 
                                className={
                                    activeItemId === pos 
                                    ? classes.PageItem_Active
                                    : classes.PageItem
                                } 
                            >
                                <Link 
                                    onClick={()=>{paginate(number); this.toggleActive(pos)}}
                                    to={`/data?page=${number}`} 
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
}

export default Pagination;