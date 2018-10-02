const initState = {
    projects: [
        {id:'1', title:'Exploring AI', abstract:"This Seminar is about AI", venue:'CB11.01.101'},
        {id:'2', title:"Exploring Java", abstract:"A seminar on Java", venue:"CB11.04.201"}
    ]
}

const projectReducer = (state = initState, action) => {
    return state
}

export default projectReducer