import {combineReducers} from 'redux';
import EmployeeReducer from './EmployeeReducer/EmployeeReducer';

export default combineReducers({
    employee:EmployeeReducer
});
