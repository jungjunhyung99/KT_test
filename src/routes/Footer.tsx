import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`   
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #f0ebeb;
    
    @media screen and (max-width:700px){
        flex-direction: column;
    }
`;

const Miniontainer = styled.div`
    display: flex;
    padding-right: 8em;
    padding-left: 8em;
    @media screen and (max-width: 700px){
        flex-direction: column;
        padding: 0;
    }
`;

const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2em;
    @media screen and (max-width: 700px){
        margin: 0.5em;
    }
`;

function Footer() {
    return (
        <div style={{width:"100%",backgroundColor:"#f3f2f2"}}>
            <Container>
                <Miniontainer>
                <SubContainer>
                    <img src="http://itsupporters.com/theme/it/img/ft_logo.png" alt="대체"/>
                    <h3 style={{color:"#666666"}}>대표번호 1577-0080</h3>
                </SubContainer>
                <SubContainer>
                    <p style={{fontSize:"0.7em", color:"#666666"}}>㈜케이티 경기도 성남시 분당구 불정로 90 (정자동)대표자명 : 구현모 사업자등록번호 : 102-81-42945통신판매업신고 : 2002-경기성남-0048
    Copyright© 2022 KT Corp. All rights reserved.Contact : itsupporters@kt.com</p>
                </SubContainer>
                <SubContainer>
                    <div style={{display:"flex"}}>
                        <div><a href="https://www.facebook.com/kt.corp/"><img style={{margin:"0.6em",cursor:"pointer"}} src="http://itsupporters.com/theme/it/img/ft_sns_facebook.png" alt="페이스북"/></a></div>
                        <div><a href="https://twitter.com/kt_corp"><img style={{margin:"0.6em",cursor:"pointer"}} src="http://itsupporters.com/theme/it/img/ft_sns_twitter.png" alt="트위터"/></a></div>
                        <div><a href="https://www.youtube.com/olleh"><img style={{margin:"0.6em",cursor:"pointer"}} src="http://itsupporters.com/theme/it/img/ft_sns_youtube.png" alt="유튜브"/></a></div>
                        <div><a href="https://www.instagram.com/kt.corp/"><img style={{margin:"0.6em",cursor:"pointer"}} src="http://itsupporters.com/theme/it/img/ft_sns_instagram.png" alt="인스타그램"/></a></div>
                    </div>
                    <span style={{color:"#666666"}}>
                    KT | KT그룹희망나눔재단
                    </span>
                </SubContainer>
                </Miniontainer>
            </Container>
        </div>
    );
}

export default Footer;