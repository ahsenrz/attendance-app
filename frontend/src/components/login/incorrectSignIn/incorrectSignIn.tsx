import React from "react";
import { Toast } from "react-bootstrap";

const toast = () => {
  return (
    <div>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Attendance App</strong>
        </Toast.Header>
        <Toast.Body>Authentication Error</Toast.Body>
      </Toast>
    </div>
  );
};

export default toast;

