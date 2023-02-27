import { AnimatePresence, motion, useScroll} from "framer-motion";
import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {balloon} from "../game";
import pang from "../image/pang.png";
import X from "../image/X.png";
import Game2_result from "./Game2_result";
import Timer from "./Timer";
import regame from "../image/regame.png";
import door from "../image/door.png";


interface IBallon {
  img: string;
  name: string;    
}

const Progress = styled.div`
  width: 30em;
  height: 1.5em;
  background-color: white;
  margin-top: 2em;
  @media screen and (max-width:700px){
    width: 20em;
  }
`;


const MiniBox = styled.div`
    display:flex;
    flex-direction: column;
    color: black;
`;

const Button = styled.div`
    background-image: url(${door});
    background-color: #3da8a5;
    background-size: cover;
    width: 8em;
    height: 8em;
    cursor: pointer;
    &:hover{
        opacity:2;
    }
`;

const Button2 = styled.div`
    background-image: url(${regame});
    background-color: #3da8a5;
    background-size: cover;
    width: 8em;
    height: 8em;
    cursor: pointer;
`;

const Dealt = styled.div<{ dealt :number }>`
  background-color: #f43b3b;
  width: ${(props) => props.dealt + "%"};
  height: 100%;
`;

const MainContainer = styled(motion.div)`
  display:flex;
  justify-content: center;
  flex-direction:column;
  align-items: center;
`;

const reload = () => {

};

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: repeat(4,1fr);
    margin: 30px 0px 20px 20px;
    height: 100%;
    width: 80%;
    @media screen and (max-width: 700px){
      width:100%;
    }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%; // 수정 필요
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Box = styled(motion.div)<{bgPhoto: string}>`
    background-image: url(${(props)=>props.bgPhoto});
    background-size: cover;
    height: 6rem;
    width: 70%;
    font-size: 30px;
    background-size:cover;
    cursor: pointer;
    background-position: center center;
    margin: 0.5rem;
    @media screen and (max-width: 700px){
      width:70%;
      height:10vh;
      margin:5px;
    }
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 95vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: white;
  border: 2px solid white;
  overflow: hidden;
  background-color: #2BB7B3;
  @media screen and (max-width: 700px){
    width: 80vw;
  }
`;

const ResultMovie = styled(motion.div)`
  position: absolute;
  width: 20vw;
  height: 40vh;
  top: 30%;
  left: 40%;
  margin: 0 auto;
  background-color: white;
  border: 2px solid white;
  overflow: hidden;
  background-color: #2BB7B3;
  @media screen and (max-width: 700px){
    width: 70vw;
    left:10%;
  }
`;

interface Iscroll {
    x: number;
    y: number;
}

const ballColor = {
    color: ["노란색","빨간색","초록색","파란색"],
};

const countVariable = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
  },
  exit: {
    scale: 0,
  },
};


function Game2() {

  const randColor = () => {
    if(selColor.length === 1) return;
    let colorIndex = Math.floor(Math.random()*ballColor.color.length);
    let colorIndex2 = Math.floor(Math.random()*ballColor.color.length);
    setColor([ballColor.color[colorIndex],ballColor.color[colorIndex2]]);
    return [ballColor.color[colorIndex],ballColor.color[colorIndex2]];
    };  
    const navigate = useNavigate();
    const modalMatch = useMatch("/Menu/gamechoice/game");
    const onOverlayClick = () => navigate(-1);
    const [selColor, setColor] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [fontColor,setFontColor] = useState<string[]>(["green","red"]);    
    const [realBall, setBall] = useState<IBallon[]>(balloon);
    const [count, setCount] = useState(20);
    const [num, setNum] = useState(0);
    useEffect(() => {
      const sec = 
      setInterval(() => {
        if(count === 0) {
          return;
        };
        setCount(count - 1);
        setNum(Math.floor((count / 20) * 100))
      },1000);
      return () => clearInterval(sec);
    },[count])

    const regameClicked = () => {
      setCount(20);
      setScore(0);
    };

    const changeFontColor = (colorIdx:string[]) => {
      if(selColor.length === 1) return;
      const color = ["yellow","red","green","blue"];
      let index = Math.floor(Math.random()*color.length);
      let index2 = Math.floor(Math.random()*color.length-1);
      setFontColor([color[index],color[index2]]);
      for(let i = 0; i < 2; i++){
      if(colorIdx[i] === "노란색" && index === 0){
        setFontColor([color.slice(1,4).at(index2) as string,...fontColor]);
      }
      else if(colorIdx[i] === "빨간색" && index === 1){
        setFontColor([[...color.slice(0,1), ...color.slice(2,4)].at(index2) as string, ...fontColor]);
      }
      else if(colorIdx[i] === "초록색" && index === 2){ 
        setFontColor([[...color.slice(0,2), ...color.slice(3)].at(index2) as string, ...fontColor]);
      }
      else if(colorIdx[i] === "파란색" && index === 3){
        setFontColor([color.slice(0,3).at(index2) as string,...fontColor]);
      }}
    };

    useEffect(() => {
      setBall(balloon);
      randColor();
      changeFontColor(selColor);
      suffle();
    },[selColor.length === 0]);

    const suffle = () => {
      realBall.sort(() => Math.random() - 0.5);
    };

    const suffleColor = () => {
      
    };

    const useScroll = () => {
        const [state, setState] = useState<Iscroll>({
          x: 0, // x와 y의 초기값을 0으로 지정
          y: 0,
        });
        const onScroll = () => {
          setState({ x: window.scrollX, y: window.scrollY });
        };
        // useEffect(() => {
        //   window.addEventListener("scroll", onScroll); // scorll할 때 onScroll 이벤트 핸들러 지정
        //   return () => window.removeEventListener("scroll", onScroll); // clean up
        // }, []);
        
        return state;
      };
    const {y} = useScroll();

    const changing = (ballName: string, index:number) => {
      const arr = selColor;
      let count = 0;
      let ballCatch = JSON.parse(JSON.stringify(realBall));
      for(let i = 0 ; i < selColor.length; i++){
        if(arr[i] === ballName){
          arr.splice(i,1);
          fontColor.splice(i,1);
          setScore((prev) => prev+1);
          ballCatch[index].img = pang;
          setBall(ballCatch);
        }
        else{
          if(selColor.length === 1){
            ballCatch[index].img = X;
        setBall(ballCatch);
        setScore((prev) => prev - 2);
        count = 0;
          }
          count++;  
        }
      }
      if(count ===2){
        ballCatch[index].img = X;
        setBall(ballCatch);
        setScore((prev) => prev - 2);
        count = 0;
      }
    };

    const init = (img : any) => {
      return img;
    };
    
      return (
    <div>
        <AnimatePresence>
            {modalMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit= {{opacity: 0}}
                  animate={{opacity:1}}
                />
                {count !== 0 ? 
                <BigMovie
                style={{ top: y + 10 }}
                layoutId="movie"
              >
                {/* <Countable
                variants={countVariable}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{type: "spring",duration: 4}}
                >
                  3
                </Countable> */}
                {/* <Timer/> */}
                <MainContainer 
                initial={{opacity: 0}}
                animate={{opacity: 1, transition:{
                    duration: 1,
                    delay: 1,
                }}}
                exit={{opacity: 0}}>
                  <div style={{margin:"0 auto", display:"flex", flexDirection:"column"}}>
                    <h1 style={{margin: "0 auto",color:"white", fontSize:"90px", fontWeight:"800"}}>
                      {score}
                    </h1>
                    <h1 style={{margin: "0 auto", color: "white"}}>
                      score
                    </h1>
                  </div>
                  <div style={{display:"flex", justifyContent:"center",alignItems:"center", marginTop:"2rem", width:"25rem", height:"8rem", backgroundColor:"#3da8a5"}}>{selColor.map((colorIdx,index) => <h1 key={index} style={{margin:"15px",color:fontColor[index]}}>
                    {colorIdx}
                    </h1>)}
                  </div>
                  <Progress>
                    <Dealt dealt={num}/>
                   </Progress>
                  <Row>
                      {realBall.map((ball,index) => <Box
                      onClick={() => changing(ball.name,index)} bgPhoto={init(ball.img)}></Box>)}
                  </Row>
                </MainContainer>  
              </BigMovie>
                :
                <ResultMovie
                 layoutId="movie">
                 <h2>당신의 점수는...</h2>
                 <h4><span style={{fontSize:"2em",color:"red",fontWeight:"800"}}>{score}</span>점 입니다.</h4>
             <div style={{margin:"0 auto" ,display:"flex", justifyContent:"space-between",width: "100%"}}>
             <MiniBox>
                 <Button2 onClick={regameClicked}/>
                 <h3>다시시작</h3>
             </MiniBox>
             <MiniBox>
                 <Button onClick={() => navigate("/Menu/home/hard")}/>
                 <h3>나가기</h3>
             </MiniBox>
             </div>
                  
                   </ResultMovie>
                  }
              </>
            ) : null}
          </AnimatePresence>
    </div>
    );
}

export default Game2;