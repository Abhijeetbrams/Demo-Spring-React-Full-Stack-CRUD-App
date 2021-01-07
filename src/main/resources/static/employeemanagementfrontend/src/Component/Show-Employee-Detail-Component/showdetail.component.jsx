import React, { useState } from 'react';
import './showdetails.styles.scss';
import {withRouter} from 'react-router';
import axios from 'axios';
import editEmployeeAction from '../../Redux/EmployeeReducer/EditEmployee.Action';
import {connect} from 'react-redux';
import setMessage from '../../Redux/EmployeeReducer/Setmessage.action';
import setCurrentEmployeesDetail from '../../Redux/EmployeeReducer/Employee.Action';

const ShowDetail=({id,firstName,lastName,emailId,editEmployeeAction,history,setMessage,setCurrentEmployeesDetail})=>
{
   const handleEdit=async(id)=>
    {
        console.log("handleEdit Called");
        
        try{
            const url=`http://localhost:8080/api/v1/employees/${id}`;
            console.log(url);
            const response= await axios.get(url);
            const data=await response.data;
            editEmployeeAction(data);
            history.push(`/employeeform/${id}`);
            
        }catch(error)
        {
            console.log(error);
        }
    }
    const handleDelete=async(id)=>
    {
        const url=`http://localhost:8080/api/v1/employees/${id}`
        const response= await axios.delete(url);
        const data= response.data;
        setMessage(data.message);
        setCurrentEmployeesDetail(null);
        //history.push("/employeeDetails");
    }
    return(
       <div >
           
                <tbody>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{emailId}</td>
                  <span>
                     <tr> <button onClick={()=>handleDelete(id)}>Delete</button></tr>
                     <tr> <button onClick={()=>handleEdit(id)}>Edit</button></tr>
                      </span>
                </tbody>
               

       </div>
    )
}

const mapDispatchToProps=(dispatch)=>({
    editEmployeeAction:employee=>dispatch(editEmployeeAction(employee)),
    setMessage:message=>dispatch(setMessage(message)),
    setCurrentEmployeesDetail:employees=>dispatch(setCurrentEmployeesDetail(employees))
});

export default withRouter(connect(null,mapDispatchToProps)(ShowDetail));