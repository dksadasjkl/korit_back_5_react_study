import BoardList from "../pages/BoardList/BoardList";
import BoardWrite from "../pages/BoardWrite/BoardWrite";
import ImageEx2 from "../pages/ImageEx2/ImageEx2";
import ImageEx3 from "../pages/ImageEx3/ImageEx3";
import Mypage from "../pages/Mypage/Mypage";

export const MENUS = [
    {
        id: 1,
        path: "/mypage",
        name: "마이페이지",
        element: <Mypage />
    },
    {
        id: 2,
        path: "/board",
        name: "게시글",
        element: <>게시판</>
    },
    {
        id: 3,
        path: "/notice",
        name: "공지사항",
        element: <>공지사항</>
    },
    {
        id: 4,
        path: "/image/ex2",
        name: "이미지 업로드(다중)",
        element: <ImageEx2 />
    },
    {
        id: 5,
        path: "/image/ex3",
        name: "이미지 불러오기(다중)",
        element: <ImageEx3 />
    },
    {
        id: 6,
        path: "/board/write",
        name: "게시글 작성",
        element: <BoardWrite />
    },
    {
        id: 7,
        path: "/board/list",
        parms: {
            page: 1
        },
        name: "게시글 목록",
        element: <BoardList />
    }
];