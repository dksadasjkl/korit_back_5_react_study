import logo from './logo.svg';
import './App.css';
import ReactQuill from 'react-quill';
import { useMemo, useState } from 'react';

// npm uninstall -g create-react-app (리액트 앱 제거)
// npm install -g create-react-app (리액트 앱 재설치)
// npx create-react-app [app-name] (리액트 앱 실행)s


function App() {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']                                         // remove formatting button
    ]

  }
  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");

  const handleTitieChange = (e) => {
    setTitle(() => e.target.value);
  }
  console.log(title)
  const handleQuillChange = (value) => {
    setContent(() => value);
  }
  console.log(content);

  return (
    <>
    <input type="text" onChange={handleTitieChange} />
    <ReactQuill modules={modules} onChange={handleQuillChange}/>
    </>
  );
}

export default App;
