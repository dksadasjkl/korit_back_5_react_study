/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../configs/firebase/firebaseConfig";
import { Line } from "rc-progress";
import { v4 as uuid } from "uuid"

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imageLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
    width: 300px;
    height: 300px;
    overflow: hidden;
    & > img {
        width: 100%;
    }
`;

function ImageEx() {
    const uploadFilesId = useRef(0); 
    const [ oldFiles, setOldFiles ] = useState([]);
    const [ newFiles, setNewFiles ] = useState([]);
    const imgFileRef = useRef();

    useEffect(() => {
        setOldFiles(!localStorage.getItem("oldFiles") ? [] : JSON.parse(localStorage.getItem("oldFiles")));
    }, []);

    const handleFileChange = (e) => {
        const loadFiles = Array.from(e.target.files);   // 객체를 배열에 담음 변환
        // [file, file, file]

        if(loadFiles.length === 0) {
            imgFileRef.current.value = "";
            return;
        }

        const uploadFiles = loadFiles.map(file => {
            return {
                id: uploadFilesId.current += 1,
                percent: 0,
                originFile: file,
                url: ""
            };
        });
        // [{ }, { }, { }]

        uploadFilesId.current = 0; // 다음생성을 위해 최기화
        


        let promises = [];

        // new Promise() 생성과 동시에 실행 -> 비동기화
        promises = uploadFiles.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();    
            //비동기
            fileReader.onload = (e) => {
                resolve(e.target.result);
            }

            fileReader.readAsDataURL(file.originFile);
        }));
        
        Promise.all(promises)   // 프로미스에서 resolve가 모두 끝난 후 배열에 담음
        // [Promise, Promise, Promise]
        .then(result => {
            setNewFiles(result.map((dataUrl, index) => {
                return {
                    ...uploadFiles[index],
                    preview: dataUrl
                };
                // 0(1), 1(2), 3(3)
                // preview : url
            }));
        });        
    }

     // for(let file of e.target.files) {
        //     promises = [...promises, new Promise((resolve) => {
        //         const fileReader = new FileReader();

        //         fileReader.onload = (e) => { //비동기
        //             resolve(e.target.result);
        //         }
        //         fileReader.readAsDataURL(file);
        //     })];
        // }
    // ref(해당 storage, 파일명 )
    console.log(newFiles)
    const handleImageUpload = () => {
        
        const promises = newFiles.map(file => new Promise(resolve => {
            const storageRef = ref(storage, `files/test/${uuid()}_${file.originFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file.originFile);
            
            // 업로드 될때
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setNewFiles(newFiles.map(sFile => {
                        return sFile.id !== file.id ? sFile : {
                            ...sFile, 
                            percent: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        }
                    }));
                },
                (error) => {},
                () => {
                    getDownloadURL(storageRef)
                    .then(url => {
                        const newFile = {
                            ...file,
                            ["url"]: url
                        }
                        resolve(newFile);
                    })
                }
            );
        }));

       
        Promise.all(promises)
        .then((newFile) => {
            setOldFiles(newFile);
            localStorage.setItem("oldFiles", JSON.stringify(newFile));
        }).then(() => {
            setNewFiles([]);
        });
    }

    
    return (
        <div css={layout}>
            {oldFiles?.map(file => 
                <div key={file.id} css={imageLayout}>
                    <img src={file.url} alt="" />
                </div>
            )}
            {newFiles?.map(file => 
                <>
                    <div key={file.id} css={imageLayout}>
                        <img src={file.preview} alt="" />
                    </div>
                    <Line percent={file.percent} strokeWidth={4} strokeColor={"#dbdbdb"}/>
                </>
            )}
            
            <input style={{display: "none"}} type="file" multiple={true} ref={imgFileRef} onChange={handleFileChange}/>
            <button onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
            <button onClick={handleImageUpload}>이미지 업로드</button>
        </div>
    );
}

export default ImageEx;