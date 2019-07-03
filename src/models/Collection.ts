import axios,{AxiosResponse} from 'axios'
import { Eventing } from './Eventing'

export class Collection<T, K>{

    models: T[] = [];
    events: Eventing = new Eventing();
    constructor(public rootUrl: string, public deserialize: (json:K)=>T){}

    get on(){
        return this.events.on;
    }

    get trigger(){
        return this.events.trigger;
    }

    fetch():void{
        axios.get(this.rootUrl)
        .then((res: AxiosResponse<K[]>):void=>{
            res.data.forEach((props:K):void=>{
                const model = this.deserialize(props);
                this.models.push(model);
            })

            this.trigger('change');
        })

    }

}