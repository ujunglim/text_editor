import { useEffect, useState, useRef } from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import { ImageOutlined } from '@material-ui/icons';
import styled, { createGlobalStyle } from 'styled-components';

function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  useEffect(() => {
    focusEditor()
  }, []);

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  const onBoldClick = ()=> {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  return (
    <>
      <button onClick={onBoldClick}>Bold</button>

      <div onClick={focusEditor} style={styles.editor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </>
  );
}

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};

export default function App() {
  return (
    <>
      <h1>Yujung Text Editor</h1>
      <MyEditor />
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

const Content = styled.div`
  background-color: lightblue;
`;

const ContentBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: pink;
  margin-bottom: 1em;

  display: flex;
  align-items: center;
`;

const Span = styled.span`
  user-select: text;
  cursor: text;
  width: 100%;
  height: 100%;
  display: block;
  /* display: flex;
  flex-direction: column; */
  outline: none;
`;

