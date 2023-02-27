import React, { useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import '../css/Explain.css';

function Explain() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
              }));      

    return (
        <div>
        <h1 className="explain1">키오스크 설명서</h1>
        
        <Box display="grid" gridTemplateColumns="repeat(20, 1fr)" gap={4}>
            <Box className="first" gridColumn="span 8"
                sx={{
                    width: 300,
                    height: 600,
                }}>  
                <Item>
                    <img src="/img/냐옹1.png" width={293} height={300}/>
                    <h3>사용법 1</h3>
                    먹고싶은 메뉴를 선택한다
                </Item>
            </Box>
            
            <Box className="second" gridColumn="span 8"
                sx={{
                    width: 300,
                    height: 600,
                }}>
                <Item>
                    <img src="/img/냐옹2.png" width={293} height={300}/>
                    <h3>사용법 2</h3>
                    먹고싶은 메뉴를 선택한다
                </Item>
            </Box>

            <Box className="third" gridColumn="span 8"
                sx={{
                    width: 300,
                    height: 600,
                }}>
                <Item>    
                    <img src="/img/냐옹3.png" width={293} height={300}/>
                    <h3>사용법 3</h3>
                    먹고싶은 메뉴를 선택한다
                </Item>
            </Box>

            <Box className="fourth" gridColumn="span 8"
                sx={{
                    width: 300,
                    height: 600,
                }}>
                <Item>
                    <img src="/img/냐옹4.png" width={293} height={300}/>
                    <h3>사용법 4</h3>
                    먹고싶은 메뉴를 선택한다
                </Item>
            </Box>
         </Box>
         <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
         <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
         <div className="slider-wrap">
        </div>
                </div>
    )
}

export default Explain;