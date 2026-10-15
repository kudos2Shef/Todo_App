import React, { useEffect, useState } from 'react'
import './data.css'
import URL from '../Api/URL';
import Cross from '../assets/icon-cross.svg'
import DataDiv from './DataDiv';
import { useOutletContext } from 'react-router-dom';


export default function DataAll() {
    const { currentMode } = useOutletContext();
    const [desc, setDesc] = useState('');
    const [todo, setTodo] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        all();

    }, [])

    function all() {
        setLoading(true);
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

            }).finally(() => { setLoading(false) });

        console.log('loading', loading);
    }


    return (


        <DataDiv currentMode={currentMode} todo={todo} count={count} onRefresh={all} loading={loading} colors='all' />


    )
}
