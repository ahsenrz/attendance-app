import React from "react";
import AddAttendance from "../addAttendance/addAttendance";
import Quotes from "../quotes/quotes";
import "./main.css";
const AttendaceScreen: React.FC<{}> = () => {
  return (
    <div className="bmdAttendence">
     
      <Quotes />
      <AddAttendance />
    </div>
  );
};

export default AttendaceScreen;
