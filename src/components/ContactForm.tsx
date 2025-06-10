// src/components/ContactForm.tsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import emailjs from '@emailjs/browser';
import { User, Mail, Phone, MessageSquare, Loader2 } from 'lucide-react';
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

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [countryCode, setCountryCode] = useState<string>('FR');
  const [phoneValue, setPhoneValue] = useState<string | undefined>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Récupération du pays pour le préremplissage du téléphone
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_code) setCountryCode(data.country_code);
      })
      .catch(() => setCountryCode('FR'));
  }, []);

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneValue(value);
    setValue('phone', value || '');

    if (value) {
      const phoneNumber = parsePhoneNumberFromString(value);
      if (!phoneNumber || !phoneNumber.isValid()) {
        setError('phone', {
          type: 'manual',
          message: 'Numéro de téléphone invalide',
        });
      } else {
        clearErrors('phone');
      }
    } else {
      setError('phone', {
        type: 'manual',
        message: 'Numéro de téléphone requis',
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        'service_kka11ei',
        'template_iwv95wy',
        {
          to_email: data.email,
          from_name: 'MonSite',
          reply_to: 'alex.mondot.mail.pro@gmail.com',
          phone: data.phone,
          message: data.message,
          ebook_link:
            'https://docs.google.com/document/d/1BR1gRLU5ETsNp0rSETR11VuCGHDifAc3rutM-N-itmw/edit?usp=sharing',
        },
        '01CBgWYFzjDtqlrdQ', // clé API directe (attention à la sécurité en production)
      );

      toast.success(
        'Formulaire envoyé avec succès ! Vérifiez vos emails pour télécharger votre eBook.',
      );
      reset();
      setPhoneValue('');
    } catch (error: any) {
      console.error('Erreur EmailJS : ', error?.text || error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
    >
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center w-60 mx-auto dark:text-gray-200">
          Contactez-nous
        </h2>
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, delay: 0.2 }}
        >
          {/* Nom */}
          <motion.div
            animate={errors.name ? { x: [0, -5, 5, -5, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <label htmlFor="name" className="sr-only">
              Nom
            </label>
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              id="name"
              placeholder="Votre nom"
              {...register('name', { required: 'Le nom est requis' })}
              className={`w-full pl-10 p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            animate={errors.email ? { x: [0, -5, 5, -5, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              id="email"
              type="email"
              placeholder="Votre email"
              {...register('email', {
                required: 'L’email est requis',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Adresse email invalide',
                },
              })}
              className={`w-full pl-10 p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </motion.div>

          {/* Téléphone */}
          <motion.div
            animate={errors.phone ? { x: [0, -5, 5, -5, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <label htmlFor="phone" className="sr-only">
              Téléphone
            </label>
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
            <PhoneInput
              id="phone"
              defaultCountry={countryCode as any}
              international
              countryCallingCodeEditable={false}
              value={phoneValue}
              onChange={handlePhoneChange}
              className={`w-full pl-10 p-3 bg-white rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
              placeholder="Votre numéro de téléphone"
            />
            {errors.phone && (
              <p className="text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </motion.div>

          {/* Message */}
          <motion.div
            animate={errors.message ? { x: [0, -5, 5, -5, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <MessageSquare
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />
            <textarea
              id="message"
              placeholder="Votre message"
              {...register('message', { required: 'Le message est requis' })}
              className={`w-full pl-10 p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={4}
              disabled={isSubmitting}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 mt-1">{errors.message.message}</p>
            )}
          </motion.div>

          {/* Bouton envoyer */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition w-full flex items-center justify-center ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Envoi en cours...
              </>
            ) : (
              'Envoyer'
            )}
          </motion.button>
        </motion.form>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </div>
    </section>
  );
}
