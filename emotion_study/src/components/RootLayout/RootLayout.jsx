/** @jsxImportSource @emotion/react */
import * as S from './style';

import React from 'react';

function RootLayout( { children } ) {
    return (
        <>
            <div css={S.backgroundLayout}></div>  
            <div css={S.layout}>
                { children }
            </div>
        </>
    );
}

export default RootLayout;