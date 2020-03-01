import React from 'react';
import './App.css';

import Choice from './containers/choice/choice';
import Data from './containers/data/data';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {

  state = {
    showLoader: true,
    recievedData: []
  }

  getDataFromBackEnd = (data) => {
    this.setState({showLoader: false, recievedData: data})
  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route 
              exact path="/" 
              render={(props)=><Choice 
                  {...props} 
                  getDataFromBackEnd = {this.getDataFromBackEnd} 
                />
              } 
            />
            <Route 
              exact path="/data" 
              render={(props)=><Data 
                    {...props} 
                    recievedData={this.state.recievedData} 
                    showLoader = {this.state.showLoader} 
                  />
                } 
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
