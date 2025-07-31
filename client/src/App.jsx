import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'

import BlogTitles from './pages/BlogTitles'
import GenerateImages from './pages/GenerateImages'
import ReviewResume from './pages/ReviewResume'
import RemoveObject from './pages/RemoveObject'
import RemoveBackground from './pages/RemoveBackground'
import Community from './pages/Community'
import WriteArticle from './pages/WriteArticle'
import { useAuth } from '@clerk/clerk-react'


const App = () => {

  const {getToken} = useAuth()
  useEffect(() => {
    getToken().then((token)=> console.log(token));
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/ai' element={<Layout/>}>
          <Route index element={<Dashboard/>} />
          <Route path='blog-titles' element={<BlogTitles/>} />
          <Route path='generate-images' element={<GenerateImages/>} />
          <Route path='review-resume' element={<ReviewResume/>} />
          <Route path='remove-object' element={<RemoveObject/>} />
          <Route path='remove-background' element={<RemoveBackground/>} />
          <Route path='write-article' element={<WriteArticle/>} />
          <Route path='community' element={<Community/>} />

        </Route>
      </Routes>
    </div>
  )
}

export default App