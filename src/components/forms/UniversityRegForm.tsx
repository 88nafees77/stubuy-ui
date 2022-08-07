import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface IFormInput {
  universityName: string,
  universityAddress: {
    AddressLine1: string,
    AddressLine2: string,
    CityName: string,
    State: string,
    Zipcode: number
  }
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

function UniversityRegForm(arr: any[]) {

  const { heading, submitButton } = useStyles();

  const [json, setJson] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful }
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log(JSON.stringify(data));
    setJson(JSON.stringify(data));
    fetch('http://127.0.0.1:8080/register/university', {
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
          console.log("University Registration Successfully Completed " + response.status)
        } else {
          console.log("University Registration Failed " + response.status)
        }

      })
      .then(function (initialState) {
       
      });
  }

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        University Registration Page
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("universityName")}
          variant="outlined"
          margin="normal"
          label="University Name"
          fullWidth
          required
        />
        <TextField
          {...register("universityAddress.AddressLine1")}
          variant="outlined"
          margin="normal"
          label="University AddressLine1"
          fullWidth
          required
        />
        <TextField
          {...register("universityAddress.AddressLine2")}
          variant="outlined"
          margin="normal"
          label="University AddressLine2"
          fullWidth
          required
        />
        <TextField
          {...register("universityAddress.CityName")}
          variant="outlined"
          margin="normal"
          label="City Name"
          fullWidth
          required
        />
        <TextField
          {...register("universityAddress.State")}
          variant="outlined"
          margin="normal"
          label="State Name"
          fullWidth
          required
        />
        <TextField
          {...register("universityAddress.Zipcode")}
          variant="outlined"
          margin="normal"
          label="Zipcode"
          fullWidth
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
        >
          Registration
        </Button>
      </form>
    </Container>
  );
}

export default UniversityRegForm;