import React, { useEffect, useState } from 'react'
import './data.css'
import URL from '../Api/URL';
import Cross from '../assets/icon-cross.svg'
import DataDiv from './DataDiv';
import { useOutletContext } from 'react-router-dom';

export default function DataActive() {
    const { currentMode } = useOutletContext();

    const [desc, setDesc] = useState('');
    const [todo, setTodo] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        active();
    }, [])
    function active() {
        setLoading(true);
        console.log('function active running');
        fetch(`${URL}/active`)
            .then((res) => {
                console.log('res');
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setTodo(data);
                setCount(data.length);
            }).finally(() => { setLoading(false) })
    }

    return (


        <DataDiv currentMode={currentMode} todo={todo} count={count} onRefresh={active} loading={loading} colors='active' />


    )
}
