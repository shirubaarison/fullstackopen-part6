import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
    })
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