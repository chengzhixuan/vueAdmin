import axios from 'axios';
import localStorage from 'store';
import router from '../router';
const url = process.env.NODE_ENV === 'development' ? '/test' : '/test';
const api = axios.create({
    baseURL: url,
    transformRequest: [
        function(data, headers) {
            if (data instanceof FormData) {
                return data;
            }
            if (headers['Content-Type'].indexOf('application/json') > -1) {
                return JSON.stringify(data);
            }
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        },
    ],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
});
api.interceptors.response.use((response) => {
    if (response.data == 401) {
        localStorage.clearAll();
        router.push('/login');
    }
    return response;
}, (error) => {
    return Promise.resolve({
        data: {
            code: error.response.status,
            message: error.message,
            data: error.response.data
        }
    });
});
let token = localStorage.get('token')
if (token) {
    api.defaults.headers.common['token'] = token;
}
export default api;