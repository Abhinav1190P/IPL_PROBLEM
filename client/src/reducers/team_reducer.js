export default function foo(state={},action){
    switch(action.type){
        case 'GET_TEAMS':
            return {...state,teamData:action.payload}

        case 'UPDATE_TEAMS':
            return {...state,teamData:action.payload}
        default:
            return state
    }
}