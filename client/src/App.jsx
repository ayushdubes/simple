import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import {ChakraProvider} from '@chakra-ui/react'
 
export default function App () {
  return (
  <ChakraProvider> 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </BrowserRouter>
  </ChakraProvider>  
    )
    
}

