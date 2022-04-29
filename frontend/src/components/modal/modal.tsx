import React from "react";
import { Modal, Box,  } from "@mui/material";
import "./style.css";
import { createAttendance } from "../../redux/Attendance/attendanceSlice";
import { useAppDispatch } from "../../redux/store";



const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
  display: "flex",
  justifyContent: "space-between",
};

type ConfirmModalProps = {
    isModalVisible: boolean;
    setIsModalVisible: any;
    readStatus: string;
    setShowToast : any;
    setButtonDisabled : any
    setShowSpinner : any
  };

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  readStatus,
  setButtonDisabled,
  setShowToast,
  setShowSpinner
}) => {
    const dispatch = useAppDispatch()

    const username = localStorage.getItem("user");
    const date = new Date().toDateString();

    const handleSubmit = async (status: string) => {
        setShowSpinner(true)

        dispatch(
          createAttendance({
            username,
            status: status,
            date: date,
          })
        ).then((res: any) => {
          if (res.type === "Create_Attendance/fulfilled") {
            setShowToast(true);
            setButtonDisabled(true);
            setShowSpinner(false)
          }

        }).catch((err) => console.log("err" , err));
        console.log("status" , status)
      };

  return (
    <div>
      <Modal open={isModalVisible}>
        <Box sx={style}>
          <button
            className="button1"
            onClick={() => {
              setIsModalVisible(false);
              handleSubmit(readStatus)
            }}
          >
            Mark Attendance
          </button>
          <button className="button2" onClick={() => setIsModalVisible(false)}>
            Cancel
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
