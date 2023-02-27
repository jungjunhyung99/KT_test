import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fastAnswer, fastObj, IAtomFast } from "./atom";

const Container = styled(motion.div)`
    display:flex;
    flex-direction: column;
    height:100%;
    background-color: #faf8f8;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #023282;
    display: flex;
    height: 100%;
    overflow: auto;
`;

const EditBox = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-radius: 10px;
    width: 40rem;
    height: 9rem;
    margin-bottom: 2rem;
    box-shadow:  3px 3px 6px 3px #535261;
`;

const Navbar = styled.nav`
    display: flex;
    margin-right: 30px;
    flex-direction: column;
    height: 100%;
`;

const NavButton = styled.button`
    border-radius: 20px;
    margin:10px;
    width:40px;
    height: 40px;
    font-size: 30px;
    border:none;
    background-color: #9e9b9b;
    color: white;
    cursor: pointer;
`;

const MenuContainer = styled(motion.div)`
  display: flex;  
  flex-direction: column ;
  width:100%;
  align-items: center;
`;

const Menu = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    width: 100%;
    height: 50%;
`;

const SubBox = styled.div`
    display: flex;
    flex-direction: column;
    color: black;
    padding: 1rem;
`;

const ItemBox = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width:14vw;
    height:10vh;
    margin: 15px;
    color:black;
    border: 2px solid black;
    box-shadow:  3px 3px 3px 3px rgba(38, 38, 69, 0.3);
    border: none;
`;

const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    height:15%;
    color: black;
`;

const ResultBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width:99%;
    height:40px;
    border: 3px solid black;
`;

const CountBox = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width:200px;
    height: 60px;
`;

const EditButton = styled.button`
    height: 3rem;
    width: 3rem;
`;

const QuantityBox = styled(motion.div)`
    display:flex;
    flex-direction: column;
    position:absolute;
    align-items: center;
    background-color: white;
    left:12%;
    right:0;
    top:30%;
    bottom:0;
    width: 30vw;
    height: 20vh;
    box-shadow:  0 0 20px 20px #666666;
    border: none;
    z-index: 5;
`;

const QuantityButton = styled(motion.button)`
    border-radius: 5px;
    font-size: 45px;
    width: 60px;
    height: 100%;
    border: none;
    background-color:#DFDDDD;
    cursor: pointer;
`;

const NextButton = styled.button`
    width: 200px;
    height: 40px;
    background-color:#FF1F41;
    border: none;
    color: white;
    margin:10px;
    box-shadow:  0 2px 4px 0px #666666;
    cursor:pointer;
    &:hover{
        background-color: #ac0921;
        transition: all ease 0.5s 0s;
    }
`;

const NextButton2 = styled.button`
    width: 300px;
    background-color: #FF1F41;
    height: 40px;
    border: none;
    color: white;
    margin:10px;
    box-shadow:  0 2px 4px 0px #666666;
    cursor:pointer;
    &:hover{
        background-color: #ac0921;
        transition: all ease 0.5s 0s;
    }
`;

const NextButton3 = styled(NextButton)`
    width: 300px;
    background-color: #0C630F;
    cursor:pointer;
    &:hover{
        background-color: #0a4b0c;
        transition: all ease 0.5s 0s;
    }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%; // 수정 필요
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

interface IMenu{
    id: string | undefined;
    category: string | undefined;
    name: string | undefined;
    cost: number | undefined;
    cal: number | undefined;
    quantity: number;
}

const BerverageMenu = [
    {   id: "1",
        category: "Berverages",   
        name: "Coca-cola",
        cost: 2000,
        cal: 120,
        quantity: 1,
    },
    {
        id: "2",
        category: "Berverages",   
        name: "Coca-cola",
        cost: 2000,
        cal: 120,
        quantity: 1,
    },
    {
        id: "3",
        category: "Berverages",   
        name: "Coca-cola",
        cost: 2000,
        cal: 120,
        quantity: 1,
    },
];

const HamburgerMenu = [
    {
        id: "10",
        category: "Hamburger",   
        name: "Cheese burger",
        cost: 4500,
        cal: 420,
        quantity: 1,
    },
    {
        id: "11",
        category: "Hamburger",   
        name: "Cheese burger",
        cost: 4500,
        cal: 420,
        quantity: 1,
    },
    {
        id: "12",
        category: "Hamburger",   
        name: "Cheese burger",
        cost: 4500,
        cal: 420,
        quantity: 1,
    },
];


function Hamburger_result() {
    const navigate = useNavigate();
    const [menu,setMenu] = useState(BerverageMenu);
    const [fastRecoil, setFastRecoil] = useRecoilState<IAtomFast>(fastObj);
    const [answer, setAnswer] = useRecoilState<IAtomFast>(fastAnswer);
    const [select, setSelect] = useState<IMenu[]>([]);
    const [cost, setCost] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [selectId, setSelectId] = useState<number | null>();
    const [selectMenu, setSelectMenu] = useState<IMenu>();
    
    const cancleClicked = () => {
        setSelectId(null);
        setQuantity(1);
    };

    const overlayClicked = () => {
        setSelectId(null);
        setQuantity(1);
    };
    const plusClicked = () => {
        setQuantity((prev) => prev+1);
    };
    const minusClicked = () => {
        if(quantity === 1) return;
        setQuantity((prev) => prev-1);
    };
    const okClicked = () => {
            
    };

    const print = (items: IAtomFast, num: number) => {
        
        for(let i = 0; i < fastRecoil.item.length; i++){
            if(answer.item[num].name === fastRecoil.item[i].name && answer.item[num].quantity === fastRecoil.item[i].quantity){
                return true;
            }
        }
        return false;
    };

    const orderClicked = () => {
        navigate("/Menu/home/hard/hamburger/last");
        setFastRecoil({takeout:fastRecoil.takeout, item:select});
    };

    const editClick = (index: number) => {
    };

    const orderSum = () => {
        let total = 0;
        for(let i = 0; i < fastRecoil.item.length; i++){
            total += ((fastRecoil.item[i].cost) as any * fastRecoil.item[i].quantity);
        }
        setCost(total);
    };

    useEffect(()=>{
        orderSum();
    },[]);

    return(
        <AnimatePresence>
            <Container 
            initial={{opacity: 0}}
            animate={{opacity: 1, transition:{
                duration: 0.5,
            }}}
            exit={{opacity: 0}}>
                <Body>
                    <div style={{position:"absolute", top:"0"}}>
                    <h1>결과를 확인해주세요!</h1>
                    </div>
                    {(answer.takeout === fastRecoil.takeout) ? 
                        <div style={{fontSize:"1.9em",color:"#2BB7B3"}}>
                            {answer.takeout}으로 잘 골라주셨어요!
                        </div>
                    :
                    <div style={{fontSize:"1.9em",color:"#f96363"}}>
                        {answer.takeout}으로 골라주세요!
                    </div>
                    }

                    {(print(fastRecoil,0)) ? <div style={{fontSize:"1.9em",color:"#2BB7B3",marginTop:"3em"}}>
                        {answer.item[0].name} {answer.item[0].quantity}개를 잘 골라주셨네요!
                        </div> 
                        : 
                        <div style={{fontSize:"1.9em",color:"#f96363",marginTop:"3em"}}>
                        {answer.item[0].name} {answer.item[0].quantity}개를 골라주세요!
                        </div> 
                        }

                        {(print(fastRecoil,1)) ? <div style={{fontSize:"1.9em",color:"#2BB7B3",marginTop:"3em"}}>
                        {answer.item[1].name} {answer.item[1].quantity}개를 잘 골라주셨네요!
                        </div> 
                        : 
                        <div style={{fontSize:"1.9em",color:"#f96363", marginTop:"3em"}}>
                        {answer.item[1].name} {answer.item[1].quantity}개를 골라주세요!
                        </div> 
                        }
                </Body>
                <Footer>
                    <ResultBox>내 주문: {fastRecoil.takeout} | 상품 수: {fastRecoil.item.length} | 가격: {cost}</ResultBox>
                    <div>
                        <NextButton2 onClick={() => navigate(-1)}>뒤로가기</NextButton2>
                        <NextButton3 onClick={() => navigate("/Menu/home/hard")}>확인하기</NextButton3>
                    </div>
                </Footer>
            </Container>
            
            </AnimatePresence>
    );
}

export default Hamburger_result;