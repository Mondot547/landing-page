import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stars from './Stars'

const testimonials = [
  {
    name: "Marie Dupont",
    role: "Freelance Développeuse",
    text: "Cet eBook m'a vraiment aidée à décrocher mes premiers clients rapidement. Les conseils sont clairs et motivants !",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 4.5,
  },
  {
    name: "Antoine Lefèvre",
    role: "Consultant SEO",
    text: "La formation proposée est très complète et accessible, idéale pour les débutants comme moi.",
    avatar: "https://i.pravatar.cc/100?img=15",
    rating: 5,
  },
  {
    name: "Sophie Martin",
    role: "Designer UX/UI",
    text: "Grâce à ce guide, j'ai enfin compris comment organiser mon temps et optimiser ma visibilité.",
    avatar: "https://i.pravatar.cc/100?img=20",
    rating: 4,
  },
]


export default function Testimonials() {
  const [selected, setSelected] = useState(0)

  // Auto slide toutes les 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-white dark:bg-gray-800 py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl dark:text-gray-300 text-gray-900 font-bold mb-12">Ils ont testé et adoré ❤️</h2>

        <AnimatePresence mode="wait">
          <motion.div
            aria-live="polite"
            aria-atomic="true"
            key={selected}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 dark-gray p-8 rounded-lg shadow-lg max-w-xl mx-auto"
          >
            <p className="text-gray-700 italic mb-6">“{testimonials[selected].text}”</p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[selected].avatar}
                alt={`Photo de ${testimonials[selected].name}`}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="text-left">
                <Stars rating={testimonials[selected].rating} />
                <p className="font-semibold">{testimonials[selected].name}</p>
                <p className="text-sm text-gray-500">{testimonials[selected].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-8 gap-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-4 h-4 rounded-full transition-colors ${
                selected === i ? 'bg-blue-800' : 'bg-gray-300'
              }`}
              aria-label={`Voir témoignage de ${testimonials[i].name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
