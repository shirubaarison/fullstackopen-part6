import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
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
    }
  }
})

export const addAnecdoteNotification = (obj) => async (dispatch) => {
  dispatch(addAnecdote(obj))
  dispatch(setNotification(`Anecdote "${obj.content}" has been added`))

  setTimeout(() => {
    dispatch(setNotification(``));
  }, 5000);
}

export const voteOnAnecdote = (id) => async (dispatch, getState) => {
  dispatch(anecdoteVote(id))
  const anecdote = getState().anecdotes.find(a => a.id === id)
  if (anecdote) {
    dispatch(setNotification(`You voted on "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(setNotification(``));
    }, 5000);
  }
}

export const getAnecdotes = state => state.anecdotes

export const { addAnecdote, anecdoteVote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer