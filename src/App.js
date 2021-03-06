import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import MyEditor from './MyEditor';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header>
        <h1>Text Editor</h1>
        <SubmitBTN>Submit</SubmitBTN>
      </Header>
            
      <MainBox>
        <MyEditor />
      </MainBox>
    </>
  );
}

//===================== Styled Components =================
const GlobalStyle = createGlobalStyle`
  * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
  }

  body {
    user-select: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 1rem;
  }

  img {
    user-drag: none; 
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  border: 1px solid lightgrey;
  border-top: none;
  background: white;
`;

const SubmitBTN = styled.button`
  color: white;
  background-color: #1DA1F2;
  padding: 0.6rem 1rem;
  border-radius: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  outline: none;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px auto 0;
  width: 660px;
`;






