import { ImageOutlined } from '@material-ui/icons';
import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export default function App() {

  const handleBold = () => {
    // get user's selection
    let selObj = window.getSelection();

    if(selObj.type === 'Range') {
      // create <b> dom
      const boldTextDOM = document.createElement('b');
      // get str of selection, set as <b> html
      boldTextDOM.innerHTML = selObj.toString();

      const range = selObj.getRangeAt(0);
      range.deleteContents(); // Deletes selected text
      range.insertNode(boldTextDOM);
    }
  }

  const handleImage = (event) => {
    const selObj = window.getSelection();

    // Caret, Range are ok
    if(selObj.type !== 'None') {
      const {target: {files}} = event;
      const theFile = files[0];
  
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {currentTarget:{result}} = finishedEvent;
        document.getElementById("image_file").value = null;
        //============
        const imgDOM = document.createElement('img');  // create <img> dom
        imgDOM.src = result; // give file url as src

        const range = selObj.getRangeAt(0);
        range.deleteContents(); 
        range.insertNode(imgDOM);
        //============
      }
      reader.readAsDataURL(theFile);
    }
  }


  return (
    <>
    <GlobalStyle />
      <h1>Yujung's Text Editor</h1>
      <button onClick={handleBold}>Bold</button>
      <input id="image_file" type="file" accept="image/*" style={{display: "none"}} onChange={handleImage}/>
      <label htmlFor="image_file" style={{cursor: "pointer"}}>
        <ImageOutlined />
      </label>

      <SpanBlock>
        <Span contentEditable={true} />
      </SpanBlock>
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
    padding: 0 9rem;
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

const SpanBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: coral;
`;

const Span = styled.span`
  user-select: text;
  cursor: text;
  width: 100%;
  height: 100%;
  background-color: pink;
  display: block;
`;

