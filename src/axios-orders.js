import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://pizza-maker-ffea8.firebaseio.com/'
});

export default instance;