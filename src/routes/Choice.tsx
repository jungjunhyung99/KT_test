import styled from "styled-components";
import React, {Component} from "react";
import {
  Link,
  Routes,
  Route,
  useLocation,
  useParams,
  useMatch,
  Outlet,
} from "react-router-dom";

const Container = styled.div`
    margin-left: 7vw;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-weight: 800;
    &:focus, &hover, &:visited, &:link, &active{
        text-decoration: none;
    }
`;

function Choice () {
  const middleMatch = useMatch("/Menu/home/middle/*");
  const hardMatch = useMatch("/Menu/home/hard/*");
  const easyMatch = useMatch("/Menu/home/easy/*");
  return (
    <Container>
      <Outlet/>
    </Container>
  );
}

export default Choice;