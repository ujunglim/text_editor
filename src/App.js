import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

function App() {
  const [text, setText] = useState("")

  const textChange = (e) => {
    const {target: {value}} = e;
    setText(value);
  }

  const handleBold = () => {
    let selObj = window.getSelection();

    if(selObj.type === 'Range') {
      const boldText = document.createElement('b');
      boldText.innerHTML = selObj.toString();

      const range = selObj.getRangeAt(0);
      range.deleteContents(); // Deletes selected text
      range.insertNode(boldText);
    }
  }



  return (
    <>
      <h1>Yujung's Text Editor</h1>
      <button onClick={handleBold}>Bold</button>

      <SpanDiv>
        <Span contentEditable={true}>sdf</Span>
      </SpanDiv>
    </>
  );
}

export default App;

//===================== Styled Components =================
const SpanDiv = styled.div`
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
`;

