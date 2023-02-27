import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fastAnswer, IAtomFast } from "./atom";
import Hamburger_main from "./Hamburger_main";
import {HamburgerMenu} from "../kisok";
import {BerverageMenu} from "../kisok";

const Overlay = styled(motion.div)`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 100%;
  left:0;
  right: 0;
  margin: 0 auto;
  background-color: #023282;
  color: white;
  border: 2px solid white;
  overflow: hidden;
  z-index: 1;
  @media screen and (max-width: 700px) {
    margin: 0;
    width: 60vw;
  }
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
    @media screen and (max-width: 700px) {
    margin: 0;
    width: 30vw;
    height: 55vh;
  }
`;

const take = ["포장주문", "매장식사"];

function Hamburger() {
    const navigate = useNavigate();
    const onOverlayClick = () => navigate("/Menu/home/hard");
    const modalMatch = useMatch("/Menu/home/hard/hamburger/*");
    const modalMatch2 = useMatch("/Menu/home/hard/hamburger");
    const [menu, setMenu] = useState<IAtomFast>();
    const [answerRecoil, setAnswerRecoil] = useRecoilState<IAtomFast>(fastAnswer);

    const getAnswer = () => {
        const idx1 = Math.floor(Math.random()*3);
        const idx2 = Math.floor(Math.random()*3);
        const idx3 = Math.floor(Math.random()*2);
        setMenu({
            takeout: take[idx3],
            item:[
                {
                    id: "0",
                    category: take[idx3],
                    name: HamburgerMenu[idx1].name,
                    cost: HamburgerMenu[idx1].cost,
                    cal: HamburgerMenu[idx1].cal,
                    quantity: idx1 + 1,
                },
                {
                    id: "1",
                    category: take[idx3],
                    name: BerverageMenu[idx1].name,
                    cost: BerverageMenu[idx1].cost,
                    cal: BerverageMenu[idx1].cal,
                    quantity: idx2 + 1,
                }
                ]
        });
        setAnswerRecoil({
            takeout: take[idx3],
            item:[
                {
                    id: "0",
                    category: take[idx3],
                    name: HamburgerMenu[idx1].name,
                    cost: HamburgerMenu[idx1].cost,
                    cal: HamburgerMenu[idx1].cal,
                    quantity: idx1 + 1,
                },
                {
                    id: "1",
                    category: take[idx3],
                    name: BerverageMenu[idx1].name,
                    cost: BerverageMenu[idx1].cost,
                    cal: BerverageMenu[idx1].cal,
                    quantity: idx2 + 1,
                }
            ]
        });
    };
    console.log(answerRecoil);
    useEffect(() => {
        getAnswer();
    },[])

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
                        animate={{opacity: 1, 
                            transition:{
                            duration: 0.5,
                        }}}
                        exit={{opacity: 0}}
                        style={{ top: 200 }}
                        >
                            {modalMatch2 ? <Hamburger_main/> : <Outlet/>}
                        </BigMovie>
                        <SmallMovie
                        style={{ top: 200 }}
                        >
                            <h1>이렇게 담아주세요!</h1>
                            <hr/>
                            <p><h2>식사종류 : </h2>{menu?.takeout}<br/>
                            <h2>메인메뉴: </h2>{menu?.item[0].name} {menu?.item[0].quantity}개<br/>
                            <h2>음료 : </h2> {menu?.item[1].name} {menu?.item[1].quantity}개</p>

                        </SmallMovie>
                    </div>
                </> : <div></div>}
        </AnimatePresence>
    );
}

export default Hamburger;