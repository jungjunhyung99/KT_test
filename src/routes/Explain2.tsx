import {AnimatePresence, motion, useScroll, useViewportScroll} from "framer-motion";
import styled from "styled-components";
import Americano from "../image/americano.png"
import CGV from "../image/CGV.jpg";
import Ramen from "../image/Ramen.jpg";
import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cafe from "./Cafe";
import Takeout from "../image/Takeout.jpg";
import Mug from "../image/Mug.png"
import Payment from "./Payment";
import { useRecoilState } from "recoil";
import { CafeAnswer, ICafe } from "./atom";
import { cafeItem, cafeItem2, cafeItem3 } from "../kisok";

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

const Container = styled(motion.div)`
    background: gray;
`;

const Info = styled(motion.div)`
  padding: 10px;
  opacity: 0;
  position: absolute;
  background-color: "#2F2F2F";
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

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
  min-height: 95vh;
  max-height: 95vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: white;
  border: 2px solid white;
  overflow: hidden;
`;

const Box = styled(motion.div)<{bgPhoto: string}>`
    background-image: url(${(props)=>props.bgPhoto});
    background-size: cover;
    height: 200px;
    font-size: 66px;
    cursor: pointer;
    background-position: center center;
    border: 2px solid;
    background-color: black;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(3,1fr); 
  width: 60%;
`;

const boxVariant = {
    initial: {
        scale:1,
    },
    hover: {
        scale: 1.3,
        transition: {
            delay: 0.5,
            duration: 0.1,
            type: "tween",
        },
    },
};

const infoVariants = {
    initial:{
        opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duaration: 0.1,
        type: "tween",
      },
    },
  };

const rowVariants = {
    hidden: {
      x: window.outerWidth + 2,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth - 2,
    },
  };

const image = [CGV, Americano, Ramen, Ramen];

const kioskObj = [
    {
        id: "1", 
        sub:"CGV 요약본입니다.",
        img: image[0],
        name: "CGV",
    },
    {
        id: "2", 
        sub:"Cafe 요약본입니다.",
        img: image[1],
        name: "Cafe",
    },
    {
        id: "3", 
        sub:"식당 예약본입니다.",
        img: image[2],
        name: "식당",
    },
    
    {
        id: "4", 
        sub:"식당2 예약본입니다.",
        img: image[3],
        name: "식당",
    },
    
    {
        id: "5", 
        sub:"식당2 예약본입니다.",
        img: image[1],
        name: "식당",
    },
    {
        id: "6", 
        sub:"식당2 예약본입니다.",
        img: image[2],
        name: "식당",
    },
    {
        id: "7", 
        sub:"식당2 예약본입니다.",
        img: image[2],
        name: "식당",
    },
];

interface Ikiosk {
    id: number;
    sub: string;
    img: string;
    name: string;
}

const offset = 4;

function Explain2 () {
    const navigate = useNavigate();
    const modalMatch = useMatch("/Menu/home/hard/cafe/*");
    const paymentMatch2 = useMatch("/Menu/home/hard/cafe/payment");
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [answerRecoil, setAnswerRecoil] = useRecoilState<ICafe[]>(CafeAnswer);
    const [menu, setMenu] = useState<ICafe[]>([]);
    const setAnswer = () => {
      const idx = Math.floor(Math.random()*cafeItem.length);
      const idx2 = Math.floor(Math.random() * cafeItem2.length)
      const idx3 = Math.floor(Math.random() * cafeItem3.length)
      const idx4 = Math.floor(Math.random()*3 + 1);
      const idx5 = Math.floor(Math.random()*3 + 1);
      const idx6 = Math.floor(Math.random()*3 + 1);

      setMenu([
        {index: idx, name:cafeItem[idx].name, quantity:idx4}
      ,{index: idx2, name:cafeItem2[idx2].name, quantity: idx5}
      ,{index: idx3, name:cafeItem3[idx3].name, quantity: idx6}
      ]);
      setAnswerRecoil([{index: idx, name:cafeItem[idx].name, quantity:idx4}
      ,{index: idx2, name:cafeItem2[idx2].name, quantity: idx5}
      ,{index: idx3, name:cafeItem3[idx3].name, quantity: idx6}
    ]);
    console.log(answerRecoil);
    };
    
    const increaseIndex = () => {
        if (kioskObj){
            if(leaving) return;
            toggleLeaving();
            const totalKiosk = kioskObj.length - 1;
            const maxIndex = Math.floor(totalKiosk / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onOverlayClick = () => navigate("/Menu/home/hard");
    const onBoxClicked = (objId : string) => {
     navigate(`/Menu/explain/${objId}`);
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
        setAnswer();
      },[])

      useEffect(() => {
        window.addEventListener("scroll", onScroll); // scorll할 때 onScroll 이벤트 핸들러 지정
        return () => window.removeEventListener("scroll", onScroll); // clean up
      }, []);
      return state;
    };
    const {y} = useScroll();
    
    return (
          <>
            {/* <AnimatePresence initial={false} onExitComplete={toggleLeaving}>    
            <button onClick={increaseIndex}></button>
            <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{type: "tween", duration: 1}}
            key={index}
            >
                {kioskObj.slice(offset * index, offset * index + offset).map((obj) => 
                <Box 
                layoutId={obj.id + ""}
                bgPhoto={obj.img} 
                key={obj.id}
                variants={boxVariant} initial whileHover="hover" 
                transition={{type:"tween"}}
                onClick={() => onBoxClicked(obj.id)}  >
                    
                <Info variants={infoVariants}>
                    <h4>{obj.sub}</h4>
                </Info> 
                </Box>
                )}
            </Row>
        </AnimatePresence> */}
        <AnimatePresence>
            {modalMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{opacity: 0}}
                  animate={{opacity:1}}
                />
                <div style={{display:"flex"}}>
                <BigMovie        
                initial={{opacity: 0}}
                animate={{opacity: 1, transition:{
                    duration: 0.5,
                    delay: 0.2,
                }}}
                exit={{opacity: 0}}
                  style={{ top: y + 10 }}
                  layoutId={modalMatch.params as any}
                >
                  {paymentMatch2 ? <Outlet/> : <Cafe/> } 
                </BigMovie>
                <SmallMovie
                initial={{opacity: 0}}
                animate={{opacity: 1, transition:{
                    duration: 0.5,
                    delay: 0.2,
                }}}
                exit={{opacity: 0}}
                        style={{ top: y + 10 ,lineHeight:"0.9"}}
                        >
                            <h1>이렇게 담아주세요!</h1>
                            <hr/>
                            <p><h2>커피 : </h2>{menu[0]?.name} {menu[0]?.quantity}개<br/>
                            <h2>디저트 : </h2>{menu[1]?.name} {menu[1]?.quantity}개 <br/>
                            <h2>에이드 : </h2> {menu[2]?.name} {menu[2]?.quantity}개</p>
                        </SmallMovie>
                </div>
              </>
              
            ) : <BigMovie></BigMovie>}
          </AnimatePresence>
          </>
        );
}

export default Explain2;