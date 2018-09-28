import React from 'react'
import SeminarsTable from "./seminarsTable"
import Db from "../firebase/database"

const Home = () => {
    return (
        <div className="container">
            <p>Welcome, this is the homepage!</p>
            < SeminarsTable />
            <Db />
        </div>



    )
}

export default Home