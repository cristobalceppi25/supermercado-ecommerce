import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Checkout } from './features/products/components/Checkout'
import { Home } from './features/products/components/Home'
import { Header } from "./features/products/components/Header/Header"
import { Footer } from "./features/products/components/Footer/Footer"

function App() {


  return (
    <>
      <Header />
      <main className="main-container">

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </>

  )
}

export default App
