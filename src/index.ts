
import { UserEdit} from './views/UserEdit'
import { User, UserProps } from './models/User'
import { UserList } from './views/UserList'
import { Collection } from './models/Collection'

const user = User.buildUser({age:5, name:'Qian5'});

const root = document.getElementById('root');
if(root){
    //const userEdit = new UserEdit(root, user)
    //userEdit.render();

    var users = new Collection<User,UserProps>('http://localhost:3000/users', 
    (json: UserProps): User=>{
        return User.buildUser(json);
    })

    users.on('change',()=>{
        new UserList(root,users).render();

    })
    users.fetch();

}else{
    throw new Error('Root element not found')
}

