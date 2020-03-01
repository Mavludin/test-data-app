import React from 'react';
import classes from './choice.module.css';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { littleDataSource, largeDataSource } from '../../utils/endpoints';

class Choice extends React.Component {

    state = {
        recievedData : [],
    }

    getLittleData = () => {
        axios.get(littleDataSource)
        .then(response => {
            this.props.getDataFromBackEnd(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    getLotsOfData = () => { 
        axios.get(largeDataSource)
        .then(response => {
            this.props.getDataFromBackEnd(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className={classes.Choice}>
                <h1>Make a choice</h1>
                <div className={classes.ChoiceButtons}>
                    <Link exact="true" to="/data" onClick={this.getLittleData} className={classes.LittleData}>Little Data</Link>
                    <Link exact="true" to="/data" onClick={this.getLotsOfData} className={classes.LotsOfData}>Large Data</Link>
                </div>
            </div>
        )
    }
}

export default Choice;