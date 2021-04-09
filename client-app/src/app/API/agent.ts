import axios, { AxiosResponse } from 'axios';
import { request } from 'http';
import { toast } from 'react-toastify';
import { history } from '../..';
import {IActivity} from '../models/Activity'
import { IPhoto, IProfile } from '../models/Profile';
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
    delete: (url:string )=> axios.delete(url).then(sleep(1000)).then(responseBody),
    //For image posting
    postForm: (url: string, file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post(url, formData, {
            headers: {'Content-type': 'multipart/form-data'}
        }).then(responseBody)
    }
}

const Activities = {
    lists: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id:string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post(`/activities`, activity),
    update: (id:string, activity: IActivity) => requests.put(`/activities/${id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`),
    attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
    unAttend: (id: string) => requests.delete(`/activities/${id}/attend`)
}

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues) :Promise<IUser> => requests.post(`/user/login/`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register/`, user)
}

const Profiles = {
    getDetails: (username: string) : Promise<IProfile> => requests.get(`/profile/${username}`),
    uploadUserPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setmain`, {}),
    deletPhoto: (id:string) => requests.delete(`/photos/${id}`),
    editProfile: (profile: IProfile) => requests.put(`/profile`, profile),
    follow: (username: string) => requests.post(`/profiles/${username}/follow`, {}),
    unfollow: (username:string) => requests.delete(`/profiles/${username}/follow`),
    listFollowings: (username: string, listReturn: string) : Promise<IProfile[]> => 
    requests.get(`/profiles/${username}/follow?listReturn=${listReturn}`)
}

export default {
    Activities,
    User,
    Profiles
}