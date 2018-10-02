import React from 'react'
import SeminarsTable from "./seminarsTable"
//import Db from "../firebase/database"
import {addSeminarToFirebase, getSeminarsFromFirebase} from "../firebase/base"
import Button from '@material-ui/core/Button/Button';
import store from '../store'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'

var array = [];

function handleClick(e) {
    e.preventDefault();
    addSeminarToFirebase("test");
}

function getData(e){
    array = getSeminarsFromFirebase();

}


const Home = () => {

    class SSeminars extends React.Component{
        render() {
            return <div> ${array[0]} </div>;
        }
    }

    return (
        <div className="container">
            <p>Welcome, this is the homepage!</p>
            <SeminarsTable/>
            <SSeminars />
            Sup <Button onClick={getData()}> read </Button>
            <Button onClick={handleClick} > aewfwe </Button>
        </div>

    )
}

//Db.addSeminarToFirebase();

export default Home