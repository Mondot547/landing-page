// src/components/Stars.tsx
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

type StarsProps = {
  rating: number
  maxStars?: number
}

export default function Stars({ rating, maxStars = 5 }: StarsProps) {
  const stars = []

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />)
    } else if (rating + 0.5 >= i) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />)
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />)
    }
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      <span className="ml-2 text-gray-600 font-semibold">{rating.toFixed(1)}</span>
    </div>
  )
}
