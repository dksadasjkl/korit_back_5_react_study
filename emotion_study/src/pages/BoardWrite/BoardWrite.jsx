/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { QUILL_MODULES } from "../../constants/quillModules";
import { useMaxSizeValidateInput } from "../../hooks/InputHook";
import { useQuillInput } from "../../hooks/quillHook";
import { useNavigate } from "react-router-dom";

const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100px 120px;
    border: 1px solid #dbdbdb;
    padding: 50px 0px;
`;

const headerTitle = css`
    margin-bottom: 30px;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
`;

const boardTitle = css`
    box-sizing: border-box;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #ccc;
    padding: 10px;
    width: 90%;
`;
const submitButton = css`
 box-sizing: border-box;
    margin-top: 50px;
    border: 1px solid #ccc;
    padding: 10px;
    width: 90%;
    background-color: white;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #eee;
    }
`;

function BoardWrite() {
    const navigate = useNavigate();
    const boardIdRef = useRef(0);
    const [ board, setBoard ] = useState({
        boardId: 0,
        boardTitle: "",
        boardContent: ""
    });

    const boardList = useMemo(() => {
        const IsBoardList = localStorage.getItem("boardList");
        
        return !IsBoardList 
            ? [] 
            : JSON.parse(IsBoardList)
    }, []);
    
    const [ inputValue, handleInputChange ] = useMaxSizeValidateInput(10); // [0번, 1번] = [0번, 1번] 비구조할당
    const [ quillValue, handleQiillValueChange ] = useQuillInput();

    const handleSubmitClick = () => {
        const lastIndex = boardList.length - 1
        const lastId = lastIndex < 0 ? 0 : boardList[lastIndex].boardId;

        const board = {
            boardId: lastId + 1,
            boardTitle: inputValue,
            boardContent: quillValue
        };
        const newBoardList = [...boardList, board];
        localStorage.setItem("boardList", JSON.stringify(newBoardList)); //로컬스토리지에 덮어씀
        alert("글 작성 완료");
        navigate("/board/list");
        
    } 

    return (
        <div css={layout}>
            <h1 css={headerTitle}>글 작성하기</h1>
            <input 
                css={boardTitle} 
                type="text" 
                placeholder="제목을 입력하세요!!!" 
                onChange={handleInputChange}
                value={inputValue}/>
            <ReactQuill style={{
                width: "90%",
                height: "400px"
                }} 
                modules={QUILL_MODULES}
                onChange={handleQiillValueChange}
            />
            <button css={submitButton} onClick={handleSubmitClick}>작성하기</button>
        </div>
    );
}

export default BoardWrite;