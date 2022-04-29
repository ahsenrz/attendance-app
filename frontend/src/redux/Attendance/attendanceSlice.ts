import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { StateType } from '../../interfaces/storeStateTypes/storeStateTypes'

require('dotenv').config()

const axiosJWT = axios.create()
axios.defaults.headers.common = {
  'Content-Type': 'application/json',
}

const getAttendanceAPI = process.env.REACT_APP_GET_ATTENDANCE_API
const createAttendanceAPI = process.env.REACT_APP_CREATE_ATTENDANCE_API

const initialState: StateType = {
  userName: null,
  email: null,
  loading: false,
  error: false,
  errorMessage: '',
  isLoggedIn: false,
  attendanceData: null,
}



type GetAttendanceData = {
  username : string
}

export const getAttendance = createAsyncThunk(
  'Get_Attendance',
  async (data: GetAttendanceData, thunkAPI) => {
    const accessToken = localStorage.getItem('accessToken')
    try {
      const endpoint = getAttendanceAPI
      const api = await axiosJWT.post(
        endpoint,
        {
          username: data.username,
        },
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      )
      const finalData = await api.data

      return {
        attendanceData: finalData,
      }
    } catch (err) {
      console.log('err', err)
    }
  },
)

type createAttendanceData = {
  username: string | null
  status: string
  date: any
}
export const createAttendance = createAsyncThunk(
  'Create_Attendance',
  async (data: createAttendanceData, thunkAPI) => {
    const accessToken = localStorage.getItem('accessToken')
    const endpoint = createAttendanceAPI
    try {
      await axiosJWT.post(
        endpoint,
        {
          username: data.username,
          status: data.status,
          date: data.date,
        },
        {
          headers: {
            authorization: 'Bearer ' + accessToken,
          },
        },
      )
    } catch (err) {
      console.log('err', err)
    }
  },
)

const authSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [getAttendance.fulfilled.toString()]: (
      state: StateType,
      { payload }: PayloadAction<any>,
    ) => {
      state.loading = false
      state.attendanceData = payload.attendanceData
    },
    [getAttendance.pending.toString()]: (
      state: StateType,
      { payload }: PayloadAction<any>,
    ) => {
      state.loading = true
    },
  },
})

export const firebaseAuth = authSlice.reducer
