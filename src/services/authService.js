import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json"

const url = apiUrl + "/user";
const tokenKey = "token";
http.setUser(localStorage.getItem(tokenKey));

function getUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        const user = jwtDecode(jwt);
        return user;
    } catch (ex) { }
}

async function login(user) {

    const { data: jwt } = await http.post(url + "/login", {
        email: user.email,
        password: user.password
    });
    console.log("jwt", jwt);
    localStorage.setItem(tokenKey, jwt.token);

}

function logout() {
    localStorage.removeItem(tokenKey);

}



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getUser, login, logout
}