/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        case 'CLEAR_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    const doNotification = (text, time) => {
        notificationDispatch({
            type: 'SET_NOTIFICATION',
            payload: text
        })

        setTimeout(() => {
            notificationDispatch({
                type: 'CLEAR_NOTIFICATION',
            })
        }, time * 1000)
    }

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch, doNotification]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext