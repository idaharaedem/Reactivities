import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import {IActivity} from '../models/Activity'

axios.defaults.baseURL = 'http://localhost:5000/api';

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

export default {
    Activities
}