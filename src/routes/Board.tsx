import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

function Board({numbers, handleClick}: any){
    return (
        <Container>
            {numbers.map((num :number, index : number)=>(
                <Cell num={num} key={index} handleClick={handleClick}></Cell>
            ))}
        </Container>
    );
}

const Container=styled.div`
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-template-columns: repeat(5,1fr);
    
`;

export default Board;