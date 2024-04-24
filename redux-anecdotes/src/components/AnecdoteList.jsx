import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote, getAnecdotes } from '../reducers/anecdoteReducer'
import { getFilter } from '../reducers/filterReducer'
import PropTypes from 'prop-types'

const Anecdote = ({ anecdote, vote }) => {
    return(
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const filter = useSelector(getFilter)
    const allAnecdotes = useSelector(getAnecdotes)

    const anecdotes = allAnecdotes.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteOnAnecdote(id))
    }
    
    return (
        <>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
           <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
        )}
        </>
    )
}

Anecdote.propTypes = {
    anecdote: PropTypes.object.isRequired,
    vote: PropTypes.func.isRequired
}

export default AnecdoteList