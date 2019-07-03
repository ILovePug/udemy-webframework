
import { AxiosResponse, AxiosPromise } from 'axios';

interface ModelAttributes<T>{
    get <K extends keyof T>(key: K): T[K];
    getAll():T;
    set(value: T):void;
}

interface Sync<T>{
    fetch(id:number): AxiosPromise<T>;
    save(data: T): AxiosPromise;

}

interface Events{
    on(eventName:string, callback: ()=>void): void;
    trigger(eventName:string): void;
}

interface HasId{
    id?:number
}

export class Model<T extends HasId>{

    constructor(
        private attributes: ModelAttributes<T>,     
        private events: Events,
        private sync: Sync<T>
    ){}

    on = this.events.on;
    trigger = this.events.trigger;
    get = this.attributes.get;

    // get get(){
    //     return this.attributes.get;
    // }

    set (update: T):void{
        
        this.attributes.set(update);
        this.events.trigger('change');
    }

    fetch():void{
        const id = this.attributes.get("id");

        if(typeof id !=='number'){
            throw new Error('Cannot fetch without an id')
        }

        this.sync.fetch(id).then((res:AxiosResponse<T>):void=>{
            this.set(res.data);
        })

            
    }

    save():void{

        const data = this.attributes.getAll();
        this.sync.save(data).then((res: AxiosResponse<T>):void=>{
            this.trigger('save');
        })
        .catch(()=>{
            this.trigger('error');
        })
    }
}