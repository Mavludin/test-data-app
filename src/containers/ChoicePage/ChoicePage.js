import React from 'react';
import classes from './ChoicePage.module.css';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { littleDataSource, largeDataSource } from '../../utils/Endpoints';

class ChoicePage extends React.Component {

    makeAPICall = (dataSource) => {
        axios.get(dataSource)
        .then(response => {
            this.props.getDataFromBackEnd(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {

        return (

            <div className={classes.ChoicePage}>
                <h1>Make a choice</h1>
                <div className={classes.ChoiceButtons}>
                    <Link 
                        exact="true" 
                        to='/data' 
                        onClick={()=>this.makeAPICall(littleDataSource)} className={classes.LittleData}>
                        Little Data
                    </Link>
                    <Link 
                        exact="true" 
                        to='/data' 
                        onClick={()=>this.makeAPICall(largeDataSource)} className={classes.LotsOfData}>
                        Large Data
                    </Link>
                </div>
            </div>
        )
    }

}

export default ChoicePage;