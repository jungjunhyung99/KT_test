import styled from "styled-components";
import React, {Component} from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Americano from "../image/americano.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CGV from "../image/CGV.png";
import Hamburger from "../image/Hamburger.png";
import { AnimatePresence, motion } from "framer-motion";

interface IChoice{
    name: string;
    url: string;
    sub: string;
    color: string;
}

const ItemContainer = styled.div`
    display: flex;
    flex-direction: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Subscribe = styled.div`
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-weight: 800;
    &:focus, &hover, &:visited, &:link, &active{
        text-decoration: none;
    }
`;


const HeadVariable = {
    initial:{
        opacity: 0,
        screenY: -1,
    },

    end:{
        opacity: 1,
        transition:{
            screenY: 0,
            delay: 0.5,
            duration: 1,
        }
    }
};


const SliderItem = styled.div`
  width: 100%;

  img,div{
    max-width: 100%;
  }
`;

const StyledSlider = styled(Slider)`
    .slick-list{
        width: 70vw;
        margin-left: 20px;
    }

    .slick-slide img {
        object-fit: cover;
        height: 40vh;
        width: 100%;
        box-sizing: border-box;
    }

    .slick-dots{
        bottom: -50px;   
        margin-top: 200px;
    }
    
    .slick-slide div{
        cursor: pointer;
        margin-right: 20px;
    }

    .slick-track{
        overflow-x: hidden;
    }

    .slick-slide{
        visibility: hidden;
    }

    .slick-slide.slick-active{
        visibility: visible;
    }

    .slick-prev:before, .slick-next:before{ // 양옆 버튼
    	font-family: 'slick';
        font-size: 40px;
        line-height: 1;
        opacity: .7;
        color:  #2BB7B3;
        -webkit-font-smoothing: antialiased;
    }
`;

const SlideWrapper = styled.section`
    
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
`;

const Section = styled(motion.section)`
    display:flex;
    flex-direction: column;
    min-height: 80vh;
    height: 100%;
`;

const items : IChoice[] = [
    { name: "cafe", url: Americano, sub:"카페에서 커피를 주문해주세요!", color: "#F7DC6F"},
    { name: "hamburger", url: Hamburger, sub: "햄버거 세트와 음료를 시켜주세요!",color: "#D5A991"},
    { name: "cgv", url: CGV,sub: "영화관 표를 예매해주세요!", color: "#e6b1b1"},
    { name: "cafe", url: Americano, sub: "카페에서 커피를 주문해주세요!",color: "#F7DC6F"},
    { name: "hamburger", url: Hamburger, sub: "햄버거 세트와 음료를 시켜주세요!",color: "#D5A991"},
    { name: "cgv", url: CGV, sub: "영화관 표를 예매해주세요!", color: "#2BB7B3"}
    ];

function HardChoice () {
    const navigate = useNavigate();
    const settings = {
            dots: true, // 캐러셀의 점 출력 여부 
            infinite: true, // 무한 반복 여부  
            speed: 500, // 넘기는 속도 
            arrows: true,
            autoplay: true,
            autoplaySpeed: 2300,
            pauseOnHover: true,
            className: '',
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [ // 반응형 
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
                },
                {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
                },
            ],
      };

      const initialSetting = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        fade:true,
        centerPadding: "60px",
        autoplay: true,
        autoSpeed: 7000,
        pauseOnHover: true,

      };

      const handleClickProducts= (objId:string) => {
        navigate(`/Menu/home/hard/${objId}`);
      };

      

    return (
        <AnimatePresence>
            <Section 
            className="carousel"
            variants={HeadVariable}
            initial="initial"
            animate="end">
            <div style={{width:"70vw",backgroundColor:"#f0cf2a", color:"black",height:"15vh",display:"flex", justifyContent:"center",alignItems:"center"}}>        
                <h1>키오스크 실전연습</h1>
            </div>
                <StyledSlider {...settings}
                >
                    {items.map((item,index) => (
                            <SliderItem key={index}> 
                                    <div><Img onClick={() => {handleClickProducts(item.name)}} src={item.url}></Img></div>
                                    <div style={{backgroundColor:`${item.color}`, height:"15vh", marginTop:"-2vh"}}>
                                        <h3 style={{fontWeight:"500", fontFamily:"fantasy"}}>{item.sub}</h3>
                                    </div>
                            </SliderItem>
                    ))} 
                </StyledSlider>
            </Section>
         </AnimatePresence>        
    );
}

export default HardChoice;