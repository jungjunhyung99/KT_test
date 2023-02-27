import { motion } from "framer-motion";
import styled from "styled-components";
import regame from "../image/regame.png";
import door from "../image/door.png";


const BigMovie = styled(motion.div)`
  position: absolute;
  color: white;
  width: 20vw;
  height: 40vh;
  left: 0;
  right: 0;
  top:0;
  bottom:0;
  background-color: white;
  border: 2px solid white;
  overflow: hidden;
  background-color: #2BB7B3;
  @media screen and (max-width: 700px){
    width: 70vw;
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

const Overlay = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%; // 수정 필요
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 4;
`;

function Game2_result() {
    return(
        
        <BigMovie>
            <h2>당신의 점수는...</h2>
            <h4>3점 입니다.</h4>
        <div style={{margin:"0 auto" ,display:"flex", justifyContent:"space-between",width: "100%"}}>
        <MiniBox>
            <Button2/>
            <h3>다시시작</h3>
        </MiniBox>
        <MiniBox>
            <Button/>
            <h3>나가기</h3>
        </MiniBox>
        </div>
        </BigMovie>
        
    );


}

export default Game2_result;