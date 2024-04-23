import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    anecdoteVote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes++
      }
      state.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { anecdoteVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export const getAnecdotes = state => state.anecdotes

export const voteOnAnecdote = (id) => async (dispatch, getState) => {
  dispatch(anecdoteVote(id))
  const anecdote = getState().anecdotes.find(a => a.id === id)
  if (anecdote) {
    dispatch(setNotification(`You voted on "${anecdote.content}"`, 5))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnec = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnec))
    dispatch(setNotification(`Anecdote "${content}" has been added`, 5))
  }
}

export default anecdoteSlice.reducer