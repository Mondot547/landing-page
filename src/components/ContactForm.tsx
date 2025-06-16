// src/components/ContactForm.tsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import emailjs from '@emailjs/browser';
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Loader2,
  Send,
  AlertCircle,
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

// Configuration sécurisée - à déplacer dans des variables d'environnement
const EMAIL_CONFIG = {
  serviceId: 'service_kka11ei',
  templateId: 'template_iwv95wy',
  publicKey: '01CBgWYFzjDtqlrdQ',
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange', // Validation en temps réel
  });

  const [countryCode, setCountryCode] = useState<string>('FR');
  const [phoneValue, setPhoneValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Récupération sécurisée du pays avec timeout
  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    fetch('https://ipapi.co/json/', {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (data?.country_code && typeof data.country_code === 'string') {
          setCountryCode(data.country_code.toUpperCase());
        }
      })
      .catch(() => {
        // Silently fail and keep default
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const handlePhoneChange = (value: string | undefined) => {
    const cleanValue = value || '';
    setPhoneValue(cleanValue);
    setValue('phone', cleanValue, { shouldValidate: true });

    if (cleanValue) {
      try {
        const phoneNumber = parsePhoneNumberFromString(cleanValue);
        if (!phoneNumber || !phoneNumber.isValid()) {
          setError('phone', {
            type: 'manual',
            message: 'Numéro de téléphone invalide',
          });
        } else {
          clearErrors('phone');
        }
      } catch {
        setError('phone', {
          type: 'manual',
          message: 'Format de numéro invalide',
        });
      }
    } else {
      clearErrors('phone');
    }
  };

  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitAttempted(true);

    try {
      // Validation côté client supplémentaire
      const phoneNumber = parsePhoneNumberFromString(data.phone);
      if (!phoneNumber || !phoneNumber.isValid()) {
        throw new Error('Numéro de téléphone invalide');
      }

      // Sanitisation des données
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: data.email.toLowerCase().trim(),
        phone: phoneNumber.formatInternational(),
        message: sanitizeInput(data.message),
      };

      // Validation de longueur
      if (sanitizedData.message.length > 5000) {
        throw new Error('Le message est trop long (maximum 5000 caractères)');
      }

      await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        {
          to_email: sanitizedData.email,
          from_name: sanitizedData.name,
          reply_to: 'alex.mondot.mail.pro@gmail.com',
          phone: sanitizedData.phone,
          message: sanitizedData.message,
          ebook_link:
            'https://docs.google.com/document/d/1BR1gRLU5ETsNp0rSETR11VuCGHDifAc3rutM-N-itmw/edit?usp=sharing',
          timestamp: new Date().toISOString(),
        },
        EMAIL_CONFIG.publicKey,
      );

      toast.success(
        'Formulaire envoyé avec succès ! Vérifiez vos emails pour télécharger votre eBook.',
        {
          autoClose: 5000,
          role: 'status',
        },
      );

      reset();
      setPhoneValue('');
      setSubmitAttempted(false);
    } catch (error: any) {
      console.error("Erreur lors de l'envoi:", error);

      let errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      if (error.message === 'Numéro de téléphone invalide') {
        errorMessage = 'Veuillez vérifier votre numéro de téléphone.';
      } else if (error.message?.includes('trop long')) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        role: 'alert',
        autoClose: 5000,
        onClose: () => {
          if (errorMessage.includes('trop long')) {
            setError('message', {
              type: 'manual',
              message: errorMessage,
            });
          }
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName: keyof FormData) => `
    w-full pl-12 pr-4 py-3 
    bg-white dark:bg-gray-600 
    text-gray-900 dark:text-white
    border-2 rounded-lg 
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:opacity-60 disabled:cursor-not-allowed
    placeholder:text-gray-500 dark:placeholder:text-gray-400
    ${
      errors[fieldName]
        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
        : 'border-gray-300 dark:border-gray-500 hover:border-gray-400 dark:hover:border-gray-400'
    }
  `;

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
      aria-labelledby="contact-title"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            id="contact-title"
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Contactez-nous
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Remplissez ce formulaire et recevez votre eBook gratuit par email
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-6 md:gap-8">
                {/* Nom */}
                <motion.div
                  animate={errors.name ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Nom complet *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                      size={20}
                      aria-hidden="true"
                    />
                    <input
                      id="name"
                      type="text"
                      placeholder="Votre nom complet"
                      autoComplete="name"
                      {...register('name', {
                        required: 'Le nom est requis',
                        minLength: {
                          value: 2,
                          message: 'Le nom doit contenir au moins 2 caractères',
                        },
                        maxLength: {
                          value: 100,
                          message: 'Le nom ne peut pas dépasser 100 caractères',
                        },
                      })}
                      className={inputClasses('name')}
                      disabled={isSubmitting}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                  </div>
                  {errors.name && (
                    <div className="flex items-center mt-2" role="alert">
                      <AlertCircle
                        className="w-4 h-4 text-red-500 mr-2"
                        aria-hidden="true"
                      />
                      <p
                        id="name-error"
                        className="text-red-600 dark:text-red-400 text-sm"
                      >
                        {errors.name.message}
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div
                  animate={errors.email ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Adresse email *
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                      size={20}
                      aria-hidden="true"
                    />
                    <input
                      id="email"
                      type="email"
                      placeholder="votre.email@exemple.com"
                      autoComplete="email"
                      {...register('email', {
                        required: "L'adresse email est requise",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Veuillez entrer une adresse email valide',
                        },
                      })}
                      className={inputClasses('email')}
                      disabled={isSubmitting}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={
                        errors.email ? 'email-error' : undefined
                      }
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center mt-2" role="alert">
                      <AlertCircle
                        className="w-4 h-4 text-red-500 mr-2"
                        aria-hidden="true"
                      />
                      <p
                        id="email-error"
                        className="text-red-600 dark:text-red-400 text-sm"
                      >
                        {errors.email.message}
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Téléphone */}
                <motion.div
                  animate={errors.phone ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Numéro de téléphone
                  </label>

                  <div className="flex items-center gap-2">
                    {/* Drapeau (via PhoneInput country selector) */}
                    <PhoneInput
                      id="phone"
                      defaultCountry={countryCode as any}
                      international
                      countryCallingCodeEditable={false}
                      value={phoneValue}
                      onChange={handlePhoneChange}
                      disabled={isSubmitting}
                      placeholder="Votre numéro de téléphone"
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={
                        errors.phone ? 'phone-error' : undefined
                      }
                      className="relative w-full"
                      inputComponent={(props) => (
                        <div className="relative w-full">
                          <Phone
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none z-10"
                            size={20}
                            aria-hidden="true"
                          />
                          <input
                            {...props}
                            className={`w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              props.className ?? ''
                            }`}
                          />
                        </div>
                      )}
                    />
                  </div>

                  {errors.phone && (
                    <div className="flex items-center mt-2" role="alert">
                      <AlertCircle
                        className="w-4 h-4 text-red-500 mr-2"
                        aria-hidden="true"
                      />
                      <p
                        id="phone-error"
                        className="text-red-600 dark:text-red-400 text-sm"
                      >
                        {errors.phone.message}
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div
                  animate={errors.message ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className="absolute left-4 top-4 text-gray-400 dark:text-gray-500"
                      size={20}
                      aria-hidden="true"
                    />
                    <textarea
                      id="message"
                      placeholder="Décrivez votre demande ou posez vos questions..."
                      {...register('message', {
                        required: 'Le message est requis',
                        minLength: {
                          value: 10,
                          message:
                            'Le message doit contenir au moins 10 caractères',
                        },
                        maxLength: {
                          value: 5000,
                          message:
                            'Le message ne peut pas dépasser 5000 caractères',
                        },
                      })}
                      className={`${inputClasses(
                        'message',
                      )} min-h-[120px] resize-y`}
                      rows={5}
                      disabled={isSubmitting}
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={
                        errors.message ? 'message-error' : undefined
                      }
                    />
                  </div>
                  {errors.message && (
                    <div className="flex items-center mt-2" role="alert">
                      <AlertCircle
                        className="w-4 h-4 text-red-500 mr-2"
                        aria-hidden="true"
                      />
                      <p
                        id="message-error"
                        className="text-red-600 dark:text-red-400 text-sm"
                      >
                        {errors.message.message}
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Bouton d'envoi */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || (!isValid && submitAttempted)}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`
                    w-full py-4 px-6 rounded-xl text-white font-semibold text-lg
                    transition-all duration-200 ease-in-out
                    flex items-center justify-center gap-3
                    focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
                    ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                    }
                  `}
                  aria-describedby="submit-status"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        className="animate-spin"
                        size={24}
                        aria-hidden="true"
                      />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} aria-hidden="true" />
                      <span>Envoyer le formulaire</span>
                    </>
                  )}
                </motion.button>

                <p id="submit-status" className="sr-only" aria-live="polite">
                  {isSubmitting
                    ? "Formulaire en cours d'envoi"
                    : 'Formulaire prêt à être envoyé'}
                </p>
              </div>
            </form>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            * Champs obligatoires. Vos données sont protégées et ne seront
            jamais partagées.
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="auto"
        role="alert"
        aria-live="assertive"
      />

      <style>
        {`
          .phone-input-custom .PhoneInputInput {
            width: 100%;
            padding-left: 3rem;
            padding-right: 1rem;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            background-color: #fff;
            color: #111827;
            border-width: 2px;
            border-radius: 0.5rem;
            transition: all 0.2s ease-in-out;
            outline: none;
            box-sizing: border-box;
          }
          .dark .phone-input-custom .PhoneInputInput {
            background-color: #4b5563;
            color: #fff;
          }
          .phone-input-custom .PhoneInputInput:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px #3b82f6;
          }
          .phone-input-custom .PhoneInputInput:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          .phone-input-custom .PhoneInputInput::placeholder {
            color: #6b7280;
          }
          .dark .phone-input-custom .PhoneInputInput::placeholder {
            color: #9ca3af;
          }
          ${
            errors.phone
              ? `
            .phone-input-custom .PhoneInputInput {
              border-color: rgb(239, 68, 68);
              background-color: rgb(254, 242, 242);
            }
            .dark .phone-input-custom .PhoneInputInput {
              background-color: rgba(127, 29, 29, 0.2);
            }
          `
              : `
            .phone-input-custom .PhoneInputInput {
              border-color: rgb(209, 213, 219);
            }
            .phone-input-custom .PhoneInputInput:hover {
              border-color: rgb(156, 163, 175);
            }
          `
          }
        `}
      </style>
    </section>
  );
}
