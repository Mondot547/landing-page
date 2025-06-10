
import FAQ from './components/FAQ'
import Features from './components/Features'
import Hero from './components/Hero'
import Testimonials from './components/Testimonials'
import { DarkModeProvider } from './context/DarkModeContext'
import ContactForm from './components/ContactForm'
import { Helmet } from 'react-helmet-async'

function App() {
  return (
    <>
    <Helmet>
      <title>MonSite - Ebook Gratuit pour Booster tes Compétences</title>
        <meta 
          name="description" 
          content="Télécharge gratuitement notre ebook exclusif et découvre les meilleures stratégies pour développer tes compétences rapidement et efficacement."
        />
        <meta 
          property="og:title" 
          content="MonSite - Ebook Gratuit pour Booster tes Compétences"
        />
        <meta 
          property="og:description" 
          content="Télécharge gratuitement notre ebook exclusif et découvre les meilleures stratégies pour développer tes compétences rapidement et efficacement."
        />
        <meta 
          property="og:image" 
          content="https://www.tonsite.com/images/ebook-cover.png"
        />
        <meta 
          property="og:url" 
          content="https://www.tonsite.com/"
        />
        <link 
          rel="canonical" 
          href="https://www.tonsite.com/"
        />
        <meta name="robots" content="index, follow" />
    </Helmet>
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
    </>
  )
}

export default App
