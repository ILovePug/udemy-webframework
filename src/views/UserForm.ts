import { View } from './View'
import { User, UserProps } from '../models/User'

export class UserForm extends View<User, UserProps>{


    eventsMap():{[key: string]: ()=>void}{
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
            'click:.save-model': this.onSaveModelClick,
        }
    }
    onSaveModelClick=():void=>{
        this.model.save();
    }
    onSetAgeClick= ():void=>{
        this.model.setRandomAge();
    }

    onSetNameClick=():void=>{
        var input = this.parent.querySelector('input');
        if(!input) return;
        const name = input.value;
        this.model.set({name})
    }

    template():string{
        return `
            <div>
            <input placeholder="${this.model.get('name')}" />
            <button class="set-name">Change Name</button>
            <button class="set-age">Set Random Age</button>
            <button class="save-model">Save</button>
            </div>
        `;
    }


}