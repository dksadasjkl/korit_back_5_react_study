/** @jsxImportSource @emotion/react */
import * as S from './style';
import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MENUS } from '../../constants/menu';

// 1920 960
// 960 200 200 

function SideBarTop() {
    const [ isShow, setShow ] = useState(false);

    return (
        <aside css={S.topLayout(isShow)}>
           <button css={S.toggleButton} onClick={() => setShow(!isShow)}>
                { isShow ?  <FaCaretUp /> : <FaCaretDown />  }
             </button>
            <ul css={S.ulList}>
                { MENUS.map(menu => 
                    <Link css={S.liList} 
                    to={`${menu.path}${!menu.parms ? "" : "?" + Object.entries(menu.parms).map(([key, value]) => key + "=" + value).join("&")} `} 
                    key={menu.id} 
                    onClick={() => setShow(!isShow)}>
                        <li>{menu.name}</li>
                    </Link>)
                }
            </ul>
        </aside>
    );
}

export default SideBarTop;