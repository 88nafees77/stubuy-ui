import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

export default function AlertSuccess() {
    return (
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success alert — <strong>check it out!</strong>
            </Alert>
    )
}
