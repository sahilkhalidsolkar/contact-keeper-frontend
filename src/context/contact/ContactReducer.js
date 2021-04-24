import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types'

export default (state , action)=>{
    console.log(action)
    switch(action.type){
        case ADD_CONTACT:
            return{
                ...state,
                contacts:[...state.contacts,action.payload],
                loading:false
            };
        case DELETE_CONTACT:
            return{
                ...state,
                contacts:state.contacts.filter(contact=>contact._id!==action.payload),
                loading:false
            };
        case SET_CURRENT:
            return{
                ...state,
                current:action.payload
            };
        case CLEAR_CURRENT:
            return{
                ...state,
                current:null
            };
        case UPDATE_CONTACT:
            return{
                ...state,
                contacts:state.contacts.map(contact=>{
                    if(contact._id===action.payload._id){
                        return action.payload
                    }
                    else{
                        return contact
                    }
                }),
                loading:false
            };
        case FILTER_CONTACT:
            return{
                ...state,
                filtered:state.contacts.filter(contact=>{
                    return contact.name.includes(action.payload) || contact.email.includes(action.payload)
                }),
                loading:false
            };
        case CLEAR_FILTER:
            return{
                ...state,
                filtered:null,
                loading:false
            };
        case CONTACT_ERROR:
            return{
                ...state,
               error:action.payload
            };
        case GET_CONTACTS:
            return{
                ...state,
                contacts:action.payload,
                loading:false
            };
        case CLEAR_CONTACTS:
            return{
                ...state,
                contacts:[]
            };


        default:
            return state
    }
}