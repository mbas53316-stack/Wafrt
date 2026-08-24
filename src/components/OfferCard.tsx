import React from 'react';
import { SurplusOffer } from '../types';
import { formatRemainingText, toArabicNumerals } from '../utils/formatters';
import { MapPin, Clock, Star, Flame, Sparkles } from 'lucide-react';

interface OfferCardProps {
  offer: SurplusOffer;
  onSelect: (offer: SurplusOffer) => void;
  onQuickBook?: (offer: SurplusOffer) => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  onSelect,
  onQuickBook,
}) => {
  const discountPercent = Math.round(
    ((offer.originalPrice - offer.price) / offer.originalPrice) * 100
  );

  return (
    <div 
      id={`offer-card-${offer.id}`}
      onClick={() => onSelect(offer)}
      className="group bg-[#f7f2e7] hover:bg-[#ffffff] rounded-2xl p-3 sm:p-4 border border-[#e5dcce] hover:border-[#144e3f]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      {/* Top Banner Image with Stock Badge */}
      <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-[#e0d6c1] mb-3">
        <img
          src={offer.imageUrl}
          alt={offer.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Remaining stock badge */}
        <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-[#144e3f] font-bold text-xs px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 border border-[#e0d6c1]">
          <Flame className="w-3.5 h-3.5 text-[#e58849]" />
          <span>{toArabicNumerals(offer.remainingCount)} قطع فاضلة</span>
        </div>

        {/* Discount Badge */}
        <div className="absolute top-2.5 left-2.5 bg-[#b83232] text-white font-extrabold text-xs px-2 py-0.5 rounded-md shadow-xs">
          خصم {toArabicNumerals(discountPercent)}%
        </div>

        {/* Category & Distance pill */}
        <div className="absolute bottom-2 right-2 bg-black/65 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#f4a261]" />
          <span>{toArabicNumerals(offer.distanceKm)} كم • {offer.area}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Store Name and Rating */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-xs font-bold text-[#62776d] truncate">
              {offer.storeName}
            </h4>
            <div className="flex items-center gap-1 text-xs font-bold text-[#b47712] shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#f4a261] text-[#f4a261]" />
              <span>{offer.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-black text-[#144e3f] group-hover:text-[#e58849] transition-colors line-clamp-1 mb-2">
            {offer.title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#6a7c73] line-clamp-2 leading-relaxed mb-3">
            {offer.description}
          </p>
        </div>

        {/* Pricing and Expiry Section */}
        <div className="pt-2 border-t border-[#e8dfcf] flex items-center justify-between">
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-black text-[#e58849]">
              {toArabicNumerals(offer.price)} ج.م
            </span>
            <span className="text-xs text-[#8f9f97] line-through font-semibold">
              {toArabicNumerals(offer.originalPrice)} ج.م
            </span>
          </div>

          {/* Remaining Time */}
          <div className="text-[11px] font-bold text-[#577265] flex items-center gap-1 bg-[#ede6d8] px-2.5 py-1 rounded-lg">
            <Clock className="w-3 h-3 text-[#e58849]" />
            <span>{formatRemainingText(offer.expiryMinutes)}</span>
          </div>
        </div>

        {/* Quick action button */}
        <div className="mt-3">
          <button
            id={`book-btn-${offer.id}`}
            onClick={(e) => {
              e.stopPropagation();
              if (onQuickBook) {
                onQuickBook(offer);
              } else {
                onSelect(offer);
              }
            }}
            className="w-full py-2 rounded-xl bg-[#144e3f] hover:bg-[#0e3b2f] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f4a261]" />
            <span>احجز الآن واستلم</span>
          </button>
        </div>

      </div>
    </div>
  );
};
