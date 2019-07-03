import axios, { AxiosPromise } from 'axios'


export class ApiSync<T extends {id?:number}>{
    constructor(public rootUrl: string){}
    
    fetch(id:number): AxiosPromise<T>{
        return axios.get(`${this.rootUrl}/${id}`);
    }

    save(data: T):AxiosPromise<T>{

        if(data.id){
            return axios.put(`${this.rootUrl}/${data.id}`,data)

        }else{
            return axios.post(this.rootUrl,data)

        }
    }
}