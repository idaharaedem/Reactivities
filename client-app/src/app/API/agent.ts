import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import {IActivity} from '../models/Activity'
import { IUser, IUserFormValues } from '../models/User';

axios.defaults.baseURL = 'http://localhost:5000/api';

//We can also use an interceptor for the request
//getting authentication for the user to see the activity list
axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config
    
}, error => {
    return Promise.reject(error);
})

//used to handle errors from the client side. First paramater is what to do when it is fulfilled, second is when its rejected.
axios.interceptors.response.use(undefined, error => {
    const {status, config, data} = error.response;
    
    console.log(error);
    if(error.message === 'Network Error' && !error.response){
        toast.error('Network error, Make sure API is running')
    }

    if(status === 404) {
       history.push('/notFound')
    }
    if(status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notFound')
    }

    if(status === 500) {
        toast.error('Server Error - Look at Terminal for info')
    }

    throw error.response;
});

const sleep = (ms: number) =>  (response: AxiosResponse) => 
new Promise<AxiosResponse>(resolve => setTimeout(()=> resolve(response), ms));

//store request in constant
const responseBody = (response: AxiosResponse) => response.data;

//request object
const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url:string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url:string, body: {}) => axios.put(url,body).then(sleep(1000)).then(responseBody),
    delete: (url:string )=> axios.delete(url).then(sleep(1000)).then(responseBody) 
}

const Activities = {
    lists: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id:string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post(`/activities`, activity),
    update: (id:string, activity: IActivity) => requests.put(`/activities/${id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`)
}

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues) :Promise<IUser> => requests.post(`/user/login/`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register/`, user)
}

export default {
    Activities,
    User
}