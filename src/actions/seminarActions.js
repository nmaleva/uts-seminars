export const createSeminar = (seminar) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('seminars').add({
            ...seminar
        }).then(() => {
            dispatch({ type: 'CREATE_SEMINAR', seminar: seminar});
            return window.location.href = "/my-seminars"
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


export const deleteSeminar = (seminarId) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('seminars').doc(seminarId).delete()
        .then(() => {
            dispatch({ type: 'DELETE_SEMINAR'});
            return window.location.href = "/"
        }).catch((err) => {
            dispatch({type: 'DELET_SEMINAR_ERROR', err});
        })
    }
}

export const deleteAttendee = (attendeeId, seminarId) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('seminars/'+seminarId+'/attendees').doc(attendeeId).delete()
        .then(() => {
            dispatch({ type: 'DELETE_SEMINAR'});
            return window.location.reload();
        }).catch((err) => {
            dispatch({type: 'DELETE_SEMINAR_ERROR', err});
        })
    }
}

export const updateSeminar = (seminarId, seminar) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('seminars').doc(seminarId).update(seminar)
        .then(() => {
            dispatch({ type: 'UPDATE_SEMINAR', seminar:seminar});
        }).catch((err) => {
            dispatch({type:'UPDATE_SEMINAR_ERROR', err});
        })
    }
}

export const updateAttendee = (seminarId, attendeeId, attendee) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('seminars/'+seminarId+'/attendees').doc(attendeeId).update(attendee)
        .then(() => {
            dispatch({ type: 'UPDATE_ATTENDEE', attendee:attendee});
            return window.location.reload();
        }).catch((err) => {
            dispatch({type:'UPDATE_ATTENDEE_ERROR', err});
        })
    }
}