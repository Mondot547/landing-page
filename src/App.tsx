
import FAQ from './components/FAQ'
import Features from './components/Features'
import Hero from './components/Hero'
import Testimonials from './components/Testimonials'
import { DarkModeProvider } from './context/DarkModeContext'
import ContactForm from './components/ContactForm'

function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <main>
          <Hero />
          <Features />
          <Testimonials />
          <ContactForm />
          <FAQ />
        </main>
      </div>
    </DarkModeProvider>
  )
}

export default App
