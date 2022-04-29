import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import axios from 'axios'
import { auth } from '../../firebase'
import { StateType } from '../../interfaces/storeStateTypes/storeStateTypes'

// require('dotenv').config()

axios.defaults.headers.common = {
  'Content-Type': 'application/json',
}

const loginAPI = process.env.REACT_APP_LOGIN_API

const initialState: StateType = {
  userName: null,
  email: null,
  loading: false,
  error: false,
  errorMessage: '',
  isLoggedIn: false,
  attendanceData: null,
}

type Data = {
  email: string
  password: string
}

export const signIn = createAsyncThunk(
  'SignIn',
  async (data: Data, thunkAPI) => {
    try {
      const result: UserCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )

      const user: string = result.user.email as string
      localStorage.setItem('user', user)
      const endpoint = loginAPI
      if (result) {
        const api = await axios.post(endpoint, {
          email: result.user.email,
          id: result.user.uid,
        })
        const accessToken = api.data.accessToken
        localStorage.setItem('accessToken', accessToken)
        localStorage.getItem('accessToken')
      }
      return result
    } catch (err) {
      console.log(err)
      throw new Error('Error')
    }
  },
)

const authSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [signIn.fulfilled.toString()]: (
      state: StateType,
      { payload }: PayloadAction<UserCredential>,
    ) => {
      state.email = payload?.user?.email
      state.userName = payload?.user?.displayName
      state.loading = false
      state.isLoggedIn = true
      state.error = false
    },

    [signIn.pending.toString()]: (
      state: StateType,
      { payload }: PayloadAction<UserCredential>,
    ) => {
      state.loading = true
      state.isLoggedIn = false
    },

    [signIn.rejected.toString()]: (
      state: StateType,
      { payload }: PayloadAction<any>,
    ) => {
      state.loading = false
      state.error = true
      state.errorMessage = 'Invalid Authentication'
      state.isLoggedIn = false
    },
  },
})

export const firebaseAuth = authSlice.reducer
