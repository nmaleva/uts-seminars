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