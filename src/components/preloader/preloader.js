import React from 'react';
import classes from './Preloader.module.css';

const Preloader = (props) => {
    return (
        props.visible ?
            <div className={classes.Preloader}>
                <h1>Fetching data...</h1>
            </div>
        :
        props.children
    )
}

export default Preloader;