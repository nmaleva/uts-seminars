export const createSeminar = (seminar) => {
    return (dispatch, getState) => {
        //make async call to database
        dispatch({ type: 'CREATE_SEMINAR', seminar: seminar});
    }
}