// src/components/Features.tsx
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const features = [
  {
    title: "Trouver tes premiers clients",
    desc: "Des méthodes concrètes pour décrocher tes premières missions freelance.",
  },
  {
    title: "Fixer tes tarifs sans stress",
    desc: "Comprends ta valeur et applique une stratégie de prix efficace.",
  },
  {
    title: "Gérer ton temps et ton énergie",
    desc: "Découvre des outils et routines pour rester productif sans t’épuiser.",
  },
  {
    title: "Booster ta visibilité",
    desc: "Utilise LinkedIn, portfolio, et SEO pour attirer des clients automatiquement.",
  },
]

export default function Features() {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-10 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100"
        >
          Voici ce que tu vas apprendre 📘
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-200 p-6 rounded-xl border border-gray-200 dark:border-gray-300 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1 dark:text-gray-800">{feat.title}</h3>
                  <p className="text-gray-600">{feat.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
