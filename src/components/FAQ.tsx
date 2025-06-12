// src/components/FAQ.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Est-ce que l'eBook est vraiment gratuit ?",
    answer:
      "Oui, l'eBook est entièrement gratuit, sans engagement ni conditions cachées. Nous croyons en l'accessibilité de l'information pour tous ceux qui souhaitent se lancer dans le freelancing.",
  },
  {
    question: "Comment vais-je recevoir l'eBook ?",
    answer:
      'Après avoir rempli le formulaire, tu recevras un email avec un lien de téléchargement instantané. Le processus est automatique et ne prend que quelques minutes.',
  },
  {
    question: 'Puis-je poser des questions après la lecture ?',
    answer:
      "Absolument ! Tu peux nous contacter via le formulaire de contact ou nos réseaux sociaux. Nous sommes là pour t'accompagner dans ton parcours freelance.",
  },
  {
    question: 'Ce guide convient-il aux débutants ?',
    answer:
      "Oui, il est spécialement conçu pour accompagner les débutants pas à pas vers leur premier projet freelance. Aucune expérience préalable n'est requise.",
  },
  {
    question: "Dans quel format est disponible l'eBook ?",
    answer:
      "L'eBook est disponible au format PDF, optimisé pour la lecture sur tous les appareils (ordinateur, tablette, smartphone).",
  },
];

interface FAQItemProps {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
    >
      <motion.button
        onClick={() => onToggle(index)}
        className="w-full px-6 py-5 text-left flex justify-between items-center font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-xl"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        id={`faq-header-${index}`}
      >
        <span className="pr-4 text-lg leading-relaxed">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
          />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-header-${index}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
              transition: {
                height: { duration: 0.3, ease: 'easeOut' },
                opacity: { duration: 0.2, delay: 0.1 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.3, ease: 'easeIn' },
                opacity: { duration: 0.2 },
              },
            }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-5 pt-2">
              <div className="h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-600 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20 px-6 md:px-16"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            id="faq-heading"
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Questions Fréquentes
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Retrouve ici les réponses aux questions les plus courantes sur notre
            eBook gratuit
          </p>
        </motion.div>

        <div className="space-y-4" role="list">
          {faqs.map((faq, index) => (
            <div key={index} role="listitem">
              <FAQItem
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={toggleIndex}
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Une autre question ?
            <a
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 ml-1 underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              Contacte-nous
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
