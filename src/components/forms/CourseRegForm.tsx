import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import AlertSuccess from '../homepage/AlertSuccess';
import { UID, UniversityDropdown } from '../homepage/Dropdown';
import Select from "react-select";



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
    courseName: string
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

function CourseRegForm(arr: any[]) {

    const [university, setUniversity] = useState<IUniversityOutput[]>([]);
    const [universityName, setUniversityName] = useState("");
    const [universityID, setUniversityID] = useState("");



    const { heading, submitButton } = useStyles();

    const {
        register,
        handleSubmit,
        resetField,
        formState: { isDirty, isValid }
    } = useForm<ICourseInput>({
        mode: "onSubmit", defaultValues: {
            universityId: "",
            courseName: ""
        }
    });


    const onSubmit = (data: ICourseInput, e) => {
        data.universityId = universityID
        console.log(JSON.stringify(data));
        // setJson(JSON.stringify(data));
        fetch('http://127.0.0.1:8080/register/course', {
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
                    <AlertSuccess />
                    console.log("Course Registration Successfully Completed " + response.status)
                } else {
                    console.log("Course Registration Failed " + response.status)
                }
            })
            .then(function (initialState) {
                resetField("universityId")
                resetField("courseName")
                setUniversityID("")
                setUniversityName("")
            });
    }

    const handleOnChange = (e: { target: { value: any; }; }) => {
        console.log(e.target.value);
        setUniversityID(e.target.value)
    };

    useEffect(function () {
        axios.get("http://127.0.0.1:8080/all/university").then((response) => setUniversity(response.data)).then((error) => console.log(error));
    }, [])


    return (
        <Container maxWidth="xs">
            <Typography className={heading} variant="h3">
                Course Registration Page
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select className='form-control' onChange={handleOnChange}>
                    <option value={universityName}>Select University Name</option>
                    {university.map((temp) => (
                        <option key={temp.universityId} value={temp.universityId}>{temp.universityName}</option>
                    ))}
                </select>

                <TextField
                    {...register("courseName")}
                    variant="outlined"
                    margin="normal"
                    label="Course Name"
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


export default CourseRegForm;
