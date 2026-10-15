import React, { useState } from 'react'
import './mode.css'
import sun from '../assets/icon-sun.svg'
import moon from '../assets/icon-moon.svg'
import { Outlet } from 'react-router-dom'

export default function Mode() {
  // const [mode,setMode]= useState(true);
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('mode');
    return savedMode == null ? true : savedMode == 'true';
  });


  return (
    <section className={mode ? 'dark' : 'light'}>
      <div className='box' id={mode ? 'dark_mode' : 'light_mode'}>
        <div className='content'>
          <div className='head'>
            <p>TODO</p>
            {/* <img src={mode?sun:moon} alt={mode?'sun':'moon'} id={mode?'sun':'moon'} onClick={()=>setMode(!mode)}/> */}
            <img src={mode ? sun : moon} alt={mode ? 'sun' : 'moon'} id={mode ? 'sun' : 'moon'}
              onClick={() => {
                setMode((prev) => {
                  const NewMode = !prev;
                  localStorage.setItem('mode', NewMode);
                  return NewMode;
                })
              }} />

          </div>
          {/* <div><Data currentMode={mode}/></div> */}
          <div><Outlet context={{ currentMode: mode }} /></div>

        </div>
      </div>
    </section>
  )
}

