import React from 'react';
import './stopwatch.css';

const Header = () => {
  return (
    <h1>Timer</h1>
  );
}

const Instructions = (props) => {
  return (
    <p id="instructions">{props.instructions}</p>
  );
}

const Timer = (props) => {
  return (
    <div>
      <span className="time">{props.min}</span>
      <span>:</span>
      <span>{props.sec}</span>
    </div>
  );
}

const TimeInput = (props) => {
  return (
    <div id="timerInput">
      <input type="number" min="1" max="99" disabled={props.enable} value={props.value} onChange={props.handleChange}/>
      <span>:</span>
      <span>{props.sec}</span>
    </div>
  );
}

const Button = (props) => {
  return (
    <button disabled={props.enable} onClick={props.handleButton}>{props.buttonText}</button>
  );
}

const Reset = (props) => {
  return (
    <button id="reset" onClick={props.handleReset}>reset</button>
  );
}

// Container Components

class TimerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      instructions: "",
      min: "",
      sec: "00",
      timeInputValue: 10,
      disableTimeInput: false,
      playerTime: "",
      buttonText: "start",
      mountTimer: false,
      isRunning: false,
      mountReset: false,
    };
    this.url = "https://onlineclock.net/audio/options/default.mp3";
    this.audio = new Audio(this.url);
  }
  
  handleTimeInput = (event) => {
    this.setState({
      timeInputValue: event.target.value
    });
  }
  
  handleButton = (event) => {
    if (!this.state.isRunning && (this.state.buttonText === "start")) {
      const playerTime = (this.state.timeInputValue * 60);
      this.setState({
        instructions: "You can pause or reset the timer at any time.",
        disableTimeInput: true,
        playerTime: playerTime,
        buttonText: "pause",
        mountTimer: true,
        isRunning: true,
        mountReset: true,
      });
      if (this.state.timeInputValue < 10) {
        this.setState({
          min: "0" + this.state.timeInputValue
        });
      } else {
        this.setState({
          min: this.state.timeInputValue
        });
      }
      this.runTimer();
    } else if (this.state.isRunning && (this.state.buttonText === "pause")) {
      this.stopTimer();
      this.setState({
        instructions: "The timer has been paused, press resume to continue.",
        isRunning: false,
        buttonText: "resume"
      });
    } else if (!this.state.isRunning && (this.state.buttonText === "resume")) {
      this.runTimer();
      this.setState({
        instructions: "You can pause or reset the timer at any time.",
        isRunning: true,
        buttonText: "pause"
      });
    } else if (this.state.isRunning && (this.state.buttonText === "new timer")) {
      this.audio.pause();
      this.setState({
        instructions: "Set the timer below and press start to begin.",
        isRunning: false,
        buttonText: "start",
        disableTimeInput: false,
        mountTimer: false,
        sec: "00"
      });
    }
  }
  
  handleReset = () => {
    window.clearInterval(this.interval);
    this.setState({
      instructions: "Set the timer below and press start to begin.",
      min: "",
      sec: "00",
      timeInputValue: 10,
      disableTimeInput: false,
      playerTime: "",
      buttonText: "start",
      mountTimer: false,
      isRunning: false,
      mountReset: false,
    });
  }

  runTimer = () => {
    this.interval = setInterval( () => {
      this.setState({
        playerTime: this.state.playerTime -=1
      });
      let startTime = this.state.playerTime / 60;
      let m = Math.floor(startTime);
      let min;
      if (m < 10) {
        min = "0" + m;
      } else {
        min = m;
      }
      let s = Math.round((startTime - m) * 60);
      let sec;
      if (s < 10) {
        sec = "0" + s;
      } else {
        sec = s;
      }
      if (this.state.playerTime < 1) {
        this.audio.loop = true;
        this.audio.play();
        window.clearInterval(this.interval);
        this.setState({
          instructions: "Time's up! Don't forget to turn off the oven!",
          buttonText: "new timer",
          mountReset: false
        });
      }
      this.setState({
        min: min,
        sec: sec,
        isRunning: true
      });
    }, 1000);
  }
  
  stopTimer = () => {
    window.clearInterval(this.interval);
  }
  
  render() {
    let timer;
    if (this.state.mountTimer) {
      timer = <Timer min={this.state.min} sec={this.state.sec} />;
    } else {
      timer = "";
    }
    let timerInput;
    if (!this.state.disableTimeInput) {
        timerInput = <TimeInput value={this.state.timeInputValue} handleChange={this.handleTimeInput} sec={this.state.sec} />;
    } else {
      timerInput = "";
    }
    let disableButton;
    if (this.state.timeInputValue > 0) {
      disableButton = false;
    } else {
      disableButton = true;
    }
    let reset;
    if (this.state.mountReset) {
      reset = <Reset handleReset={this.handleReset} />;
    } else {
      reset = "";
    }
    return (
      <div id="timerBody">
        <Header />
        <Instructions instructions={this.state.instructions}/>
        {timer}
        {timerInput}
        <div id="buttonContainer">
          <Button buttonText={this.state.buttonText} handleButton={this.handleButton} enable={disableButton} />
          {reset}
        </div>
      </div>
    );
  }
}

export default TimerContainer;