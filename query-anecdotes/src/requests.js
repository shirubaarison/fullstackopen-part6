import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    
    return response.data
}

export const createAnecdote = async (obj) => {
    const response = await axios.post(baseUrl, obj)

    return response.data
}

export const addVote = async (updatedAnecdote) => {
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)

    return response.data
}