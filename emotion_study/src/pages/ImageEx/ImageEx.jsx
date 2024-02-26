/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState } from "react";



const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    `;

const imageLayout = css`

`;

function ImageEx(props) {
    const [ preview, setPreview ] = useState([]);
    const imgFileRef = useRef();

    const handleImageButton = () => {
        imgFileRef.current.click();
    }
    
    const handleImageChange = (e) => {
        const fileReader = new FileReader();
        if(e.target.files.length === 0 ) {
            return;
        }

        fileReader.onload = (e) => {
            setPreview(e.target.result);
        };
    
        
        for (let i = 0; i < fileReader.length; i++) {
            fileReader.readAsDataURL(e.target.files[i]);
        }
        // 파일 업로드를 눌렀을때 초기화가 일어나서?
    }

    return (
        <div css={layout}>
            <div css={imageLayout}>
                <img src={preview} alt="" />
            </div>
            <div css={imageLayout}>
                <img src={preview} alt="" />
            </div>
            <div css={imageLayout}>
                <img src={preview} alt="" />
            </div>
            <input style={{display: "none"}} type="file" multiple={true} ref={imgFileRef} onChange={handleImageChange} />
            <button onClick={handleImageButton}>이미지불러오기</button>
        </div>
    );
}

export default ImageEx;