// src/components/FAQ.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'

const faqs = [
  {
    question: "Est-ce que l’eBook est vraiment gratuit ?",
    answer:
      "Oui, l’eBook est entièrement gratuit, sans engagement ni conditions cachées.",
  },
  {
    question: "Comment vais-je recevoir l’eBook ?",
    answer:
      "Après avoir rempli le formulaire, tu recevras un email avec un lien de téléchargement instantané.",
  },
  {
    question: "Puis-je poser des questions après la lecture ?",
    answer:
      "Absolument ! Tu peux nous contacter via le formulaire ou nos réseaux sociaux.",
  },
  {
    question: "Ce guide convient-il aux débutants ?",
    answer:
      "Oui, il est conçu pour accompagner les débutants pas à pas vers leur premier projet freelance.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Foire aux questions (FAQ)
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i

            return (
              <div key={i} className="rounded-lg overflow-hidden">
                <motion.button
                  onClick={() => toggleIndex(i)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center font-semibold text-gray-800 dark:bg-gray-100 hover:bg-gray-300 transition"
                  whileTap={{ scale: 0.95 }}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-header-${i}`}
                >
                  <span>{faq.question}</span>
                  <span>{isOpen ? '−' : '+'}</span>
                </motion.button>

                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-header-${i}`}
                  initial={false}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? 'auto' : 0,
                    paddingTop: isOpen ? '1rem' : 0,
                    paddingBottom: isOpen ? '1rem' : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="text-gray-700 dark:text-gray-100 px-10">{faq.answer}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
