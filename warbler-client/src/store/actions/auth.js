 import apicall from "../../services/api";
 import {SET_CURRENT_USER} from "../actionTypes";
 import { addError, removeError } from "./errors";

 export function setcurrentUser(user) {
     return {
         type: SET_CURRENT_USER,
         user
     };
 }

 export function logout(){
     return dispatch => {
         localStorage.clear();
         dispatch(setcurrentUser({}));
     };
 }

 export function authUser(type, userData){
     return dispatch => {
         //wrap our thunk in a promise so we can wait for the API Call
         return new Promise((resolve, reject) => {
             return apicall("post", `api/auth/${type}`, userData).then(({token, ...user}) => {
               localStorage.setItem("jwtToken", token)
               dispatch(setcurrentUser(user)); //indicate that api call succeed
               dispatch(removeError());
               resolve();
             })
             .catch(error => {
                 dispatch(addError(error.message));
                 reject();
             });
         });
     }
 }