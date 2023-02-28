import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IAtomMovie, IGetMoives, IMovieAnswer, movieAnswer, movieObj } from "./atom";
import MovieMain from "./MovieMain";
import MovieSeat from "./MovieSeat";
import MovieWhen from "./MovieWhen";

const Overlay = styled(motion.div)`
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 50vw;
  height: 100vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #343333;
  color: white;
  border: 2px solid white;
  overflow: hidden;
`;

const SmallMovie = styled(motion.div)`
    position: absolute;
    width: 20vw;
    height: 40vh;
    right: 0;
    background-color: #343333;
    color: white;
    border: 2px solid white;
    overflow: hidden;
    margin-right: 20px;
`;

const times = ["11:40", "14:05", "16:35"];

function Movie() {
    const navigate = useNavigate();
    const [movie, setMovie] = useState<IGetMoives>();
    const onOverlayClick = () => navigate("/Menu/home/hard");
    const modalMatch = useMatch("/Menu/home/hard/cgv/*");
    const modalMatch2 = useMatch("/Menu/home/hard/cgv");
    const [answerRecoil, setAnswerRecoil] = useRecoilState<IMovieAnswer>(movieAnswer);
    const [name, setName] = useState("");

    const getMovies = async () => {
        const json = await (
          await fetch(
              `https://api.themoviedb.org/3/movie/now_playing?api_key=1e1dd98e7bbdb858a49359dbec86444f`
          )
        ).json();
        console.log(json);
        setMovie(json);
        const number :number = Math.floor(Math.random()*3);
        setName(json?.results[number].title);        
        setAnswerRecoil(
            {
                title: name,
                time: times[number],
                seat: number+1,
                num: number,
            }
        );
      };
    const setAnswer = () => {
        const number = Math.floor(Math.random()*3);
    };

      useEffect(() => {
        getMovies();
      }, [name]);

    return (
        <AnimatePresence>
            {modalMatch ? 
                <>
                    <Overlay 
                    onClick={onOverlayClick}
                    exit={{opacity: 0}}
                    animate={{opacity:1}}/>
                    <div style={{display:"flex"}}>
                        <BigMovie 
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition:{
                            duration: 0.5,
                            delay: 0.2,
                        }}}
                        exit={{opacity: 0}}
                        style={{ top: 200 }}
                        >
                            {modalMatch2 ? <MovieMain/> : <Outlet/>}
                        </BigMovie>
                        <SmallMovie
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition:{
                            duration: 0.5,
                            delay: 0.2,
                        }}}
                        exit={{opacity: 0}}
                        style={{ top: 200 }}
                        >
                            <h1>이렇게 담아주세요!</h1>
                            <hr/>
                            <p><h2>영화 : </h2>{answerRecoil.title}<br/>
                            <h2>시간대 : </h2>{answerRecoil.time}<br/>
                            <h2>좌석 수 : </h2>{answerRecoil.seat}자리</p>

                        </SmallMovie>
                    </div>
                </> : <div></div>}
        </AnimatePresence>
    );
}

export default Movie;