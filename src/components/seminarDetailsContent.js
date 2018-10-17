import React from 'react'
import ReactDOM from 'react-dom'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    row: {
        width: '30%',
        margin:'auto'
    },
    container: {
        padding:'3%',
    }
  });

const SeminarDetailsContent = (props) => {
    const {seminar,classes} = props;
    return (
        <div>
            <h1> {seminar.title} </h1>
            <div className={classes.container}>
                <div className={classes.row}> 
                    <div style={{float:'left'}}> <b> Organiser: </b> {seminar.organiserName} </div>
                    <div style={{float:'right'}}> <b> Speaker: </b> {seminar.speaker} </div>
                </div>
                <br/>
                <br/>
                <div className={classes.row}> 
                    <b> Speaker Bio: </b>  {seminar.speakerBio}
                </div>
                <br/>
                <div className={classes.row}> 
                    <b> Abstract: </b>  {seminar.abstract}
                </div>
                <br/>
                <div className={classes.row}> 
                    <div style={{float:'left'}}> <b> Venue: </b> {seminar.venue} with {seminar.capacity} people capacity </div>
                    <div style={{float:'right'}}> <b> Host </b> {seminar.host} </div>
                </div>
                <br/> 
                <br/>
                <div className={classes.row}>
                    <div style={{float:'left'}}> <b> Date </b> {seminar.date} at {seminar.time} </div>
                    <div style={{float:'right'}}> <b> Duration </b> {seminar.duration} minutes </div>
                </div>
            </div>

        </div>
    )

}

export default withStyles(styles)(SeminarDetailsContent)