export const createSeminar = (seminar) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('seminars').add({
            ...seminar,
            organiser: getFirebase().auth().currentUser.uid
        }).then(() => {
            dispatch({ type: 'CREATE_SEMINAR', seminar: seminar});
        }).catch((err) => {
            dispatch({type: 'CREATE_SEMINAR_ERROR', err});
        })
    }
};

export const addAttendee = (attendee, seminarId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('seminars/'+seminarId+'/attendees').add({
            ...attendee
        }).then(() => {
            dispatch({ type: 'ADD_ATTENDEE', attendee: attendee});
            return window.location.reload();
        }).catch((err) => {
            dispatch({type: 'ADD_ATTENDEE_ERROR', err});
        })
    }
}