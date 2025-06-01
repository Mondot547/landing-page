import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex items-center justify-center px-6 md:px-16">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-6xl gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-300 mb-6 leading-tight">
            Deviens <span className="text-blue-600 dark:text-blue-400">Freelance</span> sans galérer
          </h1>
          <p className="text-gray-600 dark:text-white text-lg mb-8">
            Télécharge notre eBook gratuit et découvre les étapes concrètes pour te lancer en freelance tech.
          </p>
          <a
            href="#contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
          >
            Je télécharge l'eBook
          </a>
        </motion.div>

        <motion.img
          src="/src/assets/ebook-image.png"
          alt="Couverture eBook"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-sm md:max-w-md"
        />
      </div>
    </section>
  )
}
