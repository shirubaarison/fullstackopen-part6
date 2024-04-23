import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationMessage(state, action) {
            return action.payload
        }
    }
})

export const { setNotificationMessage } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(setNotificationMessage(content))
        setTimeout(() => {
        dispatch(setNotificationMessage(''))
        }, time * 1000)
    }
}

export default notificationSlice.reducer