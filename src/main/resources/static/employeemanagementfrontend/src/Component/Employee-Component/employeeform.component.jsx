import React, { useEffect } from 'react';
import {useState} from 'react';
import FormInput from '../Form-InputComponent/form-imput.component';
import CustomButton from '../Custom-Button-Component/custom-button.component';
import './employee.styles.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import editEmployeeAction from '../../Redux/EmployeeReducer/EditEmployee.Action';
import setMessage from '../../Redux/EmployeeReducer/Setmessage.action';


function Employeeform(props) {
    const[formState,setFormState]=useState({
        id:props.match.params.id,
        first_name:"",
        last_name:"",
        email_id:""
    });
            
        useEffect(()=>
        {
            console.log(props.match.params.id);
            if(props.match.params.id==-1)
            {
                return ;
            }
            else{
            console.log(props.employee);
               setFormState({
                id:props.match.params.id,
                first_name:props.employee.firstName,
                last_name:props.employee.lastName,
                email_id:props.employee.emailId
            });
         }
        },[]);
         
        console.log(JSON.stringify(formState));
            const handleSubmit=async(e)=>
            {
                console.log(props.match.params.id);
                if(props.match.params.id==-1){
                console.log("handleSubmit run"+JSON.stringify(formState));
                console.log("Event value"+JSON.stringify(e.target.value));
                e.preventDefault();
                const postData={
                    "firstName":formState.first_name,
                    "lastName":formState.last_name,
                    "emailId":formState.email_id
                }
                console.log(postData);
                
                try{
                const response=await axios.post('http://localhost:8080/api/v1/employees',postData);
                const data = response.data;
                console.log(response);
                props.setMessage(data.message);
                }catch(error)
                {
                    console.log(error);
                }
                    setFormState({
                        first_name:'',
                        last_name:'',
                        email_id:''
                })
               props.history.push('/employeeDetails');
            }
            else{
                //e.preventdefault();
                e.preventDefault();
                console.log(props.employee);
                
                console.log("handleSubmit run"+JSON.stringify(formState));
                const postData={
                    "firstName":formState.first_name,
                    "lastName":formState.last_name,
                    "emailId":formState.email_id
                }
            
                var url=`http://localhost:8080/api/v1/employees/${props.match.params.id}`;
                console.log(url);
                
                
                try{
                const response=await axios.put(url,postData);
                 const data = response.data;
                console.log(response);
                props.setMessage(data.message); 

                }catch(error)
                {
                    console.log("Error",error);
                    
                }
                
              
                
                props.history.push('/employeeDetails');
            }

            }
           const  handleChange=(e)=>
            {
                console.log("handleChange run");
                const{value,name}=e.target;
                setFormState({...formState,[name]:value});
                console.log(props.employee);
                // Note :- Don't forget to add the previous state(...formState) otherwise it will set only the
                // updated state and rest of the state will be set to null if any other state change.
            }

             
    return (
  
        <div className='add-form'>
        <h2 className='title'>Enter Employee Details</h2>
        <span>Fill the Details below</span>
        <br/>
        <br/>
        <form className='sign-up-form' onSubmit={handleSubmit}>
            
           <label>FirstName</label>
            <FormInput type='text' value={formState.first_name} name='first_name' handleChange={handleChange} label="First Name"/>
            <label>LastName</label>
            <FormInput type='text' value={formState.last_name} name='last_name' handleChange={handleChange} label="Last Name"/>
            <label>Email Id</label>
            <FormInput type='email' value={formState.email_id} name='email_id' handleChange={handleChange} label="Email"/>
            
            <CustomButton type='submit'  >Submit</CustomButton>
        </form>
         </div>
    );

        
    
  }

  const mapStateToProps=state=>(
      {
         employee:state.employee.editEmployee
      }
  )

  const mapDispatchToProps=dispatch=>(
      {
          setEmployee:employee=>dispatch(editEmployeeAction(employee)),
          setMessage:message=>dispatch(setMessage(message))
      }
  )
export default connect(mapStateToProps,mapDispatchToProps)(Employeeform);