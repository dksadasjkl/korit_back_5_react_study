import React, { useEffect, useRef, useState } from 'react';

function StudentArrayPage2(props) {
    const student = {
        id: "",
        name: "",
        score: ""
    };

    const [ studentList, setStudentList ] = useState([]);
    const [ inputValue, setInputValue ] = useState(student);
    const [ scoreData, setScoreData ] = useState({
        total: 0,
        avg: 0
    });

    const staticId = useRef(0);
    const staticScore = useRef(0);
    
    useEffect(() => {
        console.log(studentList);
    }, [studentList]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        });
    }

    const handleAddClick = () => {
        const student ={
            ...inputValue,
            id: staticId.current += 1  
        }
        setStudentList([...studentList, student]);
        setScoreData({
            total: staticScore.current += parseInt(inputValue.score),
            avg: (staticScore.current / student.id)
        })
    }

   

    return (
        <div>
            <div>
                <input type="text" name='id' disabled={true} value={inputValue.id} placeholder='ID'/>
                <input type="text" name='name' onChange={handleChangeInput} value={inputValue.name} placeholder='이름'/>
                <input type="text" name='score' onChange={handleChangeInput} value={inputValue.score} placeholder='점수'/>
                <button onClick={handleAddClick}>추가</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>점수</th>
                    </tr>
                </thead>
                <tbody>
                       {studentList.map(student => <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.score}</td>
                            </tr>
                       )}
                </tbody>
                <tfoot>
                        <tr>
                            <th>총점</th>
                            <th colSpan={2}>{scoreData.total}</th>
                        </tr>
                        <tr>
                            <th>평균</th>
                            <th colSpan={2}>{scoreData.avg.toFixed(2)}</th>
                        </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default StudentArrayPage2;