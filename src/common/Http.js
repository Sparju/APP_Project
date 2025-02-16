import axios from "axios"

//please change the baseURL to your server address by if using mongoDB
const instance = axios.create({
    baseURL: 'http://localhost:5000'
});
export default instance;