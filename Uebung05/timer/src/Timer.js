import React, {Component} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

class Timer extends Component {
    constructor(props) {
        super(props);
        
        this.countdown = 0;
        this.state = {time: "Sekunden eingeben.", render: true};

        this.click = this.click.bind(this);
        this.updateTime = this.updateTime.bind(this);

        this.changeTime = this.changeTime.bind(this);
    }

    click(event) {
        this.setState({render: false})
        this.setState({time: this.countdown});
        clearInterval(this.interval);
        this.interval = setInterval(this.updateTime, 1000);
    }

    updateTime() {
        if (this.state.time == 1) {
            this.setState({time: "FERTIG"});
            clearInterval(this.interval);
            this.setState({render: true})
        }
        else if (this.state.time > 1) {
            this.setState({time: this.state.time - 1});
        }
        else {
            this.setState({time: "Der Wert muss mindestens 1 betragen."});
            clearInterval(this.interval);
            this.setState({render: true})
        };
    }

    changeTime(event) {
        this.countdown = event.target.value;
    }

    render() {
        return(<>
            <AppBar position="sticky" color="secondary">
                <Toolbar>
                    <Typography variant="h3">Counter</Typography>
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid style={{margin: 30, fontSize: 40}}>
                    {this.state.time}
                </Grid>
            </Grid>
            <Button size="large" variant="contained" color="secondary" onClick={this.click}>Start</Button>
            {this.state.render &&
            <Grid container>
                <Grid style={{margin: 20}}>
                    <TextField onChange={this.changeTime}
                    label="Eingabe in Sekunden"
                    variant="outlined"
                    inputProps={{type: "number"}}/>
                </Grid>
            </Grid>
            }
        </>)
    }
}

export default Timer;