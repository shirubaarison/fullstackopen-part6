import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            return action.payload
        }
    }
})

export const getFilter = state => state.filter

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer