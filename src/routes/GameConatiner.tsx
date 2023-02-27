import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { probState } from "../atom";

const GameBoard = styled.div`

`;

function GameContainer() {
    const [prob, setProb] = useRecoilState(probState);
    const [realProb,setReal]= useState(prob);
    return (<GameBoard>

    </GameBoard>
    );
}
