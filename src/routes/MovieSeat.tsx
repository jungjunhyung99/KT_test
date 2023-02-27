import styled from "styled-components";
import {useEffect, useState} from "react";
import { makeImagePath } from "./utils";
import { stringify } from "querystring";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IAtomMovie, movieObj } from "./atom";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  width: 50vw;
  height: 110vh;

`;

const Footer = styled.div`
  display: flex;
  background-color:#666666;
  width: 100%;
  height: 10vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns  : repeat(3,30px);
  grid-template-rows: repeat(6,30px);
  margin-top: 5vh;
  margin-right: 3vw;
`;

const LargeGrid = styled.div`
  display: grid;
  grid-template-columns  : repeat(6,30px);
  grid-template-rows  : repeat(8,30px);
  margin-top: 5vh;
  margin-right: 3vw;
  
`;

const Item = styled.div<{isActive: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.isActive ? "#2BB7B3": "#666666"};
    width: 30px;
    height: 30px;
    border: 2px solid white;
    cursor: pointer;
`;

const Body = styled.div`
  height: 100vh;
  display: flex;
  flex-direction:column;  
  justify-content: center;
`;

const CountButton = styled.button`
  font-size: 40px;
  width: 5vw;
  height: 5vh;
  border-radius: 20px;
  background-color: #666666;
  color: #fff;
  cursor: pointer;
`;

const Button = styled.button<{isActive:boolean}>`
    font-size: 25px;
    width: 30vw;
    padding: 7px 0;
    border-radius: 16px;
    background-color: ${(props) => props.isActive ? "#fc5858" : "#666666"};
    color: #fff;
    letter-spacing: -1px;
    border: none;
    margin: 0 auto;
    margin-bottom: 20px;
    cursor: ${(props) => props.isActive ? "pointer" :"default"};
`;


const Box = styled.div<{bgPhoto: string}>`
  display: flex;
  width: 13vw;
  height: 25vh;
  background-image:
  url(${(props) => props.bgPhoto});
  background-size: cover;
  margin: 10px;
`;

const Banner = styled.div<{bgPhoto: string}>`
height: 25vh;
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
padding: 60px;
background-image:
  url(${(props) => props.bgPhoto});
background-size: cover;
`;

const PosterImage=styled.img`
    width : 13.5rem;
    height : 20rem;
    padding : 1rem;
`;

const MovieName=styled.button`
  
  padding : 1rem 2rem;
  font-size : 20px;
  line-height: 2rem;
  background-color : ${props=>props.color};
  width:15rem;
height : 6rem;
`;



const MovieBox=styled.div`
    width:16rem;
    height:29rem;
    border : 0.2rem solid;
`;

const MovieContainer = styled.div`
  display:flex;
  flex-direction: column;
`;

interface IGetMoives{
  dates:{
    maximum: string;
    minimum: string;
  }
  page: number;
  results: IMovie[];
  total_page: number;
  total_results: number;
}

interface ISeat {
  clicked: boolean;
  seat_num: string;  
}

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
}


function Seat(){
    const navigate = useNavigate();
    const [movieRecoil,setMovieRecoil] = useRecoilState<IAtomMovie>(movieObj);
    const [movies, setMovies] = useState<IGetMoives>();
    const [person, setPerson] = useState(1);
    const [num, setNum] = useState(1);
    const [seat1, setSeat1] = useState<ISeat[]>([]);
    const [seat2, setSeat2] = useState<ISeat[]>([]);
    const [seat3, setSeat3] = useState<ISeat[]>([]);
    const makeArray = (num: number) => {
      const arr:ISeat[] = [];
      if(num == 1){
        for(let i = 0; i < 18; i++){
        arr.push({clicked:false,seat_num:"a26"});
      }
      setSeat1(arr);
    }
      else if(num == 2){
        for(let i = 18; i < 72; i++){
        arr.push({clicked:false,seat_num:"a26"});
      }
      setSeat2(arr);
    }
      else if(num == 3){
        for(let i = 72; i < 90; i++){
        arr.push({clicked:false,seat_num:"a26"});
      }
      setSeat3(arr);
    }

};

    const seatClick = (index:number, seatnum:number) => {
      let RealSeat: ISeat[];
      let RealSeat2: ISeat[];
      let RealSeat3: ISeat[];
      if(seatnum == 1){
        RealSeat = JSON.parse(JSON.stringify(seat1));
        if(num == 0) {
          if(RealSeat[index].clicked === true){
            RealSeat[index].clicked = !RealSeat[index].clicked;
            setSeat1(RealSeat);
            setNum(num + 1);
          }
          return ;
        }
        RealSeat[index].clicked = !RealSeat[index].clicked;
        if(RealSeat[index].clicked === true){
          setNum(num - 1);
        }
        else{
          if(num <= 0) return;
          setNum(num + 1);
        }
        setSeat1(RealSeat);
      }
      if(seatnum == 2){
        RealSeat2 = JSON.parse(JSON.stringify(seat2));
        if(num == 0) {
          if(RealSeat2[index].clicked === true){
            RealSeat2[index].clicked = !RealSeat2[index].clicked;
            setSeat2(RealSeat2);
            setNum(num + 1);
          }
          return ;
        }
        RealSeat2[index].clicked = !RealSeat2[index].clicked;
        if(RealSeat2[index].clicked === true){
          setNum(num - 1);
        }
        else{
          if(num <= 0) return;
          setNum(num + 1);
        }
        setSeat2(RealSeat2);
      }
      if(seatnum == 3){
        RealSeat3 = JSON.parse(JSON.stringify(seat3));
        if(num == 0) {
          if(RealSeat3[index].clicked === true){
            RealSeat3[index].clicked = !RealSeat3[index].clicked;
            setSeat3(RealSeat3);
            setNum(num + 1);
          }
          return ;
        }
        
        RealSeat3[index].clicked = !RealSeat3[index].clicked;
        if(RealSeat3[index].clicked === true){
          setNum(num - 1);
        }
        else{
          setNum(num + 1);
        }
        setSeat3(RealSeat3);
      }
    };

    const nextPress = (num : number) => {
      setMovieRecoil({title:movieRecoil.title, time:movieRecoil.time, seat:num})
      navigate("/Menu/home/hard/cgv/result");
    }

    const plusPress = () => {
      setPerson(person+1);
      
    }

    
    const minusPress = () => {
      if(person === 1 ) return;
      setPerson(person-1);
    }

    const getMovies = async () => {
      const json = await (
        await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=1e1dd98e7bbdb858a49359dbec86444f`
        )
        
      ).json();
      setMovies(json);
    console.log(json);
    };

    useEffect(() => {
      getMovies();
      makeArray(1);
      makeArray(2);
      makeArray(3);
      setNum(person);
    }, [person] );
    
    return (
        <Container
        initial={{opacity: 0}}
            animate={{opacity: 1, transition:{
                duration: 0.5,
                delay: 0.2,
            }}}
            exit={{opacity: 0}}>
          <Body>
                
            <Banner bgPhoto={makeImagePath(movies?.results[5].backdrop_path || "")}/>
            
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
              <h2>인원수를 정한 후 자리를 지정해주세요</h2>
              <div style={{display:"flex",justifyContent:"center", alignItems:"center",}}>
              <CountButton onClick={minusPress}>-</CountButton>
              <h2 style={{fontSize:"50px", margin: "0 10vw"}}>{person}</h2>
              <CountButton onClick={plusPress}>+</CountButton>
              </div>
            </div>
            <div style={{display:"block", margin:"0 auto", border:"3px solid white",width:"70%", marginTop:"20px"}}><h3>screen</h3></div>
            <div style={{display:"flex",height:"80%",justifyContent:"center"}}>
            <Grid>
                {seat1.map((num,index) => <Item onClick={()=>seatClick(index,1)} isActive={num.clicked}>{num.seat_num}</Item>)}
            </Grid>
            <LargeGrid>
                {seat2.map((num,index) => <Item onClick={()=>seatClick(index,2)} isActive={num.clicked}>{num.seat_num}</Item>)}
            </LargeGrid>
            <Grid>
                {seat3.map((num,index) => <Item onClick={()=>seatClick(index,3)} isActive={num.clicked}>{num.seat_num}</Item>)}
            </Grid>
            </div>
            {num === 0 ? <Button onClick={() => nextPress(person)} isActive={num === 0}>예약하기</Button> : <Button isActive={false} >좌석을 선택해주세요</Button> }
            
          </Body>
          <Footer/>
        </Container>
    );
}

export default Seat;