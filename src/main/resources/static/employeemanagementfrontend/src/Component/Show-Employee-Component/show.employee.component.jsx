import axios from 'axios';
import React, { useEffect }  from 'react';
import { useMemo } from 'react';
//import {useState} from 'react';
import ShowDetail from '../Show-Employee-Detail-Component/showdetail.component';
import {connect} from 'react-redux';
import setCurrentEmployeesDetail from '../../Redux/EmployeeReducer/Employee.Action';


const ShowEmployee=(props)=>
{
    const EmployeeDataUrl='http://localhost:8080/api/v1/employees';
   // const [empDetails,setEmpDetails]=useState([]);

    useEffect(async()=>
    {
        console.log("useEffect Called");

        const response= await axios.get(EmployeeDataUrl);
        const data=await response.data;
        //console.log([...data]);
        //setEmpDetails([...data]);
        props.setCurrentEmployeesDetail(data);
        
        //setEmpDetails({empDetails:data});
               /*         
                * Handling Errors using promises
                */
           /*     axios.get(EmployeeDataUrl)
                .then((response) => {
                    // Success
                    setEmpDetails({empDetails:response.data},()=>console.log(empDetails));
                    
                })
                .catch((error) => {
                    // Error
                    if (error.response) {
                        /*
                        * The request was made and the server responded with a
                        * status code that falls out of the range of 2xx
                        */
              /*          console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        /*
                        * The request was made but no response was received, `error.request`
                        * is an instance of XMLHttpRequest in the browser and an instance
                        * of http.ClientRequest in Node.js
                        */
              /*          console.log(error.request);
                      } else {
                        // Something happened in setting up the request and triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                 });*/
    },[JSON.stringify(props.currentEmployeesDetail)]);
    
    
    return (

        <div >
            <h3>{props.message}</h3>
           <h2>Employee Details</h2>
           
        <button onClick={()=>props.history.push('/employeeform/-1')}>Add Employee</button>
           <table>
               <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Id</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {props.currentEmployeesDetail?
             props.currentEmployeesDetail.map(emp=><ShowDetail key={emp.id} {...emp}/>):""}
             </tbody>
     </table>
</div>
    );
}

const mapStatetoProps=(state)=>({
   currentEmployeesDetail:state.employee.currentEmployeeDetails,
   message:state.employee.message
})

const mapDispatchToProps=(dispatch)=>({
    setCurrentEmployeesDetail:employees=>dispatch(setCurrentEmployeesDetail(employees))
})
export default connect(mapStatetoProps,mapDispatchToProps)(ShowEmployee);