import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Courses from './components/Courses'
import CourseDetails from './components/CourseDetails'
import About from './components/About'

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

    </>
  )
}

export default App