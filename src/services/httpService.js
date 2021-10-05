import axios from "axios";
import { toast } from "react-toastify";

function setUser(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt;
}


axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    console.log("Error", error)
    if (!expectedError) {
        toast.error("An Unexpected error occurs");
    }

    return Promise.reject(error);
})


// eslint-disable-next-line import/no-anonymous-default-export
export default {

    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setUser
};