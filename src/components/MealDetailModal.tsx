import React, { useState, useEffect } from 'react';
import { SurplusOffer } from '../types';
import { formatCountdownHMS, toArabicNumerals } from '../utils/formatters';
import { X, Star, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface MealDetailModalProps {
  offer: SurplusOffer | null;
  onClose: () => void;
  onProceedToCheckout: (offer: SurplusOffer) => void;
}

export const MealDetailModal: React.FC<MealDetailModalProps> = ({
  offer,
  onClose,
  onProceedToCheckout,
}) => {
  if (!offer) return null;

  const [secondsLeft, setSecondsLeft] = useState(offer.expiryMinutes * 60);

  useEffect(() => {
    setSecondsLeft(offer.expiryMinutes * 60);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [offer]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="meal-detail-modal"
        className="bg-[#faf6ee] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#e4d9c4] shadow-2xl relative text-right"
      >
        {/* Close Button */}
        <button
          id="close-detail-modal-btn"
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#144e3f] flex items-center justify-center shadow-md cursor-pointer transition-transform active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image with Badge */}
        <div className="relative w-full h-64 bg-[#dfd4bd] overflow-hidden rounded-t-3xl">
          <img
            src={offer.imageUrl}
            alt={offer.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/95 text-[#144e3f] font-black text-xs px-3 py-1.5 rounded-full border-2 border-dashed border-[#144e3f] shadow-md">
            باقي {toArabicNumerals(Math.ceil(offer.expiryMinutes / 60))} ساعات
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Restaurant Title & Info */}
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#144e3f]">{offer.storeName}</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-[#556c60]">
              <span className="flex items-center gap-1 text-[#b47712]">
                <Star className="w-4 h-4 fill-[#f4a261] text-[#f4a261]" />
                {offer.rating} ({offer.reviewsCount})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#e58849]" />
                {toArabicNumerals(offer.distanceKm)} كم
              </span>
              <span>•</span>
              <span>{offer.fullAddress}</span>
            </div>
          </div>

          <div className="h-px bg-[#e4d8c2]" />

          {/* What's in the Box? */}
          <div className="space-y-2">
            <h3 className="text-lg font-black text-[#144e3f]">إيه اللي جوه الصندوق؟</h3>
            <p className="text-sm text-[#4a5f54] leading-relaxed bg-[#f3ecdd] p-3.5 rounded-2xl border border-[#e5dcce]">
              {offer.description}
            </p>
          </div>

          {/* Price & Countdown Timer */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#e0d5c0] shadow-xs">
            <div className="space-y-1">
              <div className="text-xs text-[#71857c] font-bold">ينتهي خلال:</div>
              <div className="text-xl font-black text-[#144e3f] tracking-wider font-mono">
                {formatCountdownHMS(secondsLeft)}
              </div>
            </div>

            <div className="text-left">
              <span className="text-xs text-[#9aa9a1] line-through font-bold ml-2">
                {toArabicNumerals(offer.originalPrice)} ج.م
              </span>
              <span className="text-2xl font-black text-[#e58849]">
                {toArabicNumerals(offer.price)} ج.م
              </span>
            </div>
          </div>

          {/* Location Map Preview snippet */}
          <div className="bg-[#f3ecdd] p-3 rounded-2xl border border-[#e5dcce] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#144e3f]">
              <div className="w-8 h-8 rounded-xl bg-[#144e3f] text-white flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#f4a261]" />
              </div>
              <div>
                <div>موقع الاستلام: {offer.area}</div>
                <div className="text-[11px] text-[#6b7f75] font-normal">{offer.pickupWindow}</div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#e58849] bg-white px-3 py-1.5 rounded-xl border border-[#e5dcce]">
              عرض الاتجاهات 📍
            </span>
          </div>

          {/* Action Button */}
          <button
            id="modal-checkout-btn"
            onClick={() => onProceedToCheckout(offer)}
            className="w-full py-4 rounded-2xl bg-[#144e3f] hover:bg-[#0f3c30] active:scale-98 text-white font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-[#144e3f]/25 transition-all cursor-pointer"
          >
            <span>احجز وادفع دلوقتي</span>
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
