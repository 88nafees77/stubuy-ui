import axios from 'axios';
import React, { useEffect, useState } from 'react'

let UID = "";

export const UniversityDropdown = () => {
    interface IUniversityInput {
        universityId: string,
        universityName: string,
        universityAddress: {
            AddressLine1: string,
            AddressLine2: string,
            CityName: string,
            State: string,
            Zipcode: number
        }
    }

    const [university, setUniversity] = useState<IUniversityInput[]>([]);
    const [universityName, setUniversityName] = useState("");
    const [universityID, setUniversityID] = useState("");


    interface ICourseInput {
        courseId: string,
        universityId: string,
        courseName: string,
        universityName: string
    }

    const [course, setcourse] = useState<ICourseInput[]>([]);
    const [courseName, setCourseName] = useState("");
    const [courseID, setcourseID] = useState("");


    const handleOnChange = (e: { target: { value: any; }; }) => {
        console.log(e.target.value);
        UID = e.target.value;
        setUniversityID(e.target.value)
        axios.get("http://127.0.0.1:8080/course/" + UID).then((response) => setcourse(response.data)).then((error) => console.log(error));


    };
    useEffect(function () {
        axios.get("http://127.0.0.1:8080/all/university").then((response) => setUniversity(response.data)).then((error) => console.log(error));
    }, [])
    return (
        <>
            <select className='form-control' onChange={handleOnChange}>
                <option value={universityName}>Select University Name</option>
                {university.map((temp) => (
                    <option key={temp.universityId} value={temp.universityId}>{temp.universityName}</option>
                ))}
            </select>
            <select className='form-control' onChange={handleOnChange}>
                <option value={courseName}>Select Course Name</option>
                {course.map((temp) => (
                    <option key={temp.courseId} value={temp.courseId}>{temp.courseName}</option>
                ))}
            </select>

        </>

    );

}


export const CourseDropdown = () => {

    interface ICourseInput {
        courseId: string,
        universityId: string,
        courseName: string,
        universityName: string
    }

    const [course, setcourse] = useState<ICourseInput[]>([]);
    const [courseName, setCourseName] = useState("");
    const [courseID, setcourseID] = useState("");

    const handleOnChange = (e: { target: { value: any; }; }) => {
        console.log(e.target.value);
        setCourseName(e.target.value)
    };

    useEffect(function () {
        console.log("uid" + UID)
        axios.get("http://127.0.0.1:8080/course/" + UID).then((response) => setcourse(response.data)).then((error) => console.log(error));
    }, [])

    return (
        <select className='form-control' onChange={handleOnChange}>
            <option value={courseName}>Select Course Name</option>
            {course.map((temp) => (
                <option key={temp.courseId} value={temp.courseId}>{temp.courseName}</option>
            ))}
        </select>
    );
}
export { UID }


