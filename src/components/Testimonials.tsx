import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Star,
  Pause,
  Play,
} from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Marie Dupont',
    role: 'Freelance Développeuse',
    company: 'DevSolutions',
    text: "Cet eBook m'a vraiment aidée à décrocher mes premiers clients rapidement. Les conseils sont clairs, motivants et surtout très pratiques. Je recommande vivement !",
    avatar: 'https://i.pravatar.cc/100?img=32',
    rating: 4.5,
    duration: '3 mois après lecture',
  },
  {
    id: 2,
    name: 'Antoine Lefèvre',
    role: 'Consultant SEO',
    company: 'SEO Expert',
    text: "La formation proposée est très complète et accessible, idéale pour les débutants comme moi. J'ai pu multiplier mes revenus par 3 en 6 mois.",
    avatar: 'https://i.pravatar.cc/100?img=15',
    rating: 5,
    duration: '6 mois après lecture',
  },
  {
    id: 3,
    name: 'Sophie Martin',
    role: 'Designer UX/UI',
    company: 'Creative Studio',
    text: "Grâce à ce guide, j'ai enfin compris comment organiser mon temps et optimiser ma visibilité. Mes projets sont maintenant plus rentables.",
    avatar: 'https://i.pravatar.cc/100?img=20',
    rating: 4,
    duration: '4 mois après lecture',
  },
  {
    id: 4,
    name: 'Lucas Bernard',
    role: 'Rédacteur Web',
    company: 'ContentPro',
    text: "Un guide complet qui m'a permis de passer de 0 à mes premiers 2000€ de CA mensuel. Les stratégies de prospection fonctionnent vraiment !",
    avatar: 'https://i.pravatar.cc/100?img=8',
    rating: 5,
    duration: '5 mois après lecture',
  },
];

interface StarsProps {
  rating: number;
}

function Stars({ rating }: StarsProps) {
  return (
    <div
      className="flex items-center gap-1 mb-2"
      role="img"
      aria-label={`${rating} étoiles sur 5`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < Math.floor(rating);
        const halfFilled = i === Math.floor(rating) && rating % 1 !== 0;

        return (
          <Star
            key={i}
            className={`w-4 h-4 ${
              filled
                ? 'text-yellow-400 fill-yellow-400'
                : halfFilled
                ? 'text-yellow-400 fill-yellow-400/50'
                : 'text-gray-300 dark:text-gray-600'
            }`}
            aria-hidden="true"
          />
        );
      })}
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
        {rating}/5
      </span>
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: (typeof testimonials)[0];
  isActive: boolean;
}

function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          staggerChildren: 0.1,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        rotateY: -90,
        transition: {
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-800 dark:via-blue-900/20 dark:to-purple-900/20 p-8 md:p-10 rounded-3xl shadow-2xl max-w-2xl mx-auto border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
    >
      {/* Quote Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute -top-4 -left-4 bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-full shadow-lg"
      >
        <Quote className="w-6 h-6 text-white" aria-hidden="true" />
      </motion.div>

      {/* Rating Stars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-6"
      >
        <Stars rating={testimonial.rating} />
      </motion.div>

      {/* Testimonial Text */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-700 dark:text-gray-200 text-lg md:text-xl leading-relaxed mb-8 font-medium italic"
      >
        "{testimonial.text}"
      </motion.blockquote>

      {/* Author Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <div className="relative">
          <img
            src={testimonial.avatar}
            alt=""
            className="w-16 h-16 rounded-full object-cover ring-4 ring-white/80 dark:ring-gray-700/80 shadow-lg"
            loading="lazy"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>

        <div className="text-left flex-1">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            {testimonial.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {testimonial.role}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            {testimonial.company}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {testimonial.duration}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSelected((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isPlaying]);

  const handlePrevious = () => {
    setSelected(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    setSelected((prev) => (prev + 1) % testimonials.length);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 py-20 px-6 md:px-16"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
          >
            Ils ont transformé leur carrière
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Découvre les témoignages authentiques de freelances qui ont réussi
            grâce à notre guide
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative mb-12">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={testimonials[selected].id}
              testimonial={testimonials[selected]}
              isActive={true}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Dots Navigation */}
          <div
            className="flex gap-3"
            role="tablist"
            aria-label="Sélectionner un témoignage"
          >
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.id}
                onClick={() => setSelected(i)}
                role="tab"
                aria-selected={selected === i}
                aria-label={`Témoignage de ${testimonial.name}`}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selected === i
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              >
                {selected === i && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={toggleAutoPlay}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={
              isPlaying
                ? 'Mettre en pause le défilement automatique'
                : 'Reprendre le défilement automatique'
            }
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            ) : (
              <Play className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isPlaying ? 'Pause' : 'Play'}
            </span>
          </button>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              500+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Freelances accompagnés
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              4.8/5
            </div>
            <div className="text-gray-600 dark:text-gray-400">Note moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              95%
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Recommandent le guide
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
