import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import SeminarsTable from "./seminarsTable"
import Button from '@material-ui/core/Button/Button';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {TextField, Select, InputLabel, MenuItem, FormHelperText} from '@material-ui/core/';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            seminarFilter: "",
            seminars: [],
            filteredSeminars: [],
            loaded: false,
            type: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            seminarFilter: e.target.value
        })
        console.log(this.state.seminarFilter)
        const {type} = this.state;
        let filteredSeminars = this.props.seminars;
        //console.log(filteredSeminars)
        filteredSeminars = filteredSeminars.filter((seminar) => {
            //console.log(seminar);
            var str;
            switch(type){
                case 'Venue': str = seminar.venue; break;
                case 'Date': str = seminar.date; break;
                case 'Speaker': str = seminar.speaker; break;
                case 'Organiser': str = seminar.organiser; break;
                default: str = seminar.title; break;
            }
            console.log(str);
            if(str.includes(this.state.seminarFilter)){
                console.log(seminar);
                return seminar;
            }
        })
        console.log(this.state.filteredSeminars)
        this.setState({filteredSeminars})
    }

    handleSelectChange = event => {
        this.setState({type: event.target.value});
        //console.log(this.state.type);
    }

    render() {
        //console.log(this.props);
        const {seminars} = this.props;
        if(this.state.seminarFilter == ""){
            if(seminars.length != 0 && this.state.loaded){
                this.setState({
                    seminars,
                    loaded: true
                });
            }
            return (
                <div className="home container">
                    <h2>Welcome to Homepage!</h2>
                    <TextField value={this.state.seminarFilter} onChange={this.handleChange}/>
                    <Select
                        value={this.state.type}
                        onChange={this.handleSelectChange}
                        name="age"
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Filter Type
                        </MenuItem>
                        <MenuItem value={'Venue'}>Venue</MenuItem>
                        <MenuItem value={'Date'}>Date</MenuItem>
                        <MenuItem value={'Speaker'}>Speaker</MenuItem>
                        <MenuItem value={'Organiser'}>Organiser</MenuItem>
                    </Select>
                    <SeminarsTable seminars={seminars} seminarPageLink="/seminar-details/"/>
                </div>
            )
        }
        else{
            return (
                <div className="home container">
                    <h2>Welcome to Homepage!</h2>
                    <TextField value={this.state.seminarFilter} onChange={this.handleChange}/>
                    <Select
                        value={this.state.type}
                        onChange={this.handleSelectChange}
                        name="age"
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Filter Type
                        </MenuItem>
                        <MenuItem value={'Venue'}>Venue</MenuItem>
                        <MenuItem value={'Date'}>Date</MenuItem>
                        <MenuItem value={'Speaker'}>Speaker</MenuItem>
                        <MenuItem value={'Organiser'}>Organiser</MenuItem>
                    </Select>
                    <SeminarsTable seminars={this.state.filteredSeminars} seminarPageLink="/seminar-details/"/>
                </div>
            )
        }
    }
}

//Grabbing Project objects from the store 
const mapStateToProps = (state) => {
    console.log(state);
    return {
        seminars: (state.firestore.ordered.seminars != undefined) ? state.firestore.ordered.seminars : []
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'seminars' }
    ])
)(Home)