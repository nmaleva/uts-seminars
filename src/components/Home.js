import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import SeminarsTable from "./seminarsTable"
import Button from '@material-ui/core/Button/Button';

class Home extends Component {
    render() {
        console.log(this.props);
        const {seminars} = this.props;
        return (
            <div className="home container">
                <h2> Welcome to Homepage! </h2>
                <SeminarsTable seminars={seminars} />
            </div>
        )
    }
}

//Grabbing Project objects from the store 
const mapStateToProps = (state) => {
    return {
        seminars: state.seminar.seminars
    }
}
export default connect(mapStateToProps)(Home)