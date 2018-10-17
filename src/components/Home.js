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
        const {type} = this.state;
        let filteredSeminars = this.props.seminars;
        filteredSeminars = filteredSeminars.filter((seminar) => {
            var str;
            switch(type){
                case 'Venue': str = seminar.venue; break;
                case 'Date': str = seminar.date; break;
                case 'Speaker': str = seminar.speaker; break;
                case 'Organiser': str = seminar.organiser; break;
                default: str = seminar.title; break;
            }
            if(str.includes(this.state.seminarFilter)){
                return seminar;
            }
        })
        this.setState({filteredSeminars})
    }

    handleSelectChange = event => {
        this.setState({type: event.target.value});
    }

    render() {
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