import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import UploadDoc from './pages/UploadDocs'
import DocumentVersions from './pages/DocumentVersions'
import SignupPage from './pages/SignupPage'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/upload-doc' element={<UploadDoc/>} />
        <Route path='/doc/:docName/versions' element={<DocumentVersions/>} />
      </Routes>
    </>
  )
}

export default App
