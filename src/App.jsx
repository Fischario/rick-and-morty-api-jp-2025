import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import TrocarPagina from './components/TrocarPagina'
import { Route, Routes } from 'react-router-dom'
import RickAndMorty from './pages/RickAndMorty'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/characters' element={<RickAndMorty />}/>
        <Route path='/home' element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App