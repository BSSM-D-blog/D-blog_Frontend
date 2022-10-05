import axios from "axios";

export const instance = axios.create({baseURL: "http://10.150.149.114:8080"});