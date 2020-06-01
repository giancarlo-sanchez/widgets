import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        }
    }

    tick = () => {
        this.setState({ time: new Date() });
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }



    render() {

        let hours = this.state.time.getHours();
        let minutes = this.state.time.getMinutes();
        let seconds = this.state.time.getSeconds();

        hours = (hours < 10)? `0${hours}`: hours;
        minutes = (minutes < 10)? `0${minutes}`: minutes;
        seconds = (seconds < 10)? `0${seconds}`: seconds;
        return (
            <>
                <h1>Clock</h1>
                <div className="clock-widget">
                    <div className="time-container">
                        <h1>Time</h1>
                        <div>{hours} : {minutes} : {seconds} </div>
                    </div>
                    <div className="date-container">
                        <h1>Date</h1>
                        <div>{new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(this.state.time)} {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(this.state.time)} {this.state.time.getDate()} {this.state.time.getFullYear()}</div>
                    </div>
                </div>
            </>
        );
    }
}

export default Clock;
