import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiUrl = process.env.REACT_APP_url;
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
        userid: user.userid,
        password: user.password
    });
    console.log("jwt", jwt);
    localStorage.setItem(tokenKey, jwt.token);

}

async function setToken(token) {
    localStorage.setItem(tokenKey, token);

}


function logout() {
    localStorage.removeItem(tokenKey);

}



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getUser, login, logout, setToken
}