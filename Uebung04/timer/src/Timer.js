import React, {Component} from "react";

class Timer extends Component {
    constructor(props) {
        super(props);
    
        this.countDown = this.countDown.bind(this);
        this.state = {
            count: this.props.countdown,
            message: ''
        };
    }

    countDown() {
        setInterval(() => {
          if (this.state.count <= 1) {
            clearInterval(this);
            this.setState(() => {
              return {message: "FERTIG!"}
            }) 
          } else {
            this.setState((prevState) => {
              return {count: prevState.count - 1}
            }) 
          }
        }, 1000)
    } 

    

    render() {
        return (<>
            <h3>Timer</h3>
            <form action="#">
                <div>
                    <h1 onLoad={this.countDown}>
                    {this.state.message ? this.state.message : this.state.count}
                    </h1>
                </div>
                <div>
                    <button onClick={this.countDown}>Go!</button>
                </div>
            </form>
        </>)
    }
}

export default Timer;