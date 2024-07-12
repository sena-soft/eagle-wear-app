import { StarIcon } from "@heroicons/react/24/outline";
import { RatingProps } from "./types";



const StarRating = ({ rating }: RatingProps) => {
  const { rate, count } = rating;
  const fullStars = Math.round(rate);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={`full${index}`} className="w-5 h-5 text-yellow-500" />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <StarIcon key={`empty${index}`} className="w-5 h-5 text-gray-300" />
      ))}
      <span className="ml-2 text-gray-600">({count})</span>
    </div>
  );
};

export default StarRating;
