import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote, getAnecdotes } from '../reducers/anecdoteReducer'
import { getFilter } from '../reducers/filterReducer'

const AnecdoteList = () => {
    const filter = useSelector(getFilter)
    const anecs = useSelector(getAnecdotes)
    const anecdotes = anecs.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))

    const dispatch = useDispatch()

    const vote = (id) => {
        // console.log('vote', id)
        dispatch(voteOnAnecdote(id))
    }
    
    return (
        <>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
            )}
        </>
    )
}

export default AnecdoteList