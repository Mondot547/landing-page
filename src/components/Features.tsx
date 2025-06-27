// src/components/Features.tsx
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const features = [
  {
    title: 'Trouver tes premiers clients',
    desc: 'Des méthodes concrètes pour décrocher tes premières missions freelance.',
    details:
      'Avec des stratégies concrètes, des exemples de messages et des templates prêts à utiliser.',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Fixer tes tarifs sans stress',
    desc: 'Comprends ta valeur et applique une stratégie de prix efficace.',
    details:
      'Des techniques de négociation et des grilles tarifaires détaillées pour maximiser tes revenus.',
    icon: '💰',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Gérer ton temps et ton énergie',
    desc: "Découvre des outils et routines pour rester productif sans t'épuiser.",
    details:
      "Des plannings types et outils pratiques pour bien t'organiser et maintenir un équilibre.",
    icon: '⚡',
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Booster ta visibilité',
    desc: 'Utilise LinkedIn, portfolio, et SEO pour attirer des clients automatiquement.',
    details:
      'Des conseils avancés pour LinkedIn, SEO et marketing de contenu qui convertissent.',
    icon: '🚀',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardInteraction = (index: number) => {
    if (isMobile) {
      setExpandedIndex(expandedIndex === index ? null : index);
    } else {
      setHoveredIndex(index);
    }
  };

  const handleCardLeave = () => {
    if (!isMobile) {
      setHoveredIndex(null);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white py-12 md:py-20 px-4 md:px-6 lg:px-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 dark:border-blue-500/30 mb-4 md:mb-5">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs md:text-sm font-medium text-blue-700 dark:text-blue-300 tracking-wide">
              Formation complète
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent px-4">
            Voici ce que tu vas apprendre
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Des compétences concrètes et actionables pour développer ton
            activité freelance
          </p>
        </motion.div>

        {/* Mobile Layout - Simple Grid */}
        <div className="block md:hidden space-y-4">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div
                onClick={() => handleCardInteraction(i)}
                className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl border border-gray-200/60 dark:border-gray-700/60 shadow-lg cursor-pointer transition-all duration-300"
              >
                {/* Card background with gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    feat.color
                  } opacity-0 ${
                    expandedIndex === i ? 'opacity-5' : ''
                  } transition-opacity duration-500 rounded-xl`}
                />

                {/* Icon and header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative flex-shrink-0">
                    <div className="text-2xl bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
                      {feat.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                      expandedIndex === i ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                {/* Expanded content */}
                <motion.div
                  initial={false}
                  animate={
                    expandedIndex === i
                      ? { opacity: 1, height: 'auto' }
                      : { opacity: 0, height: 0 }
                  }
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 border-t border-gray-200/60 dark:border-gray-700/60">
                    <div className="flex items-start gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                        {feat.details}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          Points clés
                        </h4>
                        <div className="grid grid-cols-1 gap-1 text-xs text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Stratégies éprouvées
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Templates inclus
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Exemples concrets
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-blue-200/50 dark:border-blue-500/30">
                        <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
                          Gain de temps significatif
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Mise en pratique immédiate
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Layout - Complex Animation */}
        <div className="hidden md:block">
          <div
            className="relative flex justify-center items-center flex-wrap mt-12"
            style={{ height: '700px', gap: '2rem' }}
          >
            {features.map((feat, i) => {
              const isHovered = hoveredIndex === i;
              const diagonalOffsets = [
                { x: '-50%', y: '-50%' }, // top-left
                { x: '50%', y: '-50%' }, // top-right
                { x: '-50%', y: '50%' }, // bottom-left
                { x: '50%', y: '50%' }, // bottom-right
              ];
              const offset = diagonalOffsets[i];

              return (
                <motion.div
                  key={i}
                  onMouseEnter={() => handleCardInteraction(i)}
                  onMouseLeave={handleCardLeave}
                  animate={
                    isHovered
                      ? {
                          top: '50%',
                          left: '50%',
                          width: '65%',
                          height: '80%',
                          scale: 1,
                          x: '-50%',
                          y: '-50%',
                          zIndex: 50,
                          opacity: 1,
                          transition: {
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        }
                      : hoveredIndex !== null
                      ? {
                          opacity: 0,
                          scale: 0.6,
                          zIndex: 0,
                          transition: { duration: 0.5, ease: 'easeOut' },
                        }
                      : {
                          top: offset.y === '-50%' ? '25%' : '60%',
                          left: offset.x === '-50%' ? '25%' : '65%',
                          width: '40%',
                          height: '25%',
                          scale: 0.8,
                          x: '-38%',
                          y: '-50%',
                          zIndex: 1,
                          opacity: 1,
                          transition: {
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        }
                  }
                  className="group relative flex items-center cursor-pointer overflow-hidden"
                  style={{
                    transformOrigin: 'center center',
                  }}
                >
                  {/* Card background with gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                  />

                  {/* Main card */}
                  <div className="relative h-full bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl group-hover:shadow-2xl transition-all duration-500 flex flex-col">
                    {/* Icon and header */}
                    <div className="flex items-start gap-4 mb-4 lg:mb-6">
                      <div className="relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${feat.color} rounded-full opacity-20 blur-sm`}
                        />
                        <div className="relative text-2xl lg:text-3xl bg-white dark:bg-gray-800 p-2 lg:p-3 rounded-full shadow-lg">
                          {feat.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl xl:text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                          {feat.title}
                        </h3>
                        <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-4 lg:mb-6" />

                    {/* Details section */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={
                        isHovered
                          ? { opacity: 1, height: 'auto' }
                          : { opacity: 0, height: 0 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: isHovered ? 0.4 : 0,
                        ease: 'easeInOut',
                      }}
                      className="overflow-hidden flex-1"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <p className="text-gray-700 dark:text-gray-200 leading-relaxed font-medium text-base lg:text-lg">
                            {feat.details}
                          </p>
                        </div>

                        {/* Additional content when expanded */}
                        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 mt-6 lg:mt-8">
                          <div className="space-y-2 lg:space-y-3">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm lg:text-base">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              Points clés
                            </h4>
                            <ul className="space-y-1 lg:space-y-2 text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                Stratégies éprouvées
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                Templates inclus
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                Exemples concrets
                              </li>
                            </ul>
                          </div>

                          <div className="space-y-2 lg:space-y-3">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm lg:text-base">
                              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                              Résultats attendus
                            </h4>
                            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 space-y-2">
                              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-2 lg:p-3 rounded-lg border border-blue-200/50 dark:border-blue-500/30">
                                <p className="font-medium text-blue-700 dark:text-blue-300 text-xs lg:text-sm">
                                  Gain de temps significatif
                                </p>
                                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                  Mise en pratique immédiate
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Hover glow effect */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-16"
        >
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm px-4">
            {isMobile
              ? 'Touche chaque carte pour découvrir les détails'
              : 'Survole chaque carte pour découvrir les détails'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
