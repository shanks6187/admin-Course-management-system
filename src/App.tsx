import React from 'react';
import MainLayout from '@/layout/index'
import { Route, Routes,Navigate } from 'react-router-dom';
import Login from '@/views/login'
import ArticleList from '@/views/Course/ArticleList'
import Category from '@/views/Course/Category'
import Dashboard from '@/views/dashboard/dashboard'
import AuthRequite from '@/guard/AuthRequire'
import { renderRoutes } from '@/router/utils'
function App() {
  
  return (
    <div className="App">
      
      <Routes>
        <Route path='/'  element={ <AuthRequite></AuthRequite>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          { renderRoutes() }
        </Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
