import { AtomicBlockUtils, convertFromRaw, convertToRaw, Editor, EditorState, RichUtils } from 'draft-js';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Attachment, FormatBold, FormatItalic, ImageOutlined } from '@material-ui/icons';
import FileBlock from './FileBlock';
import { useLocalStorage } from './localStorage';

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
    media = <ImageBlock src={src} />;
  } 
  else if (type === "file") {
    media = <FileBlock />;
  }
  return media;
}

export default function MyEditor() {
  
  const timeoutID = useRef(0)
  const [rawContent, setRawContent] = useLocalStorage('Content', null)
  const [editorState, setEditorState] = useState(() => {
    if (rawContent) {
      const content = convertFromRaw(rawContent)
      return EditorState.createWithContent(content);
    }
    else {
      return EditorState.createEmpty();
    }
  });

  // 防抖 save
  useEffect(() => {
    clearTimeout(timeoutID.current); // clear previous settimeout
    timeoutID.current = setTimeout(() => {
      const content = editorState.getCurrentContent();
      setRawContent(convertToRaw(content))
      console.log('Document Saved!')
    }, 2000);

  }, [editorState])

  // keyboard controll
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  // button controll
  const toggleStyle = (type) => {
    const newState = RichUtils.toggleInlineStyle(editorState, type);
    setEditorState(newState);
  };

  const addImage = (event) => {
    // get img src
    const {target: { files }} = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const src = finishedEvent.currentTarget.result
      // create entity
      addMedia("image", src)
    };
    reader.readAsDataURL(theFile);
  };

  const addMedia = (type, src) => {
    const entity = editorState
      .getCurrentContent()
      .createEntity(type, "IMMUTABLE", { src });
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entity.getLastCreatedEntityKey(),
      " "
    );
    setEditorState(newEditorState);
  };

  return(
    <>
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

        <ToolBTN onClick={() => addMedia("file", null)}>
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
    </>
  );
}

//============= Styled Component =================
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

const Title = styled.input`
  height: 30px;
  font-size: 20px;
  outline: none;
  border: none;
  margin: 5rem 0 1rem 0;
`;


const ImageBlock = styled.img`
  width: 70%;
  height: auto;
`;

const MediaBlock = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const ToolBar = styled.div`
  /* background-color: coral; */
  display: flex;
  padding: 5px 0;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 1rem;
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
