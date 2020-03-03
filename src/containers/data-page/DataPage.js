import React from 'react';
import classes from './DataPage.module.css';
import Preloader from '../../components/preloader/Preloader';
import Pagination from '../../components/pagination/Pagination';
import Filter from '../../components/filter/Filter';
import PopUp from '../../components/popup/PopUp';

// import sortDownIcon from '../../img/sort-down.svg';
// import sortUpIcon from '../../img/sort-up.svg';
import CurrentRowInfo from '../../components/current-row-info/CurrentRowInfo';

import isObjEmpty from '../../utils/CheckObject';

class Data extends React.Component {

    currentColHeading = React.createRef();
    popUp = React.createRef();
    overlay = React.createRef();

    state = {
        typesOfSort: [],
        currentPage: 1,
        currentRowInfo: {},
        filteredData : [],
        dataPerPage: 15,
        isSorted: false
    }

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

    sortTable = (pos, item) => {
        const tempArray = this.state.typesOfSort;
        item = item.charAt(0).toLowerCase()+item.substr(1);
        if (!tempArray[pos]) {
            this.props.recievedData.sort(this.dynamicSort(item, 'asc'));
            tempArray[pos] = true;
        } else {
            this.props.recievedData.sort(this.dynamicSort(item, 'desc'));
            tempArray[pos] = false;
        }

        this.setState({typesOfSort: tempArray})
    }

    paginate = (pageNumber) => {
        this.setState({currentPage: pageNumber})
    }

    passRowInfo = (obj) => {
        this.setState({currentRowInfo: obj})
    }

    filterData = (string) => {
        if (string.length) {
            const filteredArray = this.props.recievedData.filter(item => {
                for (let key in item) {
                    if (item[key].toString().toLowerCase().includes(string.toLowerCase()))
                        return item;
                    else continue;
                }
            });
            this.setState({filteredData: filteredArray});
        }
    }

    showPopUp = () => {
        this.overlay.current.style.display = 'block';
        this.popUp.current.style.display = 'block';
    }

    closePopUp = () => {
        this.overlay.current.style.display = 'none';
        this.popUp.current.style.display = 'none';
    }

    render() {
        const columnTitles = [];

        for (let key in this.props.recievedData[0]) {

            if (this.props.recievedData[0].hasOwnProperty(key)) {
                columnTitles.push(key.charAt(0).toUpperCase()+key.substr(1));
            }
        }

        const renderColumnTitles = columnTitles.map((item,pos) => {
            this.state.typesOfSort.push(false);
            return (
                <th ref={this.currentColHeading} onClick={()=>this.sortTable(pos,item)} key={pos+1}>
                    <span>{item}</span>
                    {/* <img src={sortUpIcon} alt="Sort Icon" /> */}
                </th>
            )
        });

        const indexOfLastPost = this.state.currentPage * this.state.dataPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.dataPerPage;
        let currentData = [];
        if (this.state.filteredData.length) {
            currentData = this.state.filteredData.slice(indexOfFirstPost, indexOfLastPost);
        } else {
            currentData = this.props.recievedData.slice(indexOfFirstPost, indexOfLastPost);
        }

        const renderingData = currentData.map((item,pos) =>{
            return (
                <tr onClick={()=>this.passRowInfo(item)} key={pos+1}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address.streetAddress}</td>
                    <td>{item.description}</td>
                </tr>
            )
        });

        return (
            <Preloader visible={this.props.showLoader}>
                <div className={classes.Data}>
                    <h1>Data</h1>

                    <Filter filterData={this.filterData} />
                    <button onClick={this.showPopUp}>Add new Data</button>
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
                    {
                        this.props.recievedData.length > this.state.dataPerPage ?
                            <Pagination 
                                dataPerPage={this.state.dataPerPage} 
                                totalData={
                                    this.props.recievedData.length
                                } 
                                paginate={this.paginate}
                            />
                        : null
                    }
                    { 
                        isObjEmpty(this.state.currentRowInfo) ? null
                        : <CurrentRowInfo currentRowInfo={this.state.currentRowInfo} />
                    }
                </div>
                <div onClick={this.closePopUp} ref={this.overlay} className={classes.OverLay}></div>
                <PopUp closePopUp={this.closePopUp} addNewData={this.props.addNewData} popUp={this.popUp} />
            </Preloader>
        )
    }
}

export default Data;