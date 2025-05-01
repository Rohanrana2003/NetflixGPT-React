/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../../utils/Redux/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../../utils/Constants/constants";

const useNowPlayingMovies = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies?.nowPlayingMovies
  );

  const dispatch = useDispatch();

  const getData = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const response = await data.json();
    dispatch(addNowPlayingMovies(response.results));
  };

  useEffect(() => {
    !nowPlayingMovies && getData();
  }, []);
};

export default useNowPlayingMovies;
