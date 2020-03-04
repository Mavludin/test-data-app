import React from 'react';
import classes from './DataPage.module.css';
import Preloader from '../../components/Preloader/Preloader';
import Pagination from '../../components/Pagination/Pagination';
import Filter from '../../components/Filter/Filter';
import PopUp from '../../components/PopUp/PopUp';

import sortDownIcon from '../../img/sort-down.svg';
import sortUpIcon from '../../img/sort-up.svg';
import SelectedInfo from '../../components/SelectedInfo/SelectedInfo';

import isObjEmpty from '../../utils/CheckObject';
import dynamicSort from '../../utils/DynamicSort';

import Scroll from 'react-scroll';

class DataPage extends React.Component {

    popUp = React.createRef();
    overlay = React.createRef();
    selectedInfoBlock = React.createRef();

    state = {
        typesOfSort: [],
        currentPage: 1,
        selectedInfo: {},
        filteredData : [],
        dataPerPage: 50,
        isFiltered: false
    }

    sortTable = (pos, item, e) => {

        const tempArray = this.state.typesOfSort;

        item = item.charAt(0).toLowerCase() + item.substr(1);
        if (!tempArray[pos]) {
            this.props.recievedData.sort(dynamicSort(item, 'asc'));
            tempArray[pos] = true;
            e.currentTarget.querySelectorAll('img')[0].style.display = 'block';
            e.currentTarget.querySelectorAll('img')[1].style.display = 'none';
        } else {
            this.props.recievedData.sort(dynamicSort(item, 'desc'));
            tempArray[pos] = false;
            e.currentTarget.querySelectorAll('img')[1].style.display = 'block';
            e.currentTarget.querySelectorAll('img')[0].style.display = 'none';
        }

        this.setState({typesOfSort: tempArray});
    }

    paginate = (pageNumber) => {
        this.setState({currentPage: pageNumber})
    }

    passRowInfo = (obj) => {
        this.setState({selectedInfo: obj});
        this.scrollToSelectedInfoBlock();
    }

    filterData = (string) => {
        if (this.state.currentPage !== 1) this.paginate(1);

        if (string.length) {
            const filteredArray = this.props.recievedData.filter(item => {
                for (let key in item) {
                    if (item[key].toString().toLowerCase().includes(string.toLowerCase())) {
                        return item;
                    }
                }
            });
            this.setState({filteredData: filteredArray, isFiltered: true});
        } else this.setState({isFiltered: false});
    }

    getFiltered = () => {
        const tempArray = this.state.filteredData;
        this.props.changeMainData(tempArray);
        this.setState({isFiltered: false})
    }

    showPopUp = () => {
        this.overlay.current.style.display = 'block';
        this.popUp.current.style.display = 'block';
    }

    closePopUp = () => {
        this.overlay.current.style.display = 'none';
        this.popUp.current.style.display = 'none';
    }

    scrollToSelectedInfoBlock = () => {
        setTimeout(()=> {
            Scroll.animateScroll.scrollTo(parseInt(this.selectedInfoBlock.current.offsetTop))
        }, 200);

    }

    render() {

        const columnTitles = [];
        for (let key in this.props.recievedData[0]) {

            if (this.props.recievedData[0].hasOwnProperty(key)) {
                columnTitles.push(key.charAt(0).toUpperCase() + key.substr(1));
            }
        }

        const renderingColumnTitles = columnTitles.slice(0,5).map((item,pos) => {
            this.state.typesOfSort.push(false);
            return (
                <th onClick={(e)=>this.sortTable(pos,item,e)} key={pos+1}>
                    <div onClick={()=>false}>
                        <span>{item}</span>
                        <img className={classes.SortDownIcon} src={sortDownIcon} alt="Sort Icon" />
                        <img className={classes.SortUpIcon} src={sortUpIcon} alt="Sort Icon" />
                    </div>
                </th>
            )
        });

        const indexOfLastPost = this.state.currentPage * this.state.dataPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.dataPerPage;
        let currentData = [];
        if (this.state.isFiltered) {
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
                </tr>
            )
        });

        return (
            <Preloader visible={this.props.showLoader}>
                <div className={classes.DataPage}>
                    
                    { 
                        this.state.isFiltered ?
                            <h1>Результаты поиска:</h1>
                        : <h1>Данные</h1>
                    }

                    <Filter getFiltered={this.getFiltered} filterData={this.filterData} />

                    <button onClick={this.showPopUp}>Add new Data</button>

                    <table>
                        <thead>
                            <tr>
                                {renderingColumnTitles}
                            </tr>
                        </thead>
                        <tbody>
                                {renderingData}
                        </tbody>
                    </table>

                    {
                        (!this.state.isFiltered && (this.props.recievedData.length > this.state.dataPerPage) ) || 
                            (this.state.isFiltered && (this.state.filteredData.length > this.state.dataPerPage) )  
                            ?
                            <Pagination 
                                dataPerPage={this.state.dataPerPage} 
                                totalData={
                                    this.state.isFiltered ?
                                    this.state.filteredData.length
                                    : this.props.recievedData.length
                                } 
                                paginate={this.paginate}
                            />
                        : null
                    }

                    { 
                        isObjEmpty(this.state.selectedInfo) ? null
                        : 
                        <SelectedInfo 
                            selectedInfo={this.state.selectedInfo} 
                            selectedInfoBlock={this.selectedInfoBlock} 
                        />
                    }
                </div>

                <div onClick={this.closePopUp} ref={this.overlay} className={classes.OverLay}></div>
                <PopUp closePopUp={this.closePopUp} addNewData={this.props.addNewData} popUp={this.popUp} />
            </Preloader>
        )
    }
}

export default DataPage;