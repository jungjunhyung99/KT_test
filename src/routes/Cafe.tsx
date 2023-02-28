import {AnimatePresence, motion} from "framer-motion";
import styled from "styled-components";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import { cafeItem, cafeItem2 } from "../kisok";
import { cafeItem3 } from "../kisok";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { CafeAnswer, cafeObj, IAtomCafe, ICafe } from "./atom";

const Container = styled(motion.div)`
    display:flex;
    flex-direction: column;
`;

const MenuContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    align-items: center;
`;

const OrderSlider = styled(motion.div)`
  display: flex; 
  width: 27vw;
`;

const Payment = styled.div`
    display: flex;
    width: 230px;
    height: 150px;
`;

const Head = styled.div`
  display: flex;
  flex-direction  : column;
  background-color: #212020;
  margin-bottom: 20px;
`;

const Info = styled(motion.div)`
  padding: 10px;
  opacity: 0;
  position: absolute;
  background-color: "#2F2F2F";
  bottom: 0;
  h4 {
    font-size: 18px;
  }
`;

const Box = styled(motion.div)<{bgphoto: string}>`
    background-image: url(${(props)=>props.bgphoto});
    background-size: cover;
    height: 60%;
    width: 60%;
    font-size: 30px;
    cursor: pointer;
    background-position: center center;
    margin: 0 auto;
    border: 2px solid;
`;

const SmallBox = styled(motion.div)<{bgphoto: string}>`
    background-image: url(${(props)=>props.bgphoto});
    background-size: cover;
    height: 70px;
    width: 70px;
    font-size: 66px;
    cursor: pointer;
    background-position: center center;
    border: 2px solid;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3,1fr);
  margin: 0 40px;
  height: 70vh;
`;

const Order = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  
`;

const Ul =styled.ul`
  display: flex;
  list-style: none;
  width: 90%;
  margin: 0 auto;
  padding-inline-start: 0px;
`;

const Li = styled.li`
  border: 3px solid white;
  width: 25%;
  margin: 5px;  
  font-size: 20px;
  font-weight: 700;
  color: white;
  cursor: pointer;
`;

const Selection = styled(motion.div)`
    height: 40vh;
    background-color: black;
`;

const Button = styled.button`
    border-radius: 40px;
    height: 2rem;
    font-size: 25px;
    margin: 0px 10px;
    cursor: pointer;
`;

const QuantityButton = styled(Button)`
    height: 1.5rem;
    font-size: 20px;
    border-radius: 100px;
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

const smboxVariant = {
    initial: {
        opacity:0,
    },
    end: {
        opacity: 1,
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

const XButton = styled(motion.button)`  
    position: relative;
    left:50%;
    bottom:90%;
    border-radius: 5em;
    font-weight: 700;
    width:2em;
    height:2em;
    cursor: pointer;
`;

const rowVariants = {
    hidden: {
      x: window.outerWidth + 5,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth - 5,
    },
  };

  const StyledLink = styled(Link)`
    text-decoration: none;
    color:white;
    font-weight: 800;
    &:focus, &hover, &:visited, &:link, &active{
        text-decoration: none;
    }
  `;

interface Ikiosk {
    id: string;
    sub: string;
    img: any;
    name: string;
    cost: number;
    selected: boolean;
    quantity: number;
    category: string;
}

interface ICondiment{
    name: string;
    quantity: number;
}

interface IItem{
    in: ICondiment[];
    not_in: ICondiment[];
};

interface IPay {
    store: string;
    level: string;
    basket: ICondiment[];
};


const offset = 4;

function Cafe () {
    const navigate = useNavigate();
    const modalMatch = useMatch("/Menu/explain/:objId");
    const selectionMatch = useMatch("/Menu/explain/:objId/selection");
    const [menuRecoil,SetMenuRecoil] = useRecoilState<IAtomCafe[]>(cafeObj);
    const [menu, setKiosk] = useState<Ikiosk[]>(cafeItem);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [cost, setCost] = useState(0);
    const [choice, setChoice] = useState<Ikiosk[]>([]);
    const [focus,setFocus] = useState(0);
    const [send, setSend] = useState<IPay>();
    const [condiment,setCondiment] = useState<IItem>();
    const answer = useRecoilValue<ICafe[]>(CafeAnswer);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBackClick = () => navigate(-1);
    const increaseIndex = (array:Ikiosk[]) => {
        if (array){
            if(leaving) return;
            //toggleLeaving();
            const totalKiosk = array.length - 1;
            const maxIndex = Math.floor(totalKiosk / offset);
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
            setFocus(maxIndex);
        }
    };

    const onListClicked = (num:Number) => {
        {num == 1 ? setKiosk(cafeItem) : num == 2 ? setKiosk(cafeItem2) : setKiosk(cafeItem3) }
    };

    const onBoxClicked = (objId: string, array:Ikiosk) => {
        
        const boxCopy = choice;
        for(let i = 0; i < choice.length; i++){
            if(boxCopy[i].id === objId){
                boxCopy[i].quantity++;
                setChoice([...boxCopy]);
                const costCopy = cost;
                setCost(costCopy + array.cost);
                return ;
            }
        }
        //navigate(`/Menu/explain/${objId}/selection`);
        const costCopy = cost;
        setChoice((prev)=>[...prev,array]);
        setCost(costCopy + array.cost);
    };

    const onPlusClicked = (objId : string, array:Ikiosk) => {
        const boxCopy = choice;
        for(let i = 0; i < choice.length; i++){
            if(boxCopy[i].id === objId){
                boxCopy[i].quantity++;
                setChoice([...boxCopy]);
                const costCopy = cost;
                setCost(costCopy + array.cost);
                return ;
            }
        }
    };

    const onMinusClicked = (objId : string, array:Ikiosk) => {
        const boxCopy = choice;
        if(array.quantity === 1){
            return;
        }
        for(let i = 0; i < choice.length; i++){
            if(boxCopy[i].id === objId){
                boxCopy[i].quantity--;
                setChoice([...boxCopy]);
                const costCopy = cost;
                setCost(costCopy - array.cost);
                return ;
            }
        }
    };
    
    
    const onPayClicked = (obj: Ikiosk[]) => {
        let item2 = [];
        for(let i = 0; i < obj.length; i++){
            const item = {
                name: obj[i].name,
                quantity: obj[i].quantity,
            };
            item2.push(item);
        }
    setSend({
        store: "cafe",
        level: "middle",
        basket:[
            ...item2
        ]
    });
    
    fetch("http://minho2618.dothome.co.kr/test1/api/kiosk_answer.php",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(
          send  
        ),
    }).then((response) => response.json()).then((result) => setCondiment(result));
    
    };

    const onPayClicked2 = (obj: Ikiosk[]) => {
        let arr:IAtomCafe[] = [];
        for(let i = 0; i < obj.length ; i++){
            arr.push({name:obj[i].name, quantity: obj[i].quantity});
        }
        SetMenuRecoil(arr);
        navigate("/Menu/home/hard/cafe/payment");
    };

    const XClicked = (num: number) => {
        setChoice([...choice.slice(0,num),...choice.slice(num+1)]);  
        setCost((prev) => prev - choice[num].cost * choice[num].quantity);
      
    };

    useEffect(()=> {
        for(let i = 0; i < cafeItem.length; i++){
            cafeItem[i].quantity = 1;
        }
        for(let i = 0; i < cafeItem2.length; i++){
            cafeItem2[i].quantity = 1;
        }
        for(let i = 0; i < cafeItem3.length; i++){
            cafeItem3[i].quantity = 1;
        }
    },[]);
     
    return (
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>    
            <Container
        initial={{opacity: 0}}
            animate={{opacity: 1, transition:{
                duration: 0.5,
                delay: 0.2,
            }}}
            exit={{opacity: 0}}>
                <Head>
                    <div style={{color:"white", display: "flex" }}>
                        <div style={{flex:1, display:"flex", justifyContent:"center"}}><button onClick={onBackClick}>Home</button></div>
                        <div style={{flex:2}}><h2 style={{}}>KT CAFE</h2></div>
                        <div style={{flex:1}}><h6>version:1.0</h6></div>
                    </div>
                    <div>
                    <Ul>
                        <Li onClick={() => onListClicked(1)}>
                         COFFEE   
                        </Li>
                        <Li onClick={() => onListClicked(2)}>
                         DESSERT
                        </Li>
                        <Li onClick={() => onListClicked(4)}>
                            ADE/TEA
                        </Li>
                        <Li onClick={() => onListClicked(4)}>
                            OTHER
                        </Li>
                    </Ul>
                    </div>
                </Head>
            <Row>
                {menu.map((obj) => 
                <MenuContainer>
                <Box 
                bgphoto={obj.img} 
                key={obj.id}
                variants={boxVariant} initial whileHover="hover" 
                transition={{type:"tween"}}
                onClick={() => onBoxClicked(obj.id, obj)}>
                </Box>
                <div>
                    <div style={{fontSize:"23px", fontWeight:"bold"}}>{obj.name}</div>
                    <span>{obj.cost}원</span>
                </div>
                </MenuContainer>
                )}
            </Row>
            {condiment?.in[0].name}
            <div style={{display:"flex", backgroundColor:"#d3d7d6",height:"11.5vh"}}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <Button onClick={() => increaseIndex(choice)}>{'<'}</Button>
                            <OrderSlider
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{type: "tween", duration: 1}}
                            key="row"
                            >
                                <Order key="order" layoutId="row">
                                    {choice.slice(offset * index, offset * index + offset).map((cho,index) => 
                                    <MenuContainer
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1, transition:{
                                        duration: 0.5,
                                        delay: 0.2,
                                    }}}
                                    exit={{opacity: 0}}>
                                    <SmallBox
                                    bgphoto={cho.img}
                                    key={cho.id}
                                    variants={smboxVariant} initial animate="exit"
                                    transition={{type:"tween"}}
                                >
                                    <XButton onClick={() => XClicked(index)}>X</XButton>          
                                    </SmallBox>
                                    <div style={{display:"flex", alignItems:"center"}}>
                                    <QuantityButton onClick={() => onMinusClicked(cho.id,cho)}>-</QuantityButton>
                                    <div style={{margin: "0 auto", fontSize: "25px", fontWeight:"bold"}}>{cho.quantity}</div>
                                    <QuantityButton onClick={() => onPlusClicked(cho.id,cho)}>+</QuantityButton>
                                    </div>
                                    </MenuContainer>)}
                                </Order>
                            </OrderSlider>
                        <Button onClick={() => increaseIndex(choice)}>{'>'}</Button>
                        </div>
            <div style={{display:"flex", fontSize:"20px", alignItems:"center"}}>
            <div style={{backgroundColor:"white", height:"100%",alignItems:"center", width: "5.5vw"}}><h4>{cost}원</h4></div>
            
            <div onClick={() => {onPayClicked2(choice)}} style={{height:"100%",backgroundColor:"#212020",color:"white", alignItems:"center", width: "5.5vw", border: "1px solid white", cursor:"pointer"}}>
            <StyledLink to="/Menu/home/hard/cafe/payment"><h4>카드결제</h4>
            </StyledLink>
            </div>
            <div onClick={() => navigate("/Menu/home/hard/cafe/payment")} style={{height:"100%",backgroundColor:"#212020",color:"white", alignItems:"center", width: "6vw", border: "1px solid white", cursor:"pointer"}}>
                <h4>현금결제</h4>
            </div>
            </div>
            </div>
            </Container>
        </AnimatePresence>
    );
}

export default Cafe;