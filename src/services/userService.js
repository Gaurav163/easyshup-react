import http from "./httpService";

const apiUrl = process.env.REACT_APP_url;
const url = apiUrl + "/user";

export async function register(user) {
    return await http.post(url + "/register", {
        userid: user.userid,
        name: user.name,
        password: user.password,
        otp: user.otp,
        type: user.type
    });
}

export async function login(user) {
    return await http.post(url + "/login", {
        email: user.email,
        password: user.password
    });
}

export async function generateOtp(type, userid) {
    return await http.post(url + "/gernerateotp", {
        type,
        userid
    });
}
