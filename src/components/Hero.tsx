import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  ArrowDown,
  Download,
  Star,
  Users,
  BookOpen,
  Zap,
  CheckCircle,
} from 'lucide-react';

const stats = [
  {
    icon: Users,
    label: 'Freelances accompagnés',
    value: '500+',
    color: 'text-blue-500',
  },
  {
    icon: Star,
    label: 'Moyenne des avis',
    value: '4.8/5',
    color: 'text-yellow-500',
  },
  {
    icon: BookOpen,
    label: 'Pages de conseils pratiques',
    value: '120+',
    color: 'text-green-500',
  },
];

const benefits = [
  'Stratégies de prospection éprouvées',
  'Tarification optimale pour débutants',
  'Templates de contrats et devis',
  'Techniques de négociation client',
];

const FloatingElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    }}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
    className="backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 p-2 sm:p-4 rounded-xl sm:rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl"
  >
    {children}
  </motion.div>
);

const AnimatedCounter = ({
  value,
  duration = 2000,
}: {
  value: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    let start = 0;
    const increment = numericValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numericValue, duration]);

  return (
    <span>
      {value.includes('+')
        ? `${count}+`
        : value.includes('/')
        ? `${(count / 100).toFixed(1)}/5`
        : count}
    </span>
  );
};

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -30]);
  const y2 = useTransform(scrollY, [0, 300], [0, -60]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Détection de la taille d'écran
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute top-10 sm:top-20 right-4 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
            scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute bottom-10 sm:bottom-20 left-4 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-16 py-12 sm:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-8 lg:gap-12">
          {/* Content Section */}
          <motion.div
            style={isMobile ? { y: y1 } : { y: y1, opacity }}
            className="text-center lg:text-left max-w-2xl order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200 dark:border-blue-800 px-3 py-2 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6"
            >
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
                E-Book
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight"
            >
              <span className="block text-gray-900 dark:text-white">
                Deviens
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Freelance
              </span>
              <span className="block text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl font-bold">
                sans galérer
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 sm:px-0"
            >
              Télécharge notre guide complet et découvre les{' '}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                stratégies éprouvées
              </span>{' '}
              pour lancer ton activité freelance tech rapidement et sereinement.
            </motion.p>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 gap-2 sm:gap-3 mb-6 sm:mb-8 max-w-md mx-auto lg:max-w-none lg:mx-0"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 px-2 sm:px-0"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-medium">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12 px-2 sm:px-0"
            >
              <motion.button
                onClick={scrollToContact}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold shadow-xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Télécharger maintenant</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 w-full sm:w-auto"
                onClick={() =>
                  document
                    .getElementById('testimonials-heading')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Voir les témoignages
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 max-w-sm mx-auto lg:max-w-none"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                  className="text-center"
                >
                  <div
                    className={`${stat.color} mb-1 sm:mb-2 flex justify-center`}
                  >
                    <stat.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            style={{ y: y2 }}
            className="relative max-w-xs sm:max-w-sm lg:max-w-lg order-1 lg:order-2"
          >
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 z-10">
              <FloatingElement delay={1.2}>
                <div className="flex items-center gap-1 sm:gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-bold">
                    100% Gratuit
                  </span>
                </div>
              </FloatingElement>
            </div>
            <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 z-10">
              <FloatingElement delay={1.6}>
                <div className="flex items-center gap-1 sm:gap-2 text-purple-600 dark:text-purple-400">
                  <Star className="w-3 h-3 sm:w-5 sm:h-5 fill-current" />
                  <span className="text-xs sm:text-sm font-bold">
                    Guide Premium
                  </span>
                </div>
              </FloatingElement>
            </div>

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.02,
                rotateY: -2,
                transition: { duration: 0.3 },
              }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-105" />

              {/* Image Container */}
              <div className="relative bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl">
                <img
                  src="/assets/ebook-image.webp"
                  alt="Couverture de l'eBook 'Deviens Freelance sans galérer' - Guide complet pour lancer son activité freelance"
                  className="w-full max-w-xs sm:max-w-sm mx-auto rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl object-cover transform transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />

                {/* Reflection Effect */}
                <div className="absolute bottom-0 left-3 right-3 sm:left-6 sm:right-6 h-12 sm:h-20 bg-gradient-to-t from-gray-200/20 to-transparent dark:from-gray-700/20 rounded-b-xl sm:rounded-b-2xl" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
