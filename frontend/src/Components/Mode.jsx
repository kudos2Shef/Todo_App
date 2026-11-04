import React, { useState, useEffect } from 'react'
import './mode.css'
import sun from '../assets/icon-sun.svg'
import moon from '../assets/icon-moon.svg'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { toast } from 'react-toastify'
import URL from '../Api/URL';

export default function Mode() {
  // const [mode,setMode]= useState(true);
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('mode');
    return savedMode == null ? true : savedMode == 'true';
  });

  // useEffect(() => {
  //   toast.info('Mode component is mounted');
  // }, []);


  const [serverStatus, setServerStatus] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    let active = true;
    let timer;
    function checkServer() {
      fetch(`${URL}/health`)
        .then((res) => {
          console.log('res', res);

          if (!res.ok) {
            throw new Error('Server unavailable');
          }
          if (active) {
            console.log('Server is UP');
            setServerStatus(true);
          }
        })
        .catch((error) => {
          console.log('Server not available:', error);

          if (active) {
            setServerStatus(false);
            timer = setTimeout(checkServer, 5000);
          }
        })
    }
    checkServer();

    return () => {
      active = false;
      clearTimeout(timer);
    }

  }, []);

  useEffect(() => {
    if (serverStatus) {
      setElapsed(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000)

    return () => clearInterval(interval);
  }, [serverStatus])

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  useEffect(() => {
    const content = (<div className='contentVal'>
      <p >Connecting to server&nbsp;.&nbsp;.&nbsp;.</p>
      <p>Waiting Time: <span style={{ float: 'right' }}>{formatTime(elapsed)}</span></p>
    </div>);

    const styleTheme = mode ? {
      background: 'var(--Gray_300)',
      color: 'var(--Navy_950)',
      fontSize: '15px',
      filter: ' drop-shadow(0px 0px 15px hsl(220, 98%, 61%))'
    } : {
      background: 'var(--Navy_950)',
      color: 'var(--Gray_600)',
      fontSize: '15px',
      filter: ' drop-shadow(0px 0px 15px hsl(220, 98%, 61%))'
    };

    if (!serverStatus) {
      if (elapsed == 0) {
        // if (!toast.isActive('server-loader')) {
        toast.loading(
          content, {
          toastId: 'server-loader',
          position: 'top-center',
          closeButton: false,
          autoClose: false,
          theme: 'colored',
          style: styleTheme,
        });
      }
      else {
        toast.update('server-loader', {
          render: content,
          autoClose: false,
          style: styleTheme,
        });
      }
    }
    else {
      toast.dismiss('server-loader');
    }
  }, [serverStatus, elapsed])


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
          <div><Outlet context={{
            currentMode: mode,
            serverStatus: serverStatus

          }} /></div>

        </div>

        {/* {!loading && (<Footer currMode={currentMode} />)} */}
        <Footer currMode={mode} />

      </div>
    </section>
  )
}

