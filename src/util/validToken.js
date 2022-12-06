import jwt_decode from 'jwt-decode';

export function ValidateTimeAccessToken(){
    const accessToken = localStorage.getItem("accessToken");
    const decodePayload = jwt_decode(accessToken, {payload: true});
    const exp = (new Date(decodePayload.exp* 1000).getTime());
    const now = new Date().getTime();

    return now < exp;
}

export function ValidateTimeRefreshToken(){
    const refreshToken = localStorage.getItem("refreshToken");
    const decodePayload = jwt_decode(refreshToken, {payload: true});
    const exp = (new Date(decodePayload.exp* 1000).getTime());
    const now = new Date().getTime();

    return now < exp;
}