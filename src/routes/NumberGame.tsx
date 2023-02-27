import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import Board from "./Board";
import Timer from "./Timer";
import {motion, AnimatePresence} from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";

const Overlay = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw; // 수정 필요
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 50vw;
  max-width: 50vw;
  min-width: 50vw;
  min-height: 60vh;
  max-height: 60vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: white;
  border: 2px solid white;
  overflow: hidden;
`;


const shuffleArray= (array:number[]) =>{
    for(let i=array.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        [array[i], array[j]]=[array[j], array[i]];
    }
    return array;
};

const Container = styled.div`
    width:50vw;
    height:80vh;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
`;

const StartButton=styled.button`
    margin-top:30px;
    width:100px;
    height:50px;
`;


let array :number[] = [];
for (let i=1;i<=25;i++){
    array.push(i);
};

function NumberGame(){
    const navigate = useNavigate();
    const [numbers,setNumbers]=useState(array);
    const [gameFlag, setGameFlag]=useState(false);
    const [current, setCurrent]=useState(1);
    const modalMatch = useMatch("/Menu/gamechoice/numberGame");
    const handleClick = (num : number) => {
        if(num==current && gameFlag){
            if(num==50){
                endGame();
            }
            const index=numbers.indexOf(num);
            setNumbers(numbers=>[
                ...numbers.slice(0,index),
                (num<26) ? num + 25 : 0,
                ...numbers.slice(index+1)
            ]);
            setCurrent(current=>current+1);
        }
        console.log(num);
    };
    const startGame=()=>{
        setNumbers(shuffleArray(array));
        setCurrent(1);
        setGameFlag(true);
    };

    const endGame=()=>{
        setGameFlag(false);
    };

    const useScroll = () => {
        const [state, setState] = useState({
          x: 0, // x와 y의 초기값을 0으로 지정
          y: 450,
        });
        const onScroll = () => {
          setState({ x: window.scrollX, y: window.scrollY });
        };
        useEffect(() => {
          window.addEventListener("scroll", onScroll); // scorll할 때 onScroll 이벤트 핸들러 지정
          return () => window.removeEventListener("scroll", onScroll); // clean up
        }, []);
        return state;
      };
      const {y} = useScroll();

    const onOverlayClick = () => navigate(-1);

    return (
        <AnimatePresence>
            {modalMatch ? 
            <>
            <Overlay
            onClick={onOverlayClick}
            exit={{opacity: 0}}
            animate={{opacity:1}}
            />
            <BigMovie
            style={{ top: y + 10 }}
            layoutId={modalMatch.params as any}
            >
            <Container>
            <Board numbers={numbers} handleClick={handleClick}></Board>
            {gameFlag ? 
            (
                <Timer />
            )
            :
            (
                <StartButton onClick={startGame}>시작하기</StartButton>
            )}
            </Container>
        </BigMovie>
            </> : null}
        </AnimatePresence>
    );
}

export default NumberGame;