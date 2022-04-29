import React, { useEffect } from 'react'
import { useAppDispatch } from '../../redux/store'
import { Alert, Snackbar, CircularProgress } from '@mui/material'
import './style.css'
import present from '../../assets/images/present.png'
import absent from '../../assets/images/absent.png'
import leave from '../../assets/images/leave.png'
import ConfirmModal from '../modal/modal'
import {
  createAttendance,
  getAttendance,
} from '../../redux/Attendance/attendanceSlice'

const AddAttendance = () => {
  const dispatch = useAppDispatch()

  const [showToast, setShowToast] = React.useState<boolean>(false)
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = React.useState<any>(false)
  const [readStatus, setReadStatus] = React.useState<string>('')
  const [showSpinner, setShowSpinner] = React.useState<boolean>(false)

  const username = localStorage.getItem('user')
  const date = new Date().toDateString()
  const useEffectMount = 1
  const now = new Date()
  var eta_ms =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      21,
      0,
      0,
      0,
    ).getTime() - Date.now()

  useEffect(() => {
    dispatch(getAttendance({ username })).then((res: any) => {
      const result = JSON.parse(JSON.stringify(res.payload.attendanceData))
      const lastResult = result.pop()
      if (lastResult) {
        const lastAttendanceDate = lastResult.date
        if (result && lastAttendanceDate === date) {
          setButtonDisabled(true)
        }
      }
    })

    setTimeout(function () {
      setAbsentIfNoAttendance()
    }, eta_ms)
  }, [useEffectMount])

  const setAbsentIfNoAttendance = () => {
    dispatch(getAttendance({ username })).then((res: any) => {
      const result = JSON.parse(JSON.stringify(res.payload.attendanceData))
      const lastResult = result.pop()
      if (lastResult) {
        const lastAttendanceDate = lastResult.date
        if (result && lastAttendanceDate !== date) {
          dispatch(
            createAttendance({
              username: username,
              status: 'Absent',
              date: date,
            }),
          ).then((res) => {
            if (res.type === 'Create_Attendance/fulfilled') {
              setButtonDisabled(true)
            }
          })
        }
      }
    })
  }

  setTimeout(() => {
    setShowToast(false)
  }, 6000)

  return (
    <div>
      {showToast ? (
        <div>
          <Snackbar
            style={{ width: '96%' }}
            open={showToast}
            autoHideDuration={3000}
          >
            <Alert style={{ margin: '0px auto' }} severity="success">
              Attendance Marked
            </Alert>
          </Snackbar>
        </div>
      ) : null}

      {isModalVisible ? (
        <ConfirmModal
          readStatus={readStatus}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          setShowToast={setShowToast}
          setButtonDisabled={setButtonDisabled}
          setShowSpinner={setShowSpinner}
        />
      ) : null}

      {showSpinner ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            textAlign: 'center',
            position: 'absolute',
          }}
        >
          {' '}
          <CircularProgress size={80} color="secondary" />{' '}
        </div>
      ) : null}

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-4 mt-5 col-md-6">
            <div className="text-center">
              <button
                disabled={buttonDisabled}
                className="btn attendenceBtn "
                onClick={() => {
                  setIsModalVisible(true)
                  setReadStatus('Leave')
                }}
              >
                <img src={leave} alt="" />
              </button>
            </div>
          </div>
          <div className="col-lg-4  mt-5  col-md-6">
            <div className="text-center">
              <button
                disabled={buttonDisabled}
                className="btn attendenceBtn"
                onClick={() => {
                  setIsModalVisible(true)
                  setReadStatus('Present')
                }}
              >
                <img src={present} className="attendenceImg" alt="" />
              </button>
            </div>
          </div>
          <div className="col-lg-4 mt-5 col-md-6">
            <div className="text-center">
              {' '}
              <button
                disabled={buttonDisabled}
                className="btn attendenceBtn"
                onClick={() => {
                  setIsModalVisible(true)
                  setReadStatus('Absent')
                }}
              >
                <img src={absent} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAttendance
