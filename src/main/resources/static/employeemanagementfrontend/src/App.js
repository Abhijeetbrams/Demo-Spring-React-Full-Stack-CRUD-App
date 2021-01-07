import React from 'react';
import './App.css';
import {  Switch, Route } from 'react-router-dom';
import Starterpage from './Component/starter.component';
import Employeeform from './Component/Employee-Component/employeeform.component';
import ShowEmployee from './Component/Show-Employee-Component/show.employee.component';

function App() {
  return (
    <div>
       <Switch>
       <Route exact path="/" component={Starterpage}/>
       <Route path="/employeeform/:id" component={Employeeform}/>
       <Route  path="/employeeform" component={Employeeform}/>
       <Route path="/employeeDetails" component={ShowEmployee}/>
       </Switch>
       </div>
  );
}

export default App;
