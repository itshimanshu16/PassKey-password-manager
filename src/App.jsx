import './App.css'
import Navbar from './Components/Navbar'
import Maincontent from './Components/Maincontent'
import Footer from './Components/Footer'
function App() {


  return (
    <>
<div className=' min-h-screen mb-5'>
    <Navbar/>
      <Maincontent/>
</div>
      <div >
    <Footer/>
      </div>

    </>
  )
}

export default App
