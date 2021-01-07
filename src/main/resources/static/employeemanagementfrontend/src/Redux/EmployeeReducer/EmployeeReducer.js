const INITIAL_STATE=
{
    currentEmployeeDetails:null,
    editEmployee:null,
    message:null
}

const EmployeeReducer=(state=INITIAL_STATE,action)=>
{
    switch (action.type)
    {
        case 'SET_EMPLOYEE_DETAILS':
            return {
                ...state,
                currentEmployeeDetails:action.payload
            }
        case 'EDIT_EMPLOYEE':
            return {
                ...state,
                editEmployee:action.payload
            }    
        case 'SET_MESSAGE':
            return{
                ...state,
                message:action.payload
            }    

        default:
        return state;
    }
}

export default EmployeeReducer;