import { AtomicBlockUtils, Editor, EditorState, RichUtils } from 'draft-js';
import React from 'react';
import styled from 'styled-components';
import { Attachment, FormatBold, FormatItalic, ImageOutlined } from '@material-ui/icons';


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
  } 
  else if (type === "video") {
    media = <Video src={src} />;
  }

  return(
    <MediaBlock>
      {media}
    </MediaBlock>
  );
}

export default function MyEditor() {
  const [editorState, setEditorState] = React.useState(() =>
  EditorState.createEmpty());

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

  return(
    <>
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
    </>
  );
}

//============= Styled Component =================
const Image = styled.img`
  width: 70%;
  height: auto;
`;

const Video = styled.video`
  width: 100px;
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
