/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { API_OPTIONS } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { addUpcomingMovies } from '../../utils/Redux/movieSlice';

const useUpcoming = () => {
    const dispatch = useDispatch();

    const getData = async()=>{
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS)
        const data = await response.json();
        dispatch(addUpcomingMovies(data.results));   
    }

    useEffect(()=>{
        getData();
    }, [])
}

export default useUpcoming
