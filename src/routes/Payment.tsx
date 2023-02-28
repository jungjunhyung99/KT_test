import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import pay1 from "../image/pay1.png";
import payComplete from "../image/PayComplete.png";
import { cafeItem, cafeItem2, cafeItem3 } from "../kisok";
import { CafeAnswer, cafeObj, IAtomCafe, ICafe } from "./atom";
import regame from "../image/regame.png";
import door from "../image/door.png";
import { useNavigate } from "react-router-dom";

const Container = styled(motion.div)`
  display: flex;
  flex-direction  : column;
  height: 100%;
`;

const Box = styled(motion.div)<{bgPhoto: string}>`
    background-image: url(${(props)=>props.bgPhoto});
    background-size: cover;
    height: 4em;
    width: 4em;
    font-size: 30px;
    cursor: pointer;
    background-position: center center;
    margin: 0 auto;
    border: 2px solid;
`;

const Content = styled(motion.div)`
    width: 100%;    
`;

const Button = styled(motion.div)`
    background-image: url(${door});
    background-color: #d3d7d6;
    background-size: cover;
    width: 5em;
    height: 5em;
    margin-top: 2em;
    cursor: pointer;
    &:hover{
        opacity:2;
    }
`;

const Button2 = styled(motion.div)`
    background-image: url(${regame});
    background-color: #d3d7d6;
    background-size: cover;
    width: 5em;
    height: 5em;
    margin-top: 2em;
    cursor: pointer;
`;

const GridContainer = styled.div`
  display: flex;
  height: 65vh;
  align-items: center;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 1em;
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


const imgVariable = {
    hidden: {
      scale: 1,
    },
    visible: {
      scale: 1,
    },
    exit: {
      scale: 0,
    },
  };


function Payment() {
    const navigate = useNavigate();
    const [content, setContent] = useState(true);
    const menu = useRecoilValue<IAtomCafe[]>(cafeObj);
    const answer = useRecoilValue<ICafe[]>(CafeAnswer);
    const [message, setMessage] = useState<string[]>([]);
  const print = (obj: IAtomCafe[], num: number) => {
    //if(answer[i].name == obj[j].name && answer[i].quantity == obj[j].quantity){ 
    for(let i = 0; i < obj.length ; i++){
      if(answer[num].name === obj[i].name && answer[num].quantity === obj[i].quantity){

        return true;
      }
    }
          return false;
  };

  const conClick = () => {
    setContent(false);
  };  

    return (
        <AnimatePresence>
            <Container onClick={conClick}
            >
                {content ? <Content
                variants={imgVariable}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{type: "spring", duration: 3}}
                layoutId="content"
                >
                    <div style={{width:"100%",height:"10vh", backgroundColor:"black"}}/>
                    <div style={{width:"100%", height:"75vh", display:"flex", alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                        <h1>화면을 클릭해주세요</h1>
                        <img src={pay1} alt="hi"/>
                    </div>
                    <div style={{width:"100%",height:"10vh", backgroundColor:"#666666"}}/>
                </Content>
                : 
                <div style={{display:"flex",flexDirection:"column"}}>
                  <div style={{backgroundColor:"#212020",color:"white"}}>
                  <h1 style={{marginTop:"2em"}}>결과를 확인해주세요!</h1>
                  </div>
                  {menu.length > 3 ? <div>요구한 메뉴보다 더 많이 담으셨습니다.</div>: null}
                    <GridContainer>
                    <Grid>
                    <div style={{display:"flex", flexDirection:"column"}}>
                    <Box bgPhoto={cafeItem[answer[0].index].img}>
                    </Box>
                    {(print(menu,0))?<div style={{fontSize:"1.5em"}}>
                      <p>
                      {answer[0].name}  {answer[0].quantity}개를 <br/>잘 담으셨습니다!
                     </p>
                      </div>: <div style={{fontSize:"1.5em"}}>
                      {answer[0].name} {answer[0].quantity}개 선택해주세요!
                      </div>}
                      
                    </div>
                      
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <Box bgPhoto={cafeItem2[answer[1].index].img}>
                    </Box>
                    {(print(menu,1))?<div style={{fontSize:"1.5em"}}>
                      <p>
                      {answer[1].name}  {answer[1].quantity}개를 <br/>잘 담으셨습니다!
                     </p>
                      </div>: <div style={{fontSize:"1.5em"}}>
                      {answer[1].name} {answer[1].quantity}개 선택해주세요!
                      </div>}
                    </div>
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <Box bgPhoto={cafeItem3[answer[2].index].img}>
                    </Box>
                    {(print(menu,2))?<div style={{fontSize:"1.5em"}}>
                      <p>
                      {answer[2].name}  {answer[2].quantity}개를 <br/>잘 담으셨습니다!
                     </p>
                      </div>: <div style={{fontSize:"1.5em"}}>
                      {answer[2].name} {answer[2].quantity}개 선택해주세요!
                      </div>}
                      </div>
                      </Grid>
                      </GridContainer>
                
                  <div style={{display:"flex",backgroundColor:"#d3d7d6",height:"17vh",width:"100%",justifyContent:"space-between"}}>
                    <div style={{display:"flex", flexDirection:"column",marginLeft:"2em"}}>
                    <Button2 onClick={()=>navigate("/Menu/home/hard/cafe")}
                    variants={boxVariant} initial whileHover="hover" 
                    transition={{type:"tween"}}
                    ></Button2>
                    <div style={{fontWeight:"800", marginTop:"1em"}}>
                      다시하기
                    </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column",marginRight:"2em"}}>            
                    <Button onClick={()=>navigate("/Menu/home/hard")}
                    variants={boxVariant} initial whileHover="hover" 
                    transition={{type:"tween"}}
                    ></Button>
                    <div style={{fontWeight:"800", marginTop:"1em"}}>
                      나가기
                    </div>
                    </div>
                  </div>
                </div>
                }
            </Container>
        </AnimatePresence>
    );
}

export default Payment;