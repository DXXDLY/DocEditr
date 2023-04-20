import { configureStore } from "@reduxjs/toolkit";
import databaseReducer from './firebase'
const store = configureStore({
    reducer: {
        database: databaseReducer
    }
})

export default store