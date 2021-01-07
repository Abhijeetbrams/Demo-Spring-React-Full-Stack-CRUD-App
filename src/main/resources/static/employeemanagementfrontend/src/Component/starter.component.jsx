import React from 'react';

const Starterpage=(props)=>
{
    console.log("Starter page")
    return(
        <div>
            <h1>Please click below to fill the form</h1>
            <button onClick={()=>props.history.push("/Employeeform")}>Form Fill Up</button>
        </div>
    );
}

export default Starterpage;