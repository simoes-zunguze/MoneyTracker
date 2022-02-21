import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Tokens } from "../store";
import { IUser } from "../store";



type LoginReponse = {
    tokens: Tokens,
    user: IUser
}

const AxiosIntreceptors: React.FC = () => {
    const dispatch = useDispatch();
    const url = useSelector<{ url: string }>(state => state.url)
    // const [token, setToken] = useState<string>("")
    // const tokens = useSelector<{ tokens: Tokens }>(state => state.tokens) as Tokens


    const interceptors = () => {

        axios.interceptors.request.use(config => {
            config.baseURL = url as string;
            const token = localStorage.getItem("token")
            const refreshToken = localStorage.getItem("refreshToken")

            config.headers = { Authorization: "Bearer " + token, "x-refresh-token": refreshToken as string }

            return config;
        },
            error => {

                if (error.response)
                    if (error.response.status === 401) {
                        localStorage.clear();
                        toast.warning('Unautorized', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                return Promise.reject(error);

            }
        )

        axios.interceptors.response.use(response => {

            if (response.config.url === "/auth/login"){
                if (response.status === 200) {
                    const data = response.data as LoginReponse;
                    const {tokens, user} = data;
                        
                    dispatch({ type: "SET_TOKENS", tokens: tokens })
                    dispatch({ type: "SET_USER", user: user })
                    localStorage.setItem("userID", user.id+"")
                    localStorage.setItem("token", tokens.token)
                    localStorage.setItem("refreshToken", tokens.refreshToken)
                }
            }    
            
            if (response.headers["x-token"]) {

                // console.log(response.headers["x-token"]);
                localStorage.setItem("token", response.headers["x-token"])  
            }

            return response;
        },
            error => {
                if (error.response){
                    if (error.response.status === 401) {
                        dispatch({ type: "SET_TOKENS", tokens: undefined })
                    }else if(error.response.status === 500){
                        toast.error('Server Error', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });   
                    }
                }else{
                    toast.error('Connection Refused', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });   
                }
                return Promise.reject(error);
            }
        )
    }

    function checkLocaltoken() {
        const localToken = localStorage.getItem("token");
        const localRefreshToken = localStorage.getItem("refreshToken");
        if (localRefreshToken) {
            dispatch({ type: "SET_TOKENS", tokens: { token: localToken, refreshToken: localRefreshToken } })
        }
    }


    async function setProfile() {

        const res = await axios.get("/auth/profile");
        const user =  res.data;
        dispatch({ type: "SET_USER", user})
        
    }

    useEffect(() => {
        interceptors()
        checkLocaltoken();
        setProfile();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
        </>
    )
}

export default AxiosIntreceptors;