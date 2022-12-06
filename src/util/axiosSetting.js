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
        console.log(error)
        if(error.response.status === 401 || error.response.status === 403){
            try{
                const originalRequest = error.config;
                if(ValidateTimeRefreshToken() && !ValidateTimeAccessToken()){
                    const res = await axios.post('http://10.150.149.114:8080/refresh', {
                        refreshToken: localStorage.getItem("refreshToken")
                    });
                    console.log(res)
                    if(res.status === 200){
                        localStorage.setItem("accessToken", res.data.accessToken)
                        return axios(originalRequest);
                    }
                }
                else if(!ValidateTimeRefreshToken()){
                    localStorage.clear();
                    alert("다시 로그인해주세요.");
                    window.location.href="http://localhost:3000/login";
                }
            }catch(error){
                console.log(error)
            }
        }
        return Promise.reject(error);
    }
)