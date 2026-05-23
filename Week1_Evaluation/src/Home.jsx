import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div style={{textAlign: "center", marginTop: "10px"}}>
        <h1>Welcome to the Home Page</h1>
        <p>Mini Course Dashboard, your one-stop destination for all your learning needs.</p>
        <button style={{marginTop: "10px", padding: "5px"}} onClick={()=>navigate('/courses')}>Explore Courses</button>
    </div>
  )
}

export default Home