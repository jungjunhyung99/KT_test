import { darken } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"; 

const Li = styled.li`
    display:flex;
    list-style: none;
    border-radius: 15px;
    width: 100%;
    &:hover{
        color: #2BB7B3;
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

const Ul = styled.ul`
  list-style: none;
  font-weight: bold;
  font-size: 16px;
  color: black;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
`;


const DropDown = styled.button`
  border: none;
  outline:none;
  position: relative;
  background-color: white;
  width: 12vw;
  @media screen and (max-width: 800px) {
        display: none;
    }
`;

const LiContainer = styled.div`
  border: 1px solid ${props => props.theme.borderColor};
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 10vw;
  position: absolute;
  display:none;
  ${DropDown}:active & {
    display: flex;
    justify-content: center;
  }

  

  ${DropDown}:focus & {
    display: block;
  }
`;


function Dropdown(){
  const navigate = useNavigate();
  
  return(
    <div>
        <DropDown>
            <h2 style={{fontSize:"1rem"}}>
            IT서포터즈 소개
            </h2>
          <LiContainer>
             <Ul>
                 <Li onClick={()=>navigate("/Menu/intro/1")}>KT서포터즈</Li>
                 <Li onClick={()=>navigate("/Menu/home/hard")}>KT키오스크</Li>
                
            </Ul>
          </LiContainer>
        </DropDown>
        <DropDown>
            <h2 style={{fontSize:"1rem"}}>
            IT서포터즈 교육과정
            </h2>
          <LiContainer>
             <Ul>
                 <Li onClick={()=>navigate("/Menu/intro/1")}>디지털 기초</Li>
                 <Li onClick={()=>navigate("/Menu/intro/2")}>디지털 생활</Li>
                 <Li onClick={()=>navigate("/Menu/intro/3")}>디지털 에듀</Li>
                 <Li onClick={()=>navigate("/Menu/intro/4")}>디지털 특화</Li>
                 <Li onClick={()=>navigate("/Menu/intro/5")}>교육문의</Li>
            </Ul>
          </LiContainer>
        </DropDown>
        
        <DropDown>
            <h2 style={{fontSize:"1rem"}}>
            KT키오스크
            </h2>
          <LiContainer>
             <Ul>
              <Li onClick={()=>navigate("/Menu/gamechoice/game")}>글자 게임</Li>
              <Li onClick={()=>navigate("/Menu/home/hard")}>키오스크 체험</Li>
              <Li onClick={()=>navigate("/Menu/test")}>우울증 테스트</Li>
            </Ul>
          </LiContainer>
        </DropDown>
    </div>
  );
}


export default Dropdown;