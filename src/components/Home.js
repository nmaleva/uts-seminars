import React, { Component } from 'react'
import SeminarsTable from "./seminarsTable"
//import Db from "../firebase/database"
import {addSeminarToFirebase, getSeminarsFromFirebase} from "../firebase/base"
import Button from '@material-ui/core/Button/Button';
import store from '../store'

import ReactDOM from 'react-dom'

import {connect} from 'react-redux'

// var array = [];

// function handleClick(e) {
//     e.preventDefault();
//     addSeminarToFirebase("test");
// }

// function getData(e){
//     array = getSeminarsFromFirebase();

// }


// const Home = () => {

//     class SSeminars extends React.Component{
//         render() {
//             return <div> ${array[0]} </div>;
//         }
//     }

//     return (
//         <div className="container">
//             <p>Welcome, this is the homepage!</p>
//             <SeminarsTable/>
//             <SSeminars />
//             Sup <Button onClick={getData()}> read </Button>
//             <Button onClick={handleClick} > aewfwe </Button>
//         </div>

//     )
// }

class Home extends Component {
    render() {
        console.log(this.props);
        const {projects} = this.props;
        return (
            <div className="home container">
                <h2> Welcome to Homepage! </h2>
                <SeminarsTable projects={projects} />
            </div>
        )
    }
}

//Db.addSeminarToFirebase();

//Grabbing Project objects from the store 
const mapStateToProps = (state) => {
    return {
        projects: state.project.projects
    }
}
export default connect(mapStateToProps)(Home)