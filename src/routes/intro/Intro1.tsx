import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import basic1 from "../../image/Basic1.png";
import basic2 from "../../image/basic2.png";
import basic3 from "../../image/basic3.png";
import life1 from "../../image/life1.png";
import life2 from "../../image/life2.png";
import life3 from "../../image/life3.png";
import life4 from "../../image/life4.png";
import life5 from "../../image/life5.png";
import daily1 from "../../image/daily1.png";
import daily2 from "../../image/daily2.png";
import daily3 from "../../image/daily3.png";
import specify1 from "../../image/specific1.png";
import specify2 from "../../image/specific2.png";
import inquire from "../../image/Inquire.png";

const images1 = [basic1, basic2, basic3];
const images2 = [life1,life2,life3,life4,life5]; 
const images3 = [daily1, daily2, daily3];
const images4 = [specify1,specify2];
const images5 = [inquire];


const Container = styled(motion.div)`
    display: flex;
    width:100%;
    min-height: 80vh;
    height:100%;
    justify-content: center;
    flex-direction: column;
    @media screen and (max-width: 700px) {
        width: 100%;
    }
`;

const SubContainer = styled(motion.div)`
    margin: 0 auto;
`;

const Img = styled(motion.img)`
    width: 90%;
`;

const BodyVariable = {
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

function Intro1(){
    const params = useParams();
    const [img,setImg] = useState(images1);
    
const choice = (index: string | undefined) => {
    if(index === "1"){
        setImg(images1);
        return images1;
    }
    else if(index === "2"){
        setImg(images2);
        return images2;
    }
    else if(index === "3"){
        setImg(images3);
        return images3;
    }
    else if(index === "4"){
        setImg(images4);
        return images4;
    }
    else if(index === "5"){
        setImg(images5);
        return images5;
    }
};

    useEffect(() => {
        choice(params.id);
    },[params])    
    return (
        <AnimatePresence>        
            <Container 
            variants={BodyVariable}
            initial="initial"
            animate="end">
                {img?.map((choice,index) => <SubContainer> 
                    <Img
                src={choice} alt="대체"/> </SubContainer>)}
            </Container>
        </AnimatePresence>    
    );
}

export default Intro1;