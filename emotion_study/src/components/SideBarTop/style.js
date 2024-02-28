import { css } from "@emotion/react";

export const topLayout = (isShow) => css`
    box-sizing: border-box;
    position: fixed;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    top: ${ isShow ? "0" : "-80px" };
    right: 0;

    z-index: 99;
    transition: top 0.5s ease-in-out;

    border-radius: 10px;
    border: 1px solid #00000055;
    width: 960px;
    height: 80px;

    background-color: white;
`;



export const toggleButton = css`
    box-sizing: border-box;

    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 79px;
    right: 2%;

    border: 1px solid #dbdbdb;
    padding: 5px 10px ;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
    background-color: white;
    &:hover {
        background-color: #dbdbdb;
    }
    &:active {
        background-color: #eee;
    }
`;

export const ulList = css`
    display: flex;
    justify-content: center;
    align-items: center;

`;

export const liList = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black;
    
    font-weight: 1000;
    font-size: 12px;
    width: 125px;
    height: 50px;
    border: 1px solid #dbdbdb;
    margin-right: 10px;
    
    border-radius: 10px;
    &:hover {
        background-color: #dbdbdb;
    }
    &:active {
        background-color: #eee;
    }
`;






