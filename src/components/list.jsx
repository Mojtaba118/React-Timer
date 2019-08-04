import React from "react";

const List = ({ data, onClear }) => {
  if (data.length === 0)
    return (
      <div className="timerList">
        <p>No Item To Show</p>
      </div>
    );
  let index = 0;
  return (
    <div className="timerList">
      <button className="clearListButton" onClick={onClear}>
        Clear
      </button>
      {data.map(item => (
        <p className="timerValue" key={index++}>
          {item}
        </p>
      ))}
    </div>
  );
};

export default List;
