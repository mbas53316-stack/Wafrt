import React, { useState } from 'react';
import { Booking } from '../types';
import { toArabicNumerals } from '../utils/formatters';
import { 
  ShoppingBag, 
  QrCode, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles,
  X,
  CreditCard,
  Copy,
  Check
} from 'lucide-react';

interface BookingsViewProps {
  bookings: Booking[];
  onExploreClick: () => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  bookings,
  onExploreClick,
}) => {
  const [activeQrBooking, setActiveQrBooking] = useState<Booking | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-right">
          <h1 className="text-2xl sm:text-3xl font-black text-[#144e3f]">
            حجوزاتي وطلباتي
          </h1>
          <p className="text-xs sm:text-sm text-[#5a7266] mt-1">
            أظهر كود الحجز أو رمز QR للمتجر عند الاستلام
          </p>
        </div>

        <button
          onClick={onExploreClick}
          className="px-4 py-2 rounded-xl bg-[#144e3f] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#0e3b2f]"
        >
          <span>تصفح المزيد</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-[#f5ece0] rounded-3xl p-10 sm:p-14 text-center border border-[#e4d8c1] space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#144e3f]/10 text-[#144e3f] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 text-[#e58849]" />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#144e3f]">
            ليس لديك أي حجوزات بعد
          </h3>
          <p className="text-xs sm:text-sm text-[#61776c] max-w-md mx-auto">
            ابدأ الآن بإنقاذ أول وجبة طازجة من مطعمك المفضل ووفر حتى 70% من سعرها الأصلي!
          </p>
          <button
            onClick={onExploreClick}
            className="mt-2 px-6 py-3 rounded-2xl bg-[#e58849] hover:bg-[#d47839] text-white font-black text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>استكشف عروض اليوم القريبة منك</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-[#faf6ee] rounded-3xl p-4 sm:p-6 border border-[#e4d8c2] shadow-xs flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden"
            >
              {/* Offer Info */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <img
                  src={b.imageUrl}
                  alt={b.offerTitle}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-[#ded2bd] shrink-0"
                />

                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#e58849] bg-[#faefe5] px-2.5 py-0.5 rounded-md">
                      {b.bookingCode}
                    </span>
                    <span className="text-xs font-bold text-[#144e3f] bg-[#e3f0ea] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#144e3f]" />
                      <span>مؤكد وجاهز</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-[#144e3f] mt-1">
                    {b.offerTitle}
                  </h3>

                  <p className="text-xs text-[#5e7368] font-medium mt-0.5">
                    {b.storeName} ({toArabicNumerals(b.quantity)} صندوق)
                  </p>

                  <div className="flex items-center gap-3 text-xs text-[#6e8278] mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#e58849]" />
                      <span>الاستلام: {b.pickupWindow}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & QR Code Action */}
              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-[#eee4d2]">
                <div className="text-right">
                  <div className="text-xs text-[#71867c] font-bold">المبلغ الإجمالي</div>
                  <div className="text-xl sm:text-2xl font-black text-[#144e3f]">
                    {toArabicNumerals(b.totalAmount)} ج.م
                  </div>
                  <div className="text-[11px] text-[#71867c] flex items-center gap-1">
                    <span>(شامل {toArabicNumerals(b.serviceFee || Math.max(1, Math.round((b.price * b.quantity) * 0.05)))} ج عمولة المنصة)</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveQrBooking(b)}
                  className="px-4 py-3 rounded-2xl bg-[#144e3f] hover:bg-[#0e3b2f] text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-[#f4a261]" />
                  <span>عرض كود الاستلام</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Code Pickup Modal */}
      {activeQrBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#faf6ee] w-full max-w-sm rounded-3xl border border-[#ded3be] shadow-2xl p-6 text-center relative animate-in zoom-in-95">
            <button
              onClick={() => setActiveQrBooking(null)}
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#f0e7d7] text-[#144e3f] flex items-center justify-center hover:bg-[#e4dcba] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex p-3 rounded-2xl bg-[#144e3f]/10 text-[#144e3f] mb-3">
              <QrCode className="w-8 h-8 text-[#144e3f]" />
            </div>

            <h3 className="text-lg font-black text-[#144e3f]">
              رمز استلام الوجبة
            </h3>
            <p className="text-xs text-[#63776d] mt-1">
              أظهر هذا الرمز للكاشير عند الوصول إلى المتجر
            </p>

            {/* Generated Simulated QR Code Graphic */}
            <div className="my-5 p-4 bg-white rounded-2xl border-2 border-dashed border-[#144e3f]/30 inline-block shadow-inner">
              <div className="w-44 h-44 bg-[#144e3f] p-3 rounded-xl flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-10 h-10 bg-white rounded-md border-4 border-[#144e3f] flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#144e3f] rounded-xs" />
                  </div>
                  <div className="w-10 h-10 bg-white rounded-md border-4 border-[#144e3f] flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#144e3f] rounded-xs" />
                  </div>
                </div>
                <div className="text-center font-mono font-black text-white text-xs tracking-widest bg-white/15 py-1 rounded">
                  {activeQrBooking.bookingCode}
                </div>
                <div className="flex justify-between">
                  <div className="w-10 h-10 bg-white rounded-md border-4 border-[#144e3f] flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#144e3f] rounded-xs" />
                  </div>
                  <div className="w-10 h-10 bg-white/30 rounded-md flex items-center justify-center text-white text-lg">
                    ✨
                  </div>
                </div>
              </div>
            </div>

            {/* Copyable Code */}
            <div className="bg-[#ede5d5] p-3 rounded-2xl border border-[#ded2bd] flex items-center justify-between">
              <div className="text-right">
                <div className="text-[10px] text-[#71867c] font-bold">كود الاستلام السريع</div>
                <div className="text-base font-black text-[#144e3f] tracking-wider">
                  {activeQrBooking.bookingCode}
                </div>
              </div>
              <button
                onClick={() => handleCopy(activeQrBooking.bookingCode)}
                className="px-3 py-1.5 rounded-xl bg-white text-[#144e3f] text-xs font-bold flex items-center gap-1 shadow-2xs hover:bg-[#faf6ee] cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#e58849]" />}
                <span>{copiedCode ? 'تم النسخ' : 'نسخ'}</span>
              </button>
            </div>

            {/* Receipt Summary Breakdown */}
            <div className="mt-3 p-3 bg-white rounded-2xl border border-[#ded3be] text-xs space-y-1.5 text-right">
              <div className="flex justify-between text-[#687f73]">
                <span>قيمة الوجبات ({toArabicNumerals(activeQrBooking.quantity)}):</span>
                <span className="font-bold text-[#144e3f]">{toArabicNumerals(activeQrBooking.subtotal || (activeQrBooking.price * activeQrBooking.quantity))} ج.م</span>
              </div>
              <div className="flex justify-between text-[#687f73]">
                <span>عمولة المنصة والخدمة (٥ ج لكل ١٠٠ ج):</span>
                <span className="font-bold text-[#e58849]">+{toArabicNumerals(activeQrBooking.serviceFee || Math.max(1, Math.round((activeQrBooking.price * activeQrBooking.quantity) * 0.05)))} ج.م</span>
              </div>
              <div className="pt-1.5 border-t border-[#ede5d6] flex justify-between font-black text-[#144e3f]">
                <span>الإجمالي للدفع:</span>
                <span className="text-sm">{toArabicNumerals(activeQrBooking.totalAmount)} ج.م</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-[#526b5e] font-semibold flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#e58849]" />
              <span>نافذة الاستلام: {activeQrBooking.pickupWindow}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
