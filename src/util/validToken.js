import jwt_decode from 'jwt-decode';

export function ValidateTimeAccessToken(){
    try{
        const accessToken = localStorage.getItem("accessToken");
        const decodePayload = jwt_decode(accessToken, {payload: true});
        const exp = (new Date(decodePayload.exp* 1000).getTime());
        const now = new Date().getTime();

        return now < exp;
    }catch(error){
        console.log(error)
    }
}

export function ValidateTimeRefreshToken(){
    try{
        const refreshToken = localStorage.getItem("refreshToken");
        const decodePayload = jwt_decode(refreshToken, {payload: true});
        const exp = (new Date(decodePayload.exp* 1000).getTime());
        const now = new Date().getTime();

        return now < exp;
    }catch(error){
        console.log(error);
    }
}