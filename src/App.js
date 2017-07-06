import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const RECENT_URL = `https://fcctop100.herokuapp.com/api/fccusers/top/recent`;
const ALL_TIME = `https://fcctop100.herokuapp.com/api/fccusers/top/alltime`;

class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            allTime:[],
            thirtyDays:[],
            isAlltime:true,
            isRecent:false,
            sortAlltime:false,
            sortRecent:false
        }
    }
    componentDidMount(){
        // getting data of last 30 days campers
        axios.get(RECENT_URL)
        .then((response) => {
            this.setState({
                thirtyDays:response.data
            });
        })
        .catch((error) => {
            console.log(error);
        });

        // getting data of all time top campers
        axios.get(ALL_TIME)
        .then((response) => {
            this.setState({
                allTime:response.data
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    generateCampers = () =>{
        if(this.state.isAlltime){
            let campers = this.state.allTime;
            console.log(campers);
            let camperArr = campers.map((camper, index) => {
                return (
                    <li key={index} className="camper-li-item">
                        <ListItem
                            camper={camper}
                            rank={index+1}
                            isAlltime={this.state.isAlltime}
                            sortByAlltime={this.state.sortByAlltime}
                            />
                    </li>
                );
            });
            console.log(camperArr);
            return camperArr;
        }
        else{
            let campers = this.state.thirtyDays;
            return campers.map((camper, index) => {
                return (
                    <li key={index}>
                        <ListItem
                            camper={camper}
                            rank={index+1}
                            isAlltime={this.state.isAlltime}
                            sortByAlltime={this.state.sortByAlltime}
                            />
                    </li>
                );
            });
        }
    }
    allTimeHandler = () => {

            this.setState({
                isAlltime:true,
                isRecent:false
            });
    }
    recentHandler = () => {
            this.setState({
                isAlltime:false,
                isRecent:true
            });

    }
    sortHandler = () => {
        const isAlltime = this.state.isAlltime;
        const isRecent = this.state.isRecent;
        if(isAlltime){
            const campers = this.state.allTime;
            const sortedCampers = campers.reverse();
            this.setState({
                allTime:sortedCampers
            });
        }
        else if(isRecent) {
            const campers = this.state.thirtyDays;
            const sortedCampers = campers.reverse();
            this.setState({
                allTime:sortedCampers
            });
        }
    }



    render(){
        return(
            <div className="board">
                <div className="board-container">
                     <div className="toolbar">
                         <ul>
                             <li className="toolbar-li-item" onClick={this.allTimeHandler} >All Time</li>
                             <li className="toolbar-li-item" onClick={this.recentHandler}>Recent</li>
                             <li className="toolbar-li-item" onClick={this.sortHandler}>Sort</li>
                         </ul>
                     </div>
                     <div className="board-list">
                         <ul>
                            {this.generateCampers()}
                         </ul>
                     </div>
                 </div>

            </div>
        )
    }
}

const ListItem = (props) => {
    return <div className="camper-container">
        <img className="avatar-container" style={{backgroundImage:`url(${props.camper.img})`}} />
        <div className="details">
            <div className="name-rank">
                <span className="rank-num">{props.rank}.</span>
                <span className="camper-name">{props.camper.username}</span>
            </div>
            <div className="last-update">Last Update: {
                    (()=>{
                        let dateStr = props.camper.lastUpdate;
                        let dateObj = new Date(dateStr);
                        dateStr = dateObj.toUTCString();
                        dateStr = dateStr.slice(0, dateStr.length-4);
                        return dateStr;
                    })()
                }
            </div>
    </div>
        <div className="camper-points">
            {props.isAlltime? props.camper.alltime : props.camper.recent} points </div>
    </div>
}


export default App;
