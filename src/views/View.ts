import { Model } from '../models/Model'
export abstract class View<T extends Model<K>, K>{
    
    regions: {[key:string]:Element}={}

    constructor(public parent: Element, public model: T){
        this.bindModel();
    }
    abstract template():string;

    eventsMap():{[key: string]: ()=>void}{
        return {};
    };

    regionsMap():{[key:string]:string}{
        return {};
    }

    bindModel():void{
        this.model.on('change',this.render)

    }

    mapRegions(fragment: DocumentFragment):void{
        const maps = this.regionsMap();
        for (const key in maps) {
            const ele = fragment.querySelector(maps[key]);
            if(ele) this.regions[key] = ele;
            
        }
        
    }
    
    bindEvents(fragment: DocumentFragment):void{
        const eventsMap = this.eventsMap();
        for (const eventKey in eventsMap) {
            const [eventName, selector]=eventKey.split(':');
            fragment.querySelectorAll(selector).forEach((element:Element):void=>{
                element.addEventListener(eventName, eventsMap[eventKey]);
            })
            
        }
    }

    onRender():void{
        
    }

    render=():void=>{
        this.parent.innerHTML= "";
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        
        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);

        this.onRender();


        this.parent.append(templateElement.content);
        
    }

}