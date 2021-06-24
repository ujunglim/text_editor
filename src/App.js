import React,{ useEffect, useState, useRef } from 'react';
import {AtomicBlockUtils, Editor, EditorState, RichUtils} from 'draft-js';
import { Attachment, FormatBold, FormatItalic, ImageOutlined } from '@material-ui/icons';
import styled, { createGlobalStyle } from 'styled-components';

// render component, define custom entity with component
function BlockRenderer(contentBlock) {
  const type = contentBlock.getType();
  if (type === "atomic") {
    return {
      component: Media,
      editable: false
    };
  }
}

// create custom component
function Media(props) {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;
  if (type === "image") {
    media = <Image src={src} />;
  } else if (type === "video") {
    media = <Video src={src} />;
  }
  return media;
}

export default function App() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleStyle = (type) => {
    const newState = RichUtils.toggleInlineStyle(editorState, type);
    setEditorState(newState);
  };

  const addImage = (event) => {
    // get img src
    const {
      target: { files }
    } = event;

    const theFile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // create entity
      const entity = editorState
        .getCurrentContent()
        .createEntity("image", "IMMUTABLE", {
          src: finishedEvent.currentTarget.result
        });
      // insert entity to editorState
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entity.getLastCreatedEntityKey(),
        " "
      );
      // rerender editorState
      setEditorState(newEditorState);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <h1 style={{marginBottom:"3rem"}}>Yujung Text Editor</h1>
      <Title type="text" placeholder="Write title at here" autoFocus />

      <ToolBar>
        <ToolBTN onClick={() => toggleStyle("BOLD")}>
          <FormatBold />
        </ToolBTN>
        <ToolBTN onClick={() => toggleStyle("ITALIC")}>
          <FormatItalic />
        </ToolBTN>

        <input id="image_file" type="file" accept="image/*" onChange={addImage} style={{display:"none"}} />
        <ToolBTN>
          <label htmlFor="image_file">
            <ImageOutlined />
          </label>
        </ToolBTN>

        <ToolBTN>
          <Attachment />
        </ToolBTN>
        
      </ToolBar>
      
      <Editor
        blockRendererFn={BlockRenderer}
        handleKeyCommand={handleKeyCommand}
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Enter some text..."
      />
    </AppContainer>
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

const AppContainer = styled.div`
  /* background: pink;  */
  display: flex;
  flex-direction: column;
  margin: 47px auto 0;
  width: 660px;
`;

const Title = styled.input`
  height: 50px;
  font-size: 30px;
  outline: none;
  border: none;
  margin: 1rem 0;
`;

const ToolBar = styled.div`
  /* background-color: coral; */
  display: flex;
  padding: 5px 0;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
`;

const ToolBTN = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: white;
  
  width: 30px;
  height: 30px;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: #E8F5FE;
    color: #1DA1F2;
  }
`;

const Image = styled.img`
  width: 100px;
  height: auto;
`;

const Video = styled.video`
  width: 100px;
  height: auto;
`;
