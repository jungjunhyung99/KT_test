import React from 'react';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Menu from "./routes/Menu";
import Home from "./routes/Home"
import Chart from './routes/Chart';
import Choice from './routes/Choice';
import MiddleChoice from './routes/MiddleChoice';
import EasyChoice from './routes/EasyChoice';
import HardChoice from './routes/HardChoice';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { createGlobalStyle } from 'styled-components';
import { RecoilRoot } from 'recoil';
import Game from './routes/Game';
import Explain2 from './routes/Explain2';
import Cafe from './routes/Cafe';
import Sample from './routes/Sample';
import TakeOut from './routes/TakeOut';
import Game2 from './routes/Game2';
import Intro1 from './routes/intro/Intro1';
import Movie from './routes/Movie';
import Payment from './routes/Payment';
import OneToFifty from './routes/NumberGame';
import Intro2 from './routes/intro/intro2';
import Intro3 from './routes/intro/intro3';
import Introduce from './routes/introduce';
import MovieMain from './routes/MovieMain';
import MovieWhen from './routes/MovieWhen';
import Seat from './routes/MovieSeat';
import MovieResult from './routes/MovieResult';
import Hamburger from './routes/Hamburger';
import Hamburger_main from './routes/Hamburger_main';
import Hamburger_take from './routes/Hamburger_take';
import Hamburger_choice from './routes/Hamburger_choice';
import Hamburger_quantity from './routes/Hamburger_quantity';
import Hamburger_last from './routes/Hamburger_last';
import { AnimatePresence } from 'framer-motion';
import Cafe_result from './routes/Cafe_result';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Hamburger_result from './routes/Hamburger_result';




const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  color: black;
  line-height: 1.2;
  background-color: black;
}
a {
  text-decoration:none;
  color:inherit;
}
`;



function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>
        KT IT 서포터즈</title>
      </Helmet>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
      <AnimatePresence>
      <Router>
        <Routes>
          <Route path="/" element={<Menu/>}>
          </Route>
          <Route path="/Menu" element={<Menu/>}>
          <Route path="/Menu/intro/:id" element={<Intro1/>}/>
          <Route path="/Menu/home/introduce" element={<Introduce/>}/>
           
            <Route path="/Menu/explain" element={<Explain2/>}>
            </Route>
            <Route path="/Menu/gamechoice" element={<Game/>}>
            </Route>
              <Route path="/Menu/gamechoice/game" element={<Game2/>}/>
              <Route path="/Menu/gamechoice/numberGame" element={<OneToFifty/>}/>
            <Route path="/Menu/test" element={<Sample/>}/>
              <Route path="/Menu/home" element={<Choice/>}>
              <Route path="/Menu/home/easy" element={<EasyChoice/>}/>
              <Route path="/Menu/home/middle" element={<MiddleChoice/>}/>
              <Route path="/Menu/home/hard" element={<HardChoice/>}>
              <Route path="/Menu/home/hard/:objId" element={<Menu/>}/>
              </Route>
                <Route path="/Menu/home/hard/cafe" element={<Explain2/>}>
                <Route path="/Menu/home/hard/cafe/payment" element={<Payment/>}/>
                <Route path="/Menu/home/hard/cafe/result" element={<Cafe_result/>}/>
              </Route>
                <Route path="/Menu/home/hard/cgv" element={<Movie/>}>
                <Route path="/Menu/home/hard/cgv/main" element={<MovieMain/>}/>
                <Route path="/Menu/home/hard/cgv/when" element={<MovieWhen/>}/>
                <Route path="/Menu/home/hard/cgv/seat" element={<Seat/>}/>
                <Route path="/Menu/home/hard/cgv/result" element={<MovieResult/>}/>
              </Route>
              <Route path="/Menu/home/hard/hamburger" element={<Hamburger/>}>
                <Route path="/Menu/home/hard/hamburger/main" element={<Hamburger_main/>}/>
                <Route path="/Menu/home/hard/hamburger/take" element={<Hamburger_take/>}/>
                <Route path="/Menu/home/hard/hamburger/choice" element={<Hamburger_choice/>}>
                  <Route path="/Menu/home/hard/hamburger/choice/quantity" element={<Hamburger_quantity/>}/>
                </Route>
                <Route path="/Menu/home/hard/hamburger/last" element={<Hamburger_last/>}/>
                <Route path="/Menu/home/hard/hamburger/result" element={<Hamburger_result/>}/>
              </Route>
              </Route>
          </Route>
        </Routes>
        </Router>
        </AnimatePresence>
        </ThemeProvider>
        </RecoilRoot>
        </HelmetProvider>
      );
}

export default App;
