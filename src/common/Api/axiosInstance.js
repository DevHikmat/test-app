import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://webstar-super-app.herokuapp.com/api"
})
export default axiosInstance;