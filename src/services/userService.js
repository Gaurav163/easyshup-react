import http from "./httpService";
import { apiUrl } from "../config.json"

const url = apiUrl + "/user";

export async function register(user) {
    return await http.post(url + "/register", {
        email: user.email,
        name: user.name,
        password: user.password
    });
}

export async function login(user) {
    return await http.post(url + "/login", {
        email: user.email,
        password: user.password
    });
}