import React, { Component } from 'react';

class TimeWidget extends Component{
    constructor(props) {
        super(props);
        this.state = {
            curTime : null
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
            curTime : new Date().toLocaleTimeString()
            })
        }, 1000);
    }

    render(){
        return(
            <div className={"time-widget"}>{this.state.curTime}</div>
        );
    }
}
export default TimeWidget;