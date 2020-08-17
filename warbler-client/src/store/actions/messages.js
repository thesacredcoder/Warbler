import {apicall} from "../../services/api";
import {addError} from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

export const fetchMessages = () => {
    return dispatch => {
        return apicall("get", "/api/messages")
            .then(res => {
                dispatch(loadMessages(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    };
};
