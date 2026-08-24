import React, { useState, useEffect } from 'react';
import { SurplusOffer } from '../types';
import { toArabicNumerals, formatCountdownHMS } from '../utils/formatters';
import { 
  X, 
  MapPin, 
  Clock, 
  Star, 
  ShieldCheck, 
  Navigation, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  HelpCircle,
  Share2
} from 'lucide-react';

interface OfferDetailsModalProps {
  offer: SurplusOffer | null;
  onClose: () => void;
  onProceedToBooking: (offer: SurplusOffer) => void;
}

export const OfferDetailsModal: React.FC<OfferDetailsModalProps> = ({
  offer,
  onClose,
  onProceedToBooking,
}) => {
  // Countdown timer in seconds
  const [secondsLeft, setSecondsLeft] = useState<number>(
    offer ? offer.expiryMinutes * 60 : 3600
  );

  useEffect(() => {
    if (!offer) return;
    setSecondsLeft(offer.expiryMinutes * 60);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [offer]);

  if (!offer) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        id="offer-details-modal"
        className="bg-[#faf6ee] w-full max-w-lg rounded-3xl border border-[#ded3be] shadow-2xl overflow-hidden text-right relative animate-in zoom-in-95"
      >
        {/* Close Button */}
        <button
          id="close-offer-details-btn"
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Product Image with Rescue Stamp Badge matching Screenshot 4 */}
        <div className="relative w-full h-64 sm:h-72 bg-[#e2d7c2] overflow-hidden">
          <img
            src={offer.imageUrl}
            alt={offer.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />

          {/* Rescue Stamp Pill matching Screenshot 4 ("باقي ١٦ ساعة" / Rescue Stamp) */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs rounded-full p-2.5 shadow-md border-2 border-dashed border-[#e58849] flex flex-col items-center justify-center min-w-[72px] text-center">
            <span className="text-[10px] font-bold text-[#62776c]">باقي</span>
            <span className="text-sm font-black text-[#e58849]">
              {toArabicNumerals(Math.ceil(offer.expiryMinutes / 60))} ساعات
            </span>
          </div>

          {/* Floating Stock Alert */}
          <div className="absolute bottom-4 right-4 bg-[#144e3f]/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-[#f4a261]" />
            <span>متبقي {toArabicNumerals(offer.remainingCount)} وجبات فقط اليوم</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Store Info & Rating matching Screenshot 4 */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black text-[#144e3f]">
                {offer.storeName}
              </h2>
              <div className="flex items-center gap-1.5 bg-[#f5ede0] px-3 py-1 rounded-full border border-[#ded3be]">
                <Star className="w-4 h-4 fill-[#f4a261] text-[#f4a261]" />
                <span className="text-xs font-black text-[#144e3f]">{offer.rating}</span>
                <span className="text-[11px] text-[#71867c]">({toArabicNumerals(offer.reviewsCount)})</span>
              </div>
            </div>

            <p className="text-xs text-[#63776d] mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#e58849]" />
              <span>{offer.fullAddress} • {toArabicNumerals(offer.distanceKm)} كم</span>
            </p>
          </div>

          <hr className="border-[#e7dcce]" />

          {/* Section: "إيه اللي جوه الصندوق؟" matching Screenshot 4 */}
          <div>
            <h3 className="text-base font-black text-[#144e3f] mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#e58849]" />
              <span>إيه اللي جوه الصندوق؟</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#4e6459] leading-relaxed bg-[#f4ede1] p-3.5 rounded-2xl border border-[#e4d8c2]">
              {offer.description}
            </p>
          </div>

          {/* Price & Rescue Countdown Display */}
          <div className="bg-[#ffffff] rounded-2xl p-4 border border-[#e2d7c0] shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs text-[#71867c] font-bold mb-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#b83232]" />
                <span>ينتهي خلال:</span>
              </div>
              <div className="text-lg sm:text-xl font-mono font-black text-[#b83232] tracking-wider">
                {formatCountdownHMS(secondsLeft)}
              </div>
            </div>

            <div className="text-left">
              <div className="text-xs text-[#8f9f97] line-through font-bold">
                {toArabicNumerals(offer.originalPrice)} ج.م
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#e58849]">
                {toArabicNumerals(offer.price)} ج.م
              </div>
            </div>
          </div>

          {/* Mini Interactive Map & Directions */}
          <div className="rounded-2xl border border-[#ded3be] overflow-hidden bg-[#e8f1ec] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#144e3f]">موقع الاستلام المحدد</span>
              <span className="text-xs text-[#e58849] font-black">نافذة: {offer.pickupWindow}</span>
            </div>
            
            <div className="h-24 rounded-xl bg-[#dbeae3] border border-[#cbdcd3] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#144e3f_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="relative z-10 flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl shadow-xs border border-[#cbdcd3]">
                <MapPin className="w-4 h-4 text-[#e58849]" />
                <span className="text-xs font-black text-[#144e3f]">{offer.area}</span>
              </div>
            </div>
          </div>

          {/* Main Action Button matching Screenshot 4 */}
          <div className="pt-2">
            <button
              id="proceed-to-checkout-btn"
              onClick={() => onProceedToBooking(offer)}
              className="w-full py-3.5 rounded-2xl bg-[#144e3f] hover:bg-[#0e3a2e] active:scale-98 text-white font-black text-base transition-all shadow-md shadow-[#144e3f]/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#f4a261]" />
              <span>احجز وادفع دلوقتي</span>
            </button>
            <p className="text-[11px] text-center text-[#758a7f] mt-2">
              ضمان استلام وجبة طازجة وصالحة ١٠٠٪ أو استرداد كامل المبلغ
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
