import axios from 'axios';
import { useState } from 'react'

export default async function ApiService() {

    const result = await axios(
        'http://127.0.0.1:8080/all/university',
    );
    return result.data;
}



