import React, { useCallback, useState } from 'react'
import { ThemeProvider } from './ThemeContext'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Courses from './Courses';
import SavedCourses from './SavedCourses';
import About from './About';
import CourseDetails from './CourseDetails';
import NotFound from './NotFound';

const App = () => {
  const [savedCourses, setSavedCourses] = useState([]);
      const addToSaved = useCallback((course) => {
        setSavedCourses((prev)=>{
          if(prev.find((c)=>c.id === course.id)){
            return prev;
          }
          return [...prev, course]
        });
        
      }, []);

      const removeFromSaved = useCallback((id) => {
        setSavedCourses((prev)=>prev.filter((c)=>c.id !== id))
      }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar/>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses addToSaved = {addToSaved}/>} />
            <Route path="/course/:courseId" element={<CourseDetails addToSaved = {addToSaved}/>} />
            <Route path="/saved" element={<SavedCourses savedCourses={savedCourses} removeFromSaved={removeFromSaved}/>} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound/>} />

          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App