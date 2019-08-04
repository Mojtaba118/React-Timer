import React, { Component } from "react";
class TimerSection extends Component {
  render() {
    const {
      title,
      name,
      min,
      max,
      value,
      onIncrement,
      onDecrement
    } = this.props;
    return (
      <div className="timerSection">
        <p className="timerTitle">{title}</p>
        <p className="timerValue">{value}</p>
        <div className="timerButtons">
          <button
            className="timerDecrement"
            onClick={() => onDecrement(value, name, min, max)}
          >
            -
          </button>
          <button
            className="timerIncrement"
            onClick={() => onIncrement(value, name, min, max)}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

export default TimerSection;
