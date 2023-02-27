import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import life1 from "../../image/life1.png";
import life2 from "../../image/life2.png";
import life3 from "../../image/life3.png";
import life4 from "../../image/life4.png";
import life5 from "../../image/life5.png";

const images2 = [life1,life2,life3,life4,life5]; 

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

function Intro2(){    
    return (
        <AnimatePresence>        
            <Container 
            variants={BodyVariable}
            initial="initial"
            animate="end">
                {images2?.map((choice,index) => <img src={choice} alt="대체"/>)}
            </Container>
        </AnimatePresence>    
    );
}

export default Intro2;