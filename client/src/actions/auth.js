import { AUTH } from "../constants/actionTypes";
import * as api from "../api";
import { useNavigate } from "react-router-dom";

export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in the user ...
        const history = useNavigate();

        history("/");
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
	try {
		// sign up the user ...
		const history = useNavigate();

		history("/");
	} catch (error) {
		console.log(error);
	}
};