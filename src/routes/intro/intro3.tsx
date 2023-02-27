import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import daily1 from "../../image/daily1.png";
import daily2 from "../../image/daily2.png";
import daily3 from "../../image/daily3.png";

const images1 = [daily1, daily2, daily3];

const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
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
    return (
        <AnimatePresence>        
            <Container 
            variants={BodyVariable}
            initial="initial"
            animate="end">
                {images1?.map((choice,index) => <img src={choice} alt="대체"/>)}
            </Container>
        </AnimatePresence>    
    );
}

export default Intro1;