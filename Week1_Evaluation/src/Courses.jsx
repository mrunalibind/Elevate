import React, { useMemo, useRef, useState } from 'react'
import CourseCard from './CourseCard';

const coursesData = [
    {
        id: 1,
        name: "React for Beginners",
        category: "Frontend",
        duration: "4 weeks",
        level: "Beginner",
        price: "499",
        description: "Learn the basics of React and build dynamic web applications.",

    },
    {
        id: 2,
        name: "Node.js Essentials",
        category: "Backend",
        duration: "6 weeks",
        level: "Intermediate",
        price: "699",
        description: "Master Node.js and build scalable backend applications.",
    },
    {
        id: 3,
        name: "AI and Machine Learning",
        category: "AI",
        duration: "8 weeks",
        level: "Advanced",
        price: "999",
        description: "Dive into AI and machine learning concepts and applications.",
    },
    {
        id: 4,
        name: "Data Science with Python",
        category: "Data",
        duration: "10 weeks",
        level: "Intermediate",
        price: "899",
        description: "Learn data science techniques using Python and real-world datasets.",
    },
    {
        id: 5,
        name: "Full Stack Web Development",
        category: "Frontend",
        duration: "12 weeks",
        level: "Advanced",
        price: "1299",
        description: "Become a full stack web developer and build end-to-end applications.",

    },
    {
        id: 6,
        name: "Introduction to Programming",
        category: "Backend",
        duration: "4 weeks",
        level: "Beginner",
        price: "399",
        description: "Start your programming journey with this introductory course.",
    },
    {
        id: 7,
        name: "Advanced React Patterns",
        category: "Frontend",
        duration: "6 weeks",
        level: "Advanced",
        price: "799",
        description: "Explore advanced patterns and techniques in React development.",
    },
    {
        id: 8,
        name: "Data Visualization with D3.js",
        category: "Data",
        duration: "5 weeks",
        level: "Intermediate",
        price: "599",
        description: "Learn how to create stunning data visualizations using D3.js.",
    }
]

const Courses = ({ addToSaved }) => {
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const inputRef = useRef(null);

    const handleFocusSearch = () => {
        inputRef.current.focus();
    }

    const filteredCourses = useMemo(() => {
        return coursesData.filter(course => {
            const matchSearch = course.name.toLowerCase().includes(searchText.toLowerCase())
            const matchCategory = selectedCategory === "All" || course.category.toLowerCase() === selectedCategory.toLowerCase()
            return matchSearch && matchCategory;
        });

    }, [searchText, selectedCategory])

    return (
        <div>
            <h2>Available Courses</h2>

            <div>
                <div>
                    <label htmlFor="course-search">Search Courses:</label>
                    <input
                        type="text"
                        ref={inputRef}

                        placeholder="Enter course name..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <button onClick={handleFocusSearch}>Focus Search</button>

                <div>
                    <label htmlFor="category-search">Category:</label>
                    <select id="category-search" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="AI">AI</option>
                        <option value="Data">Data</option>
                    </select>
                </div>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "30px",
                margin: "20px"
            }}>
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} addToSaved={addToSaved} />
                    ))
                ) : (
                    <p>No courses matched</p>
                )}
            </div>


        </div>


    )
}

export default Courses