import styled from "styled-components";
import logo from "../image/hd_logo.png";
import kt_header from "../image/kt_header.png";
import {Link,Outlet, Routes, Route, useMatch, useParams} from 'react-router-dom';
import React, { useState } from 'react';
import ApexChart from "react-apexcharts";
import Chart from "./Chart";
import basicIcon from "../image/basicIcon.png";
import { useRef } from "react";
import Dropdown from "./Dropdown";
import {AnimatePresence, motion} from "framer-motion";
import TopButton from "./TopButton";
import Bottom from "./Bottom";
import Footer from "./Footer";

interface Iprops {
    isActive: boolean;
}

const Container = styled(motion.div)`
    margin-bottom: 7vh;
    @media screen and (max-width: 700px) {
        margin-bottom: 0px;
    }
`;

const BgContainer = styled.div`
    @media screen and (max-width: 700px) {
        width:100%;
        height:200px;
    }
`;

const Header = styled.header`
    display: flex;
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 80px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #2BB7B3;
`;

const HeadOl = styled.ol`
    display: flex;
    list-style-type: disc;
    justify-content: center;    
    max-width: 100vw;
    z-index: 2;
    width: 100%;
    margin: 0 auto;
    transform: translateY(-50%);
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    @media screen and (max-width: 700px) {
        
    transform: translateY(-25%);
        flex-wrap: wrap;
    }
`;

const HeadLi = styled.li<{isActive: boolean}>`
    width: 7.5vw;
    height: 6vh;
    margin: -40px 10px;
    padding: 10px 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    font-weight: 700;
    background-color: white;
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
    background-color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.spanColor};
    color: ${(props) => props.isActive ? props.theme.spanColor : props.theme.textColor};
    @media screen and (max-width: 700px) {
        min-width: 10vw;
        height: 4vh;
        margin: 3px;
        font-size: 11px;
    }
`;

const BodyContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
`;

const NavBar = styled.nav`
  display:flex;
  justify-content: center;
  flex: 2;
  height: calc(100vh-100px);
  top: 100px;
  position: sticky;
  padding: 12px 8px;
  background-color: white;
  span{
    font-size: 30px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 200;
    border-bottom: 1px solid;
    border-color: white;    
  }
`;

const Body = styled(motion.div)<{isactive:boolean}>`
    width:100vw;
    padding-top: 50px;
    min-height: ${(props)=>props.isactive ? "80vh" : "auto"};
    display: flex;
    justify-content: center;
    flex-direction: row;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    
    @media screen and (max-width: 700px) {
        width: 100%;
        padding-top: 0px;
    }
`;

const ListContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const HeadImg = styled(motion.img)`
    display: flex;
    justify-content: center;    
    max-width: 400px;
    height: 200px;
    z-index: 2;
    width: 100%;
    margin: 0 auto;
    transform: translateY(-140%);
`;

 const Img = styled.img.attrs({
    src: `${logo}`,
    alt: "kt_logo",
 })`
    margin-left: 10vw;
 `;

 const Middle_bg = styled.img.attrs({
    src: `${kt_header}`,
    alt: "kt_bodyImage",   
})

`
    display: block;
    width: 100%;
    height: 400px;
    margin: 0px auto;
    @media screen and (max-width: 700px) {
    scr: url("	http://itsupporters.com/theme/it/img/m/sub/sub02.png");
    width:100%;
    height:100%;
}
 `;

 const ChartContainer = styled.div`
  display: block;
  margin: 0 auto; 
 `;

const NavWrapper = styled.div`
    padding: 20px;
    color: black;
`;

const NavMenu = styled.div`
    margin-bottom: 2rem;
`;

const NavTitle = styled.h3`
    font-size: 2rem;
`;


 const Middle_gray = styled.div`
    display: inline-block;
    height: 100px;
    width: 100%;
    background-color: gray;
 `;

const Olist = styled.ol`
    position: relative;
    font-size: 20px;
    font-weight: 700;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    list-style: none;
    padding: 0.5rem;
    margin: 0.5rem;
    margin-right: 10vw;
    &:hover{
        li{
            display: block;        
        }
    }
`;

const NavList = styled.li<{isActive: boolean}>`
    display: ${(props)=> props.isActive ? 'block':'none'};
    margin-top: 17px;
`;

const List = styled.li`
    width: 10vw;
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;
    
    &:hover{
        background-color: #2BB7B3;
        transition: all 1s;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-weight: 800;
    &:focus, &hover, &:visited, &:link, &active{
        text-decoration: none;
    }
`;

const introBar = [
    {name: "디지털 기초",
    link: "/Menu/intro/1",
    },
    {name: "디지털 생활",
    link: "/Menu/intro/2",
    },
    
    {name: "디지털 에듀",
    link: "/Menu/intro/3",
    },
    {name: "디지털 특화",
    link: "/Menu/intro/4",
    },
    {name: "교육문의",
    link: "/Menu/intro/5",
    },
    {name: "키오스크체험",
    link: "/Menu/home/introduce",
    },
];


const mainBar = [
    {name: "숫자게임",
    link: "/Menu/intro/1",
    },
    {name: "글자색 게임",
    link: "/Menu/intro/2",
    },
    {name: "디지털 에듀",
    link: "/Menu/intro/3",
    },
    
]


function Menu() {
    const contentMatch = useMatch("/Menu/*");
    const contentMatch2 = useMatch("/Menu/intro/*");
    const notMatch = useMatch("/");
    const baseMatch = useMatch("/Menu/intro");
    const kioskMatch = useMatch("/Menu/home/introduce");
    const gameMatch = useMatch("/Menu/gamechoice");
    const testMatch = useMatch("/Menu/home/hard/*");
    const [display, setDisplay] = useState<boolean[]>([false,false,false]);
    const outMouseDisplay = (index:number) => {
        let newDisplay = [...display];
        newDisplay[index] = false;
        setDisplay(newDisplay);
    }
    let para = useParams();
    const inMouseDisplay = (index:number) => {
        let newDisplay = [...display];
        newDisplay[index] = true;
        setDisplay(newDisplay);
    }

    return (
    <AnimatePresence>
    <div>
        <Header>
            <Link to={"/Menu/intro/1"}>
                <Img />
            </Link>
        <>
        <ListContainer>
        {/* <Olist 
        onMouseOver={() => inMouseDisplay(0)}
        onMouseOut={() => outMouseDisplay(0)}
        >
            IT 서포터즈 소개
            <NavList isActive={display[0]}>gg</NavList>
        </Olist>
        <Olist
        onMouseOver={() => inMouseDisplay(0)}
        onMouseOut={() => outMouseDisplay(0)}
        >
            교육프로그램
            <NavList isActive={display[1]}>하하</NavList>
            <NavList isActive={display[1]}>후후</NavList>
        </Olist>
        <Olist
        onMouseOver={() => inMouseDisplay(0)}
        onMouseOut={() => outMouseDisplay(0)}>
            소리찾기/사랑의 봉사단
            <NavList isActive={display[2]}>코코</NavList>
            <NavList isActive={display[2]}>키키</NavList>
        </Olist> */}
        <Dropdown></Dropdown>
        </ListContainer>
        <Olist>version 1.0</Olist>
        </>
        </Header>
        <Container>
        <BgContainer>
            <Middle_bg></Middle_bg>
        </BgContainer>
        <HeadOl>
            {contentMatch2 ? introBar.map((intro,index) => 
            <StyledLink to={intro.link}>
                <HeadLi isActive={para.id as unknown as number == index +1}> {intro.name}
                
                </HeadLi>
            </StyledLink>    
                ) : <HeadOl>
                    
                <StyledLink to="/Menu/intro/1"><HeadLi isActive={false}>IT교육과정</HeadLi></StyledLink>
                <StyledLink to="/Menu/home/introduce">
                    <HeadLi isActive={kioskMatch !== null}>키오스크설명</HeadLi>
                </StyledLink>
                
                <StyledLink to="/Menu/gamechoice/game">
                    <HeadLi isActive={gameMatch !== null}>글자게임</HeadLi>
                </StyledLink>
    
                <StyledLink to="/Menu/gamechoice/numberGame">
                    <HeadLi isActive={false}>숫자게임</HeadLi>
                </StyledLink>
                <StyledLink to="/Menu/home/hard">
                    <HeadLi isActive={testMatch !== null}>키오스크 체험</HeadLi>
                </StyledLink></HeadOl>}
            
        </HeadOl>
        </Container>
        <BodyContainer>
            {/* <NavBar>
                <NavWrapper>
                {contentMatch2 ? <img src={basicIcon}/>: 
                    <NavMenu>
                        <Olist>
                            <StyledLink to="/Menu/home/middle">
                                <NavTitle>
                                    키오스크 실전연습
                                </NavTitle>
                            </StyledLink>
                            <StyledLink to="/Menu/explain2">
                                <NavTitle>
                                    키오스크 설명서
                                </NavTitle>
                            </StyledLink>
                            <StyledLink to="/Menu/gamechoice">
                                <NavTitle>
                                    뇌활력 게임
                                </NavTitle>
                            </StyledLink>
                            <StyledLink to="/Menu/test">
                                <NavTitle>
                                    치매 테스트
                                </NavTitle>
                            </StyledLink>
                                <StyledLink to="/Menu/home"><List>식당</List></StyledLink>
                                <StyledLink to="/Menu/chart"><List>구매시설</List></StyledLink>
                                <StyledLink to="/Menu/"><List>교통시설</List></StyledLink>
                                <StyledLink to="/Menu/"><List>극장</List></StyledLink>
                                <StyledLink to="/Menu/chart"><List>은행</List></StyledLink>
                                <StyledLink to="home/hard/cafe"><List>카페</List></StyledLink>
                                <StyledLink to="/Menu/chart"><List>업무</List></StyledLink>
                                <StyledLink to="/Menu/chart"><List>기타</List></StyledLink>
                                </Olist>
                                <StyledLink to="/Menu/chart"> 
                                    <Olist>
                                <NavTitle>
                                통계 보기
                                </NavTitle>
                            </Olist> 
                        </StyledLink>
                    </NavMenu>}
                </NavWrapper>
            </NavBar> */}
        <div style={{display:"flex",flexDirection:"column"}}>
        <Body isactive={testMatch!==null}>
            <Outlet/>
        </Body>
        <Footer/>
        </div>
        <TopButton/>
        </BodyContainer>
        </div>
        </AnimatePresence>
    );
}
export default Menu;