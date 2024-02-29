/** @jsxImportSource @emotion/react */
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import * as S from "./style";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MENUS } from "../../constants/menu";

// vscode-styled-components -> extansion
// https://im-designloper.tistory.com/77 -> reset
// https://www.npmjs.com/ -> npm
// https://react-icons.github.io/react-icons/ -> icons
// https://www.daleseo.com/emotion/ -> emotion 다운


function SideBar(props) {
    
    const [ isShow, setShow ] = useState(false);

    return (
        <aside css={S.layout(isShow)}>
           <button css={S.toggleButton} onClick={() => setShow(!isShow)}>
            { isShow ? <FaCaretLeft /> : <FaCaretRight /> }
            </button>
            <ul css={S.menuList}>
                { MENUS.map(menu => 
                    <Link css={S.menuItem} 
                        to={`${menu.path}${!menu.parms ? "" : "?" + Object.entries(menu.parms).map(([key, value]) => key + "=" + value).join("&")} `} 
                        key={menu.id} 
                        onClick={() => setShow(false)}>
                        <li>{menu.name}</li>
                    </Link>)
                }
            </ul>
            
        </aside>
    );
}

export default SideBar;