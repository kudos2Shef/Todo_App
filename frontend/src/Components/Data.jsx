import React, { useEffect, useState } from 'react'
import './data.css'
import URL from '../Api/URL';
import Cross from '../assets/icon-cross.svg'


export default function Data({ currentMode }) {

    const [desc, setDesc] = useState('');
    const [todo, setTodo] = useState([]);
    const [count, setCount] = useState(0);
    function setDescription(e) {
        console.log(e.target.value);
        console.log(e);
        if (e.key == 'Enter') {
            setDesc(e.target.value);
            console.log('desc', desc);

            let jsonData = {
                desc: desc
            }

            fetch(`${URL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
                .then((res) => {
                    console.log('res', res);
                    return res.text();
                })
                .then((data) => {
                    console.log('data', data);
                    // add or call toast container
                    e.target.value = '';
                    setDesc('')
                    all();

                });


        }
    }

    useEffect(() => {
        all();

    }, [])

    function all() {
        console.log('function all running');

        console.log('url', URL);

        fetch(`${URL}/retrieve`)
            .then((res) => {
                console.log('res', res);
                return res.json();
            })
            .then((data) => {

                console.log('data', data);
                // add or call toast container
                setTodo(data);
                setCount(data.length);
                // window.location.reload();

            });


    }

    function updateStatus(e, id) {
        let checkedVal = e.target.checked;
        console.log('checked', checkedVal);
        console.log('id', id);
        const formData = new FormData();
        formData.append('id', id);
        formData.append('isActive', checkedVal ? false : true);
        console.log('formData', formData);
        fetch(`${URL}/update`,
            {
                method: 'PUT',
                body: formData
            }).then((res) => {
                console.log('res', res);
                return res.text();
            })
            .then((data) => {
                console.log('data', data);
                all();
                // window.location.reload();
            })

    }
    function active() {
        console.log('function active running');
        fetch(`${URL}/active`)
            .then((res) => {
                console.log('res');
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setTodo(data);
                // all();
            })
    }

    function clearCompleted() {
        fetch(`${URL}/delete`, {
            method: 'DELETE'
        })
            .then((res) => {
                console.log('res', res);
                return res.text();
            }).then((data) => {
                console.log('data', data);
                all();
            })
    }
    function completed() {
        console.log('function active running');
        fetch(`${URL}/completed`)
            .then((res) => {
                console.log('res');
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setTodo(data);
                // window.location.reload();

            });
    }

    function clearIdWise(e, id) {
        console.log(e);
        console.log(id);

        fetch(`${URL}/clearIdWise/${id}/clear`, {
            method: 'DELETE'
        })
            .then((res) => {
                console.log('res', res);
                return res.text();
            }).then((data) => {
                console.log('data', data);
                all();
                //    window.location.reload();
            })
    }


    return (
        <div>
            <div className={currentMode ? 'topOne darkTopOne' : 'topOne lightTopOne'}>
                <div className={currentMode ? 'rad darkRad' : 'rad lightRad'}>
                    <input type='checkbox' name='radio_desc' className='status' />
                </div>
                <input type='text' className={currentMode ? 'desc darkText' : 'desc lightText'} name='desc' onKeyDown={(e) => setDescription(e)} placeholder='Create a new todo...' onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div className='bottom'>

                <div id='showList' className={currentMode ? 'darkList' : 'lightList'}>
                    {/*{(()=>{
            const result=[];
            for(let i=0;i<10;i++){
                result.push(
           <div className={currentMode?'top darkTop':'top lightTop'}>
          <div className={currentMode?'rad darkRad':'rad lightRad'}>
        <input type='checkbox' name='radio_desc'  className='status'/>
        </div>
        <input type='text' className={currentMode?'desc darkText':'desc lightText'} name='desc' onKeyDown={(e)=>setDescription(e)} placeholder='Create a new todo...' />
        </div>);
        }
        return result;}
        )()}
            */}

                    {todo.map((data) => (

                        <div key={data.id} className={currentMode ? 'top darkTop' : 'top lightTop'}>
                            <div className={currentMode ? 'rad darkRad' : 'rad lightRad'} >
                                <input type='checkbox' name='radio_desc' onChange={(e) => updateStatus(e, data.id)} className={!data.active ? 'status ' : 'status checked'} checked={!data.active} />
                            </div>
                            <input type='text' className={`${currentMode ? 'desc darkText' : 'desc lightText'} ${data.active ? '' : 'strike'}`} value={data.desc} name='desc' onKeyDown={(e) => setDescription(e)} readOnly placeholder='Create a new todo...' />
                            <img className='cross' src={Cross} onClick={(e) => clearIdWise(e, data.id)} />
                        </div>
                    ))}
                </div>

                <div className={currentMode ? 'lastBox darkBox' : 'lastBox lightBox'}>
                    <p className='time'>{count} items left</p>
                    <ul className='ls'>
                        <li onClick={all}>All</li>
                        <li onClick={active}>Active</li>
                        <li onClick={completed}>Completed</li>
                    </ul>
                    <p className='clear' onClick={clearCompleted}>Clear Completed</p>
                </div>
            </div>
        </div>
    )
}
