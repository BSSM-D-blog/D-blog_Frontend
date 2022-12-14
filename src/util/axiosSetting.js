import axios from 'axios'
import {ValidateTimeAccessToken, ValidateTimeRefreshToken} from "./validToken";

export const instance = axios.create()

instance.interceptors.request.use(
    config => {
        config.headers['Authorization'] = localStorage.getItem("accessToken")
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (config)=>{
        return config
    },
    async (error)=>{
        if(error.response.status === 401 || error.response.status === 403){
            try{
                localStorage.removeItem("accessToken");
                const originalRequest = error.config;
                if(localStorage.getItem("refreshToken") && ValidateTimeRefreshToken() && !ValidateTimeAccessToken()){
                    const res = await axios.post('http://10.150.149.114:8080/auth/refresh', {
                        "refreshToken": localStorage.getItem("refreshToken")
                    });
                    if(res.status === 200){
                        localStorage.setItem("accessToken", res.data.accessToken)
                        return axios(originalRequest);
                    }
                }
            }catch(error){
                console.log(error)
            }
        }
        return Promise.reject(error);
    }
)