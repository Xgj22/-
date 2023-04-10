import { v4 as uuidv4 } from 'uuid';

let userId
export default function SET_USERID(){
    if(!localStorage.getItem('USERTEMPID')){
        userId = uuidv4()
        localStorage.setItem('USERTEMPID',userId)
    }else{
        userId = localStorage.getItem('USERTEMPID')
    }
    return userId
}