import { useState } from 'react'
import './App.css'
import Mode from './Components/Mode'
import './Components/mode.css'
import bgDesktopDark from './assets/bg-desktop-dark.jpg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DataAll from './Components/DataAll'
import DataActive from './Components/DataActive'
import DataCompleted from './Components/DataCompleted'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <BrowserRouter>
                    <ToastContainer/>

      <Routes>
        <Route path='todo' element={<Mode />}>
          <Route path='all' element={<DataAll />}></Route>
          <Route path='active' element={<DataActive />}></Route>
          <Route path='completed' element={<DataCompleted />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
