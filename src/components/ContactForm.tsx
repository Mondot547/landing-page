// src/components/ContactForm.tsx
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import emailjs from '@emailjs/browser'
import 'react-phone-number-input/style.css'
import { User, Mail, Phone, MessageSquare, Loader2 } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type FormData = {
  name: string
  email: string
  phone: string
  message: string
}

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, setValue, setError, clearErrors, reset } = useForm<FormData>()
  const [countryCode, setCountryCode] = useState('FR')
  const [phoneValue, setPhoneValue] = useState<string | undefined>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_code) {
          setCountryCode(data.country_code)
        }
      })
      .catch(() => setCountryCode('FR'))
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Utiliser EmailJS pour envoyer l'email
      await emailjs.send(
  'service_kka11ei',
  'template_iwv95wy',
  {
    to_email: data.email,    // l’adresse de la personne qui reçoit le e-book
    from_name: 'MonSite' ,   // ton nom ou marque pour signer l’email
    reply_to: 'alex.mondot.mail.pro@gmail.com', // ou ton email pro pour les réponses éventuelles
    phone: data.phone,
    message: data.message,
    ebook_link: `https://docs.google.com/document/d/1BR1gRLU5ETsNp0rSETR11VuCGHDifAc3rutM-N-itmw/edit?usp=sharing`
  },
  '01CBgWYFzjDtqlrdQ'
)

      toast.success('Formulaire envoyé avec succès ! Vérifiez vos emails pour télécharger votre eBook.')
      reset()
      setPhoneValue('')
    } catch (error) {
      console.error('Erreur EmailJS: ',error)
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneValue(value)
    setValue('phone', value || '')

    if (value) {
      const phoneNumber = parsePhoneNumberFromString(value)
      if (!phoneNumber || !phoneNumber.isValid()) {
        setError('phone', { type: 'manual', message: 'Numéro de téléphone invalide' })
      } else {
        clearErrors('phone')
      }
    } else {
      setError('phone', { type: 'manual', message: 'Numéro de téléphone requis' })
    }
  }

  return (
    <section id="contact" className="py-16 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center p-2 w-60 bg-white rounded-lg mx-auto dark:text-gray-900">Contactez-nous</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md space-y-6"
        >
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              id="name"
              {...register('name', { required: 'Le nom est requis' })}
              className={`w-full pl-10 p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute left-10 top-3 text-gray-500 dark:text-gray-100 px-2 rounded-lg pointer-events-none transition-all transform -translate-y-6 scale-75 origin-[0] bg-white dark:bg-gray-700 px-1 border-2 border-gray-900 dark:border-gray-100"
            >
              Nom
            </label>
            {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'L’email est requis',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Adresse email invalide'
                }
              })}
              className={`w-full pl-10 p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-10 top-3 text-gray-500 dark:text-gray-100 px-2 rounded-lg pointer-events-none transition-all transform -translate-y-6 scale-75 origin-[0] bg-white dark:bg-gray-700 px-1 border-2 border-gray-900 dark:border-gray-100"
            >
              Email
            </label>
            {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div className="relative">
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
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="absolute left-10 top-3 text-gray-500 dark:text-gray-100 px-2 rounded-lg pointer-events-none transition-all transform -translate-y-6 scale-75 origin-[0] bg-white dark:bg-gray-700 px-1 border-2 border-gray-900 dark:border-gray-100"
            >
              Téléphone
            </label>
            {errors.phone && <p className="text-red-500 mt-1">{errors.phone.message}</p>}
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
            <textarea
              id="message"
              {...register('message', { required: 'Le message est requis' })}
              className={`w-full pl-10 p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=" "
              rows={4}
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-10 top-3 text-gray-500 dark:text-gray-100 px-2 rounded-lg pointer-events-none transition-all transform -translate-y-6 scale-75 origin-[0] bg-white dark:bg-gray-700 px-1 border-2 border-gray-900 dark:border-gray-100"
            >
              Message
            </label>
            {errors.message && <p className="text-red-500 mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
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
          </button>
        </form>
        {/* Toast container */}
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
      </div>
    </section>
  )
}
