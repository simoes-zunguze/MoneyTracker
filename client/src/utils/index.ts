import axios from "axios";
import store from "../store";



export const logout = () =>{

    axios.get("/auth/logout").then( res =>{
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("token")
        store.dispatch({ type: "SET_TOKENS", tokens: undefined })
    }).catch(error => {
        console.error(error);
    });
}