import React from 'react';
import classes from './ChoicePage.module.css';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { littleDataSource, largeDataSource } from '../../utils/Endpoints';

class Choice extends React.Component {

    getLittleData = () => {
        axios.get(littleDataSource)
        .then(response => {
            this.props.getDataFromBackEnd(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    getLargeData = () => { 
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
                <h1>Сделай выбор</h1>
                <div className={classes.ChoiceButtons}>
                    <Link exact="true" to='/data' onClick={this.getLittleData} className={classes.LittleData}>Мало данных</Link>
                    <Link exact="true" to='/data' onClick={this.getLargeData} className={classes.LotsOfData}>Много данных</Link>
                </div>
            </div>
        )
    }
}

export default Choice;