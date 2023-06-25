import axios from 'axios';

export default axios.create({
    baseURL:"https://api.rawg.io/api",
    params:{
        key:'70620f8370454095b4d77fc1bfc1b4dc'
    }
})