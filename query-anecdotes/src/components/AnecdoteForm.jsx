import { useMutation } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch } from "../notificationUtils"

const AnecdoteForm = () => {
  const queryClient =  useQueryClient() 
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch(`anecdote "${newAnecdote.content}" has been added`, 5)},
    onError: (obj) => {
      dispatch(obj.response.data.error, 5)
    }
   })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
