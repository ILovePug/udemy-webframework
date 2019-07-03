
type Callback = ()=>void;

export class Eventing{
    private events: {[key:string]: Callback[]} = {};

    on = (eventName:string, callback: Callback):void =>{
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] =handlers;
        
    }

    
    trigger = (eventName: string):void =>{
        const callbacks = this.events[eventName];
        if(!callbacks || !callbacks.length) return;
        for (const callback of callbacks) {
            callback();
        }

    }
}