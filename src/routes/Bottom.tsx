import styled from "styled-components";

const Container = styled.footer`
    width: 100%;
`;

const LogoBox = styled.div`
    display:flex;
    flex-direction: column;
`

function Bottom() {
  return (
    <Container>
        <LogoBox>
            <img src="	http://itsupporters.com/theme/it/img/ft_logo.png" style={{width:"200px"}}/>
            <h2 style={{color:"#848484"}}>대표번호 1577-0080</h2>
        </LogoBox>
    </Container>
  );
}

export default Bottom;