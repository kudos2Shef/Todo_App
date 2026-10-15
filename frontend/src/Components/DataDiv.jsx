import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './data.css'
import URL from '../Api/URL';
import Cross from '../assets/icon-cross.svg'
import Footer from './Footer'
import { toast } from 'react-toastify';

export default function DataDiv({ currentMode, todo, count, onRefresh, loading, colors }) {


    const [desc, setDesc] = useState(''); // set desc when adding new task/todo
    const [color, setColor] = useState(colors); // set list tags color
    const navigate = useNavigate();

    // onClick function on key = enter and target value >0 create new todo/task  save in DB .
    // Give Notification on successfull creation of todo/task.
    function setDescription(e) {
        console.log('e', e, ' e.target.value ', e.target.value);
        let val = e.target.value;
        if (e.key == 'Enter' && val.length > 0) {
            setDesc(val);
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
                    toast.success(data,{
                        position:'top-center',
                        autoClose:3000,// for 2seconds 
                        theme:'colored'
                    });
                    //
                    e.target.value = '';
                    setDesc('')
                    onRefresh();

                });
        }
    }


    /* onChange function on checkbox checked/unchecked update the status is_active 
       to true or false with respect to id. */
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
                onRefresh();
            })

    }

    /* onKeyDown function on target value empty set to previous desc value when key=enter 
       else update the single todo/task desc by id only when key = enter and target value>0 
       Give Notification on successfull updation of todo/task description.*/
    function updateDesc(e, id, prevDesc) {
        let val = e.target.value;
        console.log('val1', val, ' length ', val.length);
        console.log('id', id);
        if (e.key == 'Enter' && val.length > 0) {
            e.preventDefault();
            const formData = new FormData();
            formData.append('id', id);
            formData.append('desc', val);
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
                    onRefresh();
                     // add or call toast container
                    toast.success(data,{
                        position:'top-center',
                        autoClose:3000,// for 2seconds 
                        theme:'colored'
                    });
                    //
                })
        }
        /*else if(e.key=='Backspace' && val.length==0){
            console.log('backspace prevDesc ',prevDesc);
            setDesc(prevDesc);
            onRefresh();

        }*/
        else if (e.key == 'Enter' && val.length == 0) {
            console.log('enter prevDesc ', prevDesc);
            setDesc(prevDesc);
            e.target.value = prevDesc;
        }

    }

    // navigate to active tag and fetch all active todo/task i.e. is_active=true;
    function active() {
        navigate('/todo/active');
    }

    // navigate to all tag and fetch all todo/task i.e. is_active either false or true;
    function all() {
        navigate('/todo/all');
    }

    // navigate to completed tag and fetch all completed todo/task i.e. is_active=false;
    function completed() {
        navigate('/todo/completed');
    }

    // clear all completed todo/task i.e. is_active = false.
    // Give Notification on successfull deletion of completed todo/task.;

    function clearCompleted() {
        fetch(`${URL}/delete`, {
            method: 'DELETE'
        })
            .then((res) => {
                console.log('res', res);
                return res.text();
            }).then((data) => {
                console.log('data', data);
                // navigate('/todo/all'); // navigate does not refresh in sam epage
                onRefresh();
                 // add or call toast container
                    toast.success(data,{
                        position:'top-center',
                        autoClose:3000,// for 2seconds 
                        theme:'colored'
                    });
                    //

            })
    }

    // clear single todo/task based on id
    function clearIdWise(e, id) {
        console.log(e, ' id ', id);

        fetch(`${URL}/clearIdWise/${id}/clear`, {
            method: 'DELETE'
        })
            .then((res) => {
                console.log('res', res);
                return res.text();
            }).then((data) => {
                console.log('data', data);
                onRefresh();
                 // add or call toast container
                    toast.success(data,{
                        position:'top-center',
                        autoClose:3000,// for 2seconds 
                        theme:'colored'
                    });
                    //
            })
    }


    // onchange function on empty val set to previous desc

    function checkDescription(prevDesc, e) {
        const val = e.target.value;
        console.log('val ', val, ' prevDesc ', prevDesc);
        if (val.length != 0) {
            setDesc(val);
        }
        else {
            setDesc(prevDesc);
        }
    }

    // onclick function on empty val when clicked sset to previous desc

    function setEmptyDesc(prevDesc, e) {
        const val = e.target.value;
        console.log('val', val);
        if (val.length == 0) {
            setDesc(prevDesc);
            e.target.value = prevDesc;
        }
    }

    return (
        <div>
            <div className={currentMode ? 'topOne darkTopOne' : 'topOne lightTopOne'}>
                <div className={currentMode ? 'rad darkRad' : 'rad lightRad'}>
                    <div className='brdr gradient'>
                        <input type='checkbox' name='radio_desc' className='status' />
                    </div>
                </div>
                <input type='text' className={currentMode ? 'desc darkText' : 'desc lightText'} name='desc' onKeyDown={(e) => setDescription(e)} placeholder='Create a new todo...' onChange={(e) => setDesc(e.target.value)} />
                <img className='cross' />

            </div>

            <div className='bottom'>

                <div id='showList' className={currentMode ? 'darkList' : 'lightList'}>


                    {!loading && todo.map((data) => (

                        <div key={data.id} className={currentMode ? 'top darkTop' : 'top lightTop'}>
                            <div className={currentMode ? 'rad darkRad' : 'rad lightRad'} >
                                <div className={data.active ? 'brdr gradient' : 'brdr'}>
                                    <input type='checkbox' name='radio_desc' onChange={(e) => updateStatus(e, data.id)} className={!data.active ? 'status ' : 'status checked'} checked={!data.active} />
                                </div>
                            </div>
                            {/* <input type='text' className={`${currentMode?'desc darkText':'desc lightText'} ${data.active?'':'strike'}`} value={data.desc} name='desc' onKeyDown={(e)=>setDescription(e)} readOnly placeholder='Create a new todo...' /> */}
                            <input type='text' className={`${currentMode ? 'desc darkText' : 'desc lightText'} ${data.active ? '' : 'strike'}`}
                                defaultValue={data.desc} name='desc' readOnly={!data.active} onChange={(e) => checkDescription(data.desc, e)} onClick={(e) => setEmptyDesc(data.desc, e)}
                                onKeyDown={data.active ? (e) => updateDesc(e, data.id, data.desc) : undefined} placeholder='Create a new todo...' required />

                            <img className='cross' src={Cross} onClick={(e) => clearIdWise(e, data.id)} />
                        </div>
                    ))}
                </div>
                {!loading && (
                    <div className={currentMode ? 'lastBox darkBox' : 'lastBox lightBox'}>
                        <p className='time'>{count} items left</p>
                        <ul className='ls'>
                            <li className={color === 'all' ? 'currElem' : ''} onClick={() => { setColor('all'); all(); }}>All</li>
                            <li className={color === 'active' ? 'currElem' : ''} onClick={() => { setColor('active'); active(); }}>Active</li>
                            <li className={color === 'completed' ? 'currElem' : ''} onClick={() => { setColor('completed'); completed(); }}>Completed</li>
                        </ul>
                        <p className='clear' onClick={clearCompleted}>Clear Completed</p>
                    </div>
                )}
            </div>
            {!loading && (<Footer currMode={currentMode} />)}

        </div>
    )
}
