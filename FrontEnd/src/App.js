
import React from 'react';
import CreateTaskComponent from './components/CreateTaskComponent';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListTaskComponent from './components/ListTaskComponent';
import ViewTaskComponent from './components/ViewTaskComponent';


function App() {
  return (
     
           <div >
              <Router >
                    <HeaderComponent />
                      <div className="container">
                          <Switch> 
                                <Route path = "/" exact component = {ListTaskComponent}></Route>
                                <Route path = "/task" component = {ListTaskComponent}></Route>
                                <Route path = "/add-task/:id" component = {CreateTaskComponent}></Route>
                                <Route path = "/ add-task/:id"component = {ViewTaskComponent}></Route>     
                          </Switch>
                      </div>
                    <FooterComponent />
              </Router>
          </div>
     
  );
}

export default App;


    
    
    
    