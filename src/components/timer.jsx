import React, { Component } from "react";
import TimerSection from "./timerSection";
import List from "./list";

class Timer extends Component {
  state = {
    timerData: {
      second: 0,
      minute: 1,
      hour: 0
    },
    timerList: []
  };
  timer = null;
  handleIncrement = (value, name, min, max) => {
    const timerData = { ...this.state.timerData };
    value++;
    timerData[name] = value;
    if (value <= max && value >= min) this.setState({ timerData });
  };

  handleDecrement = (value, name, min, max) => {
    const timerData = { ...this.state.timerData };
    value--;
    timerData[name] = value;
    if (value <= max && value >= min) this.setState({ timerData });
  };

  handleStart = () => {
    let startTimer = document.querySelector("#startTimer");
    let stopTimer = document.querySelector("#stopTimer");
    startTimer.classList.replace("timerShow", "timerHide");
    stopTimer.classList.replace("timerHide", "timerShow");

    this.timer = setInterval(() => {
      const timerData = { ...this.state.timerData };
      if (
        timerData.hour == 0 &&
        timerData.minute == 0 &&
        timerData.second == 0
      ) {
        clearInterval(this.timer);
        startTimer.classList.replace("timerHide", "timerShow");
        stopTimer.classList.replace("timerShow", "timerHide");
        return;
      }

      if (timerData.second != -1) timerData.second--;

      if (timerData.second == -1) {
        if (timerData.minute != 0) {
          timerData.minute--;
          timerData.second = 59;
        }
      }

      if (timerData.second == -1 && timerData.minute == 0) {
        if (timerData.hour != 0) {
          timerData.hour--;
          timerData.minute = 59;
          timerData.second = 59;
        }
      }
      this.setState({ timerData });
    }, 1000);
  };

  handleStop = () => {
    let startTimer = document.querySelector("#startTimer");
    let stopTimer = document.querySelector("#stopTimer");
    startTimer.classList.replace("timerHide", "timerShow");
    stopTimer.classList.replace("timerShow", "timerHide");

    clearInterval(this.timer);
  };

  handleCapture = () => {
    console.log(this.state.timerList);
    const { hour, minute, second } = this.state.timerData;
    const timerList = [...this.state.timerList];
    timerList.push(`${hour}:${minute}:${second}`);
    this.setState({ timerList });
  };

  handleClear = () => {
    this.setState({ timerList: [] });
  };

  render() {
    const { hour, minute, second } = this.state.timerData;
    return (
      <React.Fragment>
        <List data={this.state.timerList} onClear={this.handleClear} />
        <div className="timerShow" id="startTimer">
          <div className="timerContainer">
            <TimerSection
              title="Hour"
              min="0"
              max="23"
              name="hour"
              value={hour}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
            />
            :
            <TimerSection
              title="Minute"
              min="0"
              max="59"
              name="minute"
              value={minute}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
            />
            :
            <TimerSection
              title="Second"
              min="0"
              max="59"
              name="second"
              value={second}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
            />
          </div>
          <button className="startButton" onClick={this.handleStart}>
            Start
          </button>
        </div>
        <div className="timerHide" id="stopTimer">
          <div className="timerContainer">
            <p className="timerValue">
              {hour}:{minute}:{second}
            </p>
          </div>
          <button className="stopButton" onClick={this.handleStop}>
            Stop
          </button>
          <button className="captureButton" onClick={this.handleCapture}>
            Capture
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Timer;
