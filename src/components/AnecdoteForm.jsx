import { useDispatch } from 'react-redux'
import { addAnecdoteNotification } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnec = async (event) => {
        event.preventDefault()
        const content = event.target.anectodetxt.value
        event.target.anectodetxt.value = ''
        
        const newAnecdote = await anecdoteService.createAnecdote(content)

        dispatch(addAnecdoteNotification(newAnecdote))
    }
    
    return (
        <>
        <h2>create new</h2>
        <form onSubmit={addAnec}>
            <div>
            <input type='text' name='anectodetxt'/>
            </div>
            <button type='submit'>create</button>
        </form>
      </>
    )
}

export default AnecdoteForm