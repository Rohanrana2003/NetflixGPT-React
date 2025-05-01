import { createSlice } from "@reduxjs/toolkit";

 const gptSlice = createSlice({
    name:'gpt',
 
    initialState:{
        showGPT:false,
        gptMovieNames:null,
        gptMovieDetails:null
    },

    reducers:{
        toggleShowGPT:(state) =>{
            state.showGPT = !state.showGPT;
        },
        addGptMovies:(state, action)=>{
            const {movieNames, movieDetails} = action.payload;
            state.gptMovieNames = movieNames;
            state.gptMovieDetails = movieDetails;
        },
         removeGptMovies:(state)=>{
            state.gptMovieNames = null;
            state.gptMovieDetails = null;
         }
    }
 })


 export const{toggleShowGPT, addGptMovies, removeGptMovies} = gptSlice.actions;
 export default gptSlice.reducer;