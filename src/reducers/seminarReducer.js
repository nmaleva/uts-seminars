const initState = {
    seminars: [
        // {id:'1', title:'Exploring AI', abstract:"This Seminar is about AI", venue:'CB11.01.101'},
        // {id:'2', title:"Exploring Java", abstract:"A seminar on Java", venue:"CB11.04.201"}
    ]
}

const seminarReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_SEMINAR': 
            console.log('created seminar', action.seminar);
            return state;
        case 'CREATE_SEMINAR_ERROR':
            console.log('create seminar error', action.err);
            return state;
        default:
            return state;
    }
}

export default seminarReducer