import './App.css'

import { Route, Routes, useLocation} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import HomePage from './Components/Home/HomePage'
import Footer from './Components/Footer/Footer'

function App() {
  const pathname = useLocation()
  return (
        <div className='App'>
          {pathname === '/' ? null : <NavBar/>}
      <Routes>
            <Route path='/' element={<HomePage />}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
