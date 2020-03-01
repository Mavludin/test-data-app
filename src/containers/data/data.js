import React from 'react';
import classes from './data.module.css';
import Preloader from '../../components/preloader/preloader';

import sortDownIcon from '../../img/data/sort-down.svg';
import sortUpIcon from '../../img/data/sort-up.svg';

class Data extends React.Component {

    state = {
        isSorted: false,
        typesOfSort: []
    }

    currentTableHeading = React.createRef();

    // dynamicSort = (property) => {
    //     let sortOrder = 1;
    //     if (property[0] === "-") {
    //         sortOrder = -1;
    //         property = property.substr(1);
    //         this.setState({ascOrder: false})
    //     } else {
    //         this.setState({ascOrder: true})
    //     }
    //     return (a,b) => {
    //         let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    //         return result * sortOrder;
    //     }
        
    // }

    dynamicSort = (key, order = 'asc') => {
        return  function innerSort (a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
          }
      
          const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];
      
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
    }

    sortTable = (e, pos, item) => {
        const tempArray = this.state.typesOfSort;

        if (tempArray[pos] === false) {
            this.props.recievedData.sort(this.dynamicSort(item, 'asc'));
            tempArray[pos] = true;
        } else {
            this.props.recievedData.sort(this.dynamicSort(item, 'desc'));
            tempArray[pos] = false;
        }

        console.log(this.re)

        this.setState({typesOfSort: tempArray})
    }

    render() {

        const columnTitles = [];

        for (let key in this.props.recievedData[0]) {

            if (this.props.recievedData[0].hasOwnProperty(key)) {
                columnTitles.push(key);
            }
        }

        const renderColumnTitles = columnTitles.map((item,pos) => {
            this.state.typesOfSort.push(false);
            return (
                <th ref={this.currentTableHeading} onClick={(e)=>this.sortTable(pos,item,e)} key={pos+1}>
                    <span>{item}</span>
                    <img src={sortUpIcon} alt="Sort Icon" />
                </th>
            )
        })

        const renderingData = this.props.recievedData.map((item,pos) =>{
            return (
                <tr key={pos+1}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address.streetAddress}</td>
                    <td>{item.description}</td>
                </tr>
            )
        })

        return (
            <Preloader visible={this.props.showLoader}>
                <div className={classes.Data}>
                    <h1>Data</h1>
                    <table>
                        <thead>
                            <tr>
                                {renderColumnTitles}
                            </tr>
                        </thead>
                        <tbody>
                                {renderingData}
                        </tbody>
                    </table>
                </div>
            </Preloader>
        )
    }
}

export default Data;