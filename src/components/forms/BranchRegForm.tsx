import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';


interface IUniversityOutput {
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

interface ICourseInput {
    universityId: string,
    courseId: string,
    branchName: string
}

interface ICourseOutput {
    courseId: string,
    universityId: string,
    courseName: string,
    universityName: string
}

const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "center",
      margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
      marginTop: theme.spacing(4),
    },
  }));

function BranchRegForm(arr: any[]) {

    const [university, setUniversity] = useState<IUniversityOutput[]>([]);
    const [universityName, setUniversityName] = useState("");
    const [universityID, setUniversityID] = useState("");
    const [course, setcourse] = useState<ICourseOutput[]>([]);
    const [courseName, setCourseName] = useState("");
    const [courseID, setCourseID] = useState("");

    const { heading, submitButton } = useStyles();

    useEffect(function () {
        axios.get("http://127.0.0.1:8080/all/university").then((response) => setUniversity(response.data)).then((error) => console.log(error));
    }, [])

    const onSubmit = (data: ICourseInput) => {
        data.universityId = universityID;
        data.courseId = courseID;
        console.log(JSON.stringify(data));
        // setJson(JSON.stringify(data));
        fetch('http://127.0.0.1:8080/register/branch', {
            body: JSON.stringify(data),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'

            },
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        })
            .then(function (response) {
                if (response.ok) {
                    console.log("Branch Registration Successfully Completed " + response.status)
                } else {
                    console.log("Branch Registration Failed " + response.status)
                }
            })
            .then(function (initialState) {
                setUniversityName("");
                setUniversityID("");
                setCourseID("");
                setCourseName("");    
            });
        
    }

    const {
        register,
        handleSubmit,
    } = useForm<ICourseInput>();

    const handleOnUniversityChange = (e: { target: { value: any; }; }) => {
        console.log(e.target.value);
        setUniversityID(e.target.value)
        axios.get("http://127.0.0.1:8080/course/" + e.target.value).then((response) => setcourse(response.data)).then((error) => console.log(error));
    };
    const handleOnCourseChange = (e: { target: { value: any; }; }) => {
        console.log("id" + e.target.value);
        setCourseID(e.target.value)
    };

    return (
        <Container maxWidth="xs">
            <Typography className={heading} variant="h3">
                Course Registration Page
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select className='form-control' onChange={handleOnUniversityChange}>
                    <option value={universityName}>Select University Name</option>
                    {university.map((temp) => (
                        <option key={temp.universityId} value={temp.universityId}>{temp.universityName}</option>
                    ))}
                </select>
                
                <select className='form-control' onChange={handleOnCourseChange}>
                    <option value={courseName}>Select Course Name</option>
                    {course.map((temp) => (
                        <option key={temp.courseId} value={temp.courseId}>{temp.courseName}</option>
                    ))}
                </select>
                <TextField
                    {...register("branchName")}
                    variant="outlined"
                    margin="normal"
                    label="Branch Name"
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Registration
                </Button>

            </form>
        </Container>
    )
}


export default BranchRegForm;
