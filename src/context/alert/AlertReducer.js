import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

export default (state,action) => {
    console.log(action)
    switch(action.type){
        case SET_ALERT:
            return[...state,action.payload];
        case REMOVE_ALERT:
            return state.filter(state=>state.id!==action.payload);
        default:
            return state
    }
}
