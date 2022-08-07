import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Navbar from './components/homepage/Navbar';
import CourseRegForm from './components/forms/CourseRegForm';
import UniversityRegForm from './components/forms/UniversityRegForm';
import ApiService from './components/apiservice/ApiService';
import BranchRegForm from './components/forms/BranchRegForm';


let limit: any[] = [];


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/university/register' element={<UniversityRegForm{...limit} />} />
        <Route path='/course/register' element={<CourseRegForm{...limit} />} />
        <Route path='/branch/register' element={<BranchRegForm{...limit} />} />
        <Route path='/user/login' element={<BranchRegForm{...limit} />} />
        <Route path='/user/create/account' element={<BranchRegForm{...limit} />} />
      </Routes>
    </>
  );
}

export default App;
