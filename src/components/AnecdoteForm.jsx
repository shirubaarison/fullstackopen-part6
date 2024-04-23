import { useDispatch } from 'react-redux'
import { addAnecdoteNotification } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnec = (event) => {
        event.preventDefault()
        const content = event.target.anectodetxt.value
        event.target.anectodetxt.value = ''
    
        dispatch(addAnecdoteNotification(content))
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