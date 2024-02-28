/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useRef, useState } from 'react';

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imgLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 300px;
    height: 300px;
    overflow: hidden;

    & > img {
        width: 100%;
    }
`;

function ImageEx3() {
    const imgRef = useRef();
    const loadImageId = useRef(0);
    const [ loadImages, setLoadImages ] = useState([]);

    const handleChangeInput = (e) => {
        const loadFiles = Array.from(e.target.files);
        
        if(loadFiles.length === 0) {
            imgRef.current.value = "";
            return;
        }

        let promises = [];
        
        // Promise먼저 실행
        promises = loadFiles.map(file => new Promise((resolve) => {
            const loadImage = {
                id: loadImageId.current += 1,
                file,
                dataURL: ""
            }
            const fileReader = new FileReader();
    
            fileReader.onload = (e) => {
                resolve({
                    ...loadImage,
                    dataURL: e.target.result
                });
            } 

            fileReader.readAsDataURL(file);
        }))
        Promise.all(promises)
        .then(result => 
            setLoadImages(result));
    }
    
    return (
        <div css={layout}>
            {loadImages.map(loadImage => 
                 <div css={imgLayout} key={loadImage.id}>
                 <img src={loadImage.dataURL} alt={loadImage.file.name} />
             </div>
            )}
           
            <input type="file" style={{display: "none"}} multiple={true} ref={imgRef} onChange={handleChangeInput}/>
            <button onClick={() => imgRef.current.click()}>불러오기</button>
        </div>
    );
}

export default ImageEx3;