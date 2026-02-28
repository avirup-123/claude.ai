import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Work from './components/Work'
import Process from './components/Process'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Grants from './components/Grants'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <About />
        <Testimonials />
        <Grants />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
