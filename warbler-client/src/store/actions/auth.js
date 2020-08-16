import apicall from "../../services/api";
import {SET_CURRENT_USER} from "../actionTypes";

export function setcurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function authUser(type, userData){
    return dispatch => {
        //wrap our thunk in a promise so we can wait for the API Call
        return new Promise((resolve, reject) => {
            return apicall("POST", `api/auth/${type}`, userData.then(({token, ...user}) => {
              localStorage.setItem("jwtToken", token)
              dispatch(setcurrentUser(user)); //indicate that api call succeed
              resolve()
            }));
        });
    }
}