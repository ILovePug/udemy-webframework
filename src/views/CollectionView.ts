import { Collection } from '../models/Collection'
import {View} from './View'
export abstract class CollectionView<T,K>{
    constructor(public parent: Element, public collection: Collection<T,K>){}
    
    abstract renderItem(model: T, itemParent:Element):void;

    
    render=()=>{
        this.parent.innerHTML= "";
        const templateElement = document.createElement('template');
        this.collection.models.map((model: T):void=>{
            const itemParent = document.createElement('div');
            this.renderItem(model, itemParent);
            templateElement.content.append(itemParent);
        });    
        this.parent.append(templateElement.content);

        
    }
}