import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;  
`;

const Button = styled.button`
 font-weight: bold;
  font-size: 15px;
  padding :15px 10px;
  background-color: #000;
  color:#bc5454;
  border: 1px solid rgb(210, 204, 193);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  &:hover{
  color :rgb(142, 26, 26);
  }
`;

function TopButton() {

    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })

    }
    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 500) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        console.log(window.scrollY)
        window.addEventListener("scroll", handleShowButton)
        return () => {
            window.removeEventListener("scroll", handleShowButton)
        }
    }, [])

    return (
        <Container>
            <Button onClick={scrollToTop}> Top</Button>
        </Container>
    )
}

export default TopButton;