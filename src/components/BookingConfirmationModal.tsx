import React from 'react';
import { Booking } from '../types';
import { toArabicNumerals } from '../utils/formatters';
import { CheckCircle, QrCode, MapPin, Clock, ArrowRight, Share2, Sparkles } from 'lucide-react';

interface BookingConfirmationModalProps {
  booking: Booking | null;
  onClose: () => void;
  onViewAllBookings: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose,
  onViewAllBookings,
}) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        id="booking-success-modal"
        className="bg-[#faf6ee] rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto border border-[#e4d8c2] shadow-2xl p-6 text-right space-y-5"
      >
        {/* Success Icon */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#144e3f] text-white mx-auto flex items-center justify-center shadow-lg shadow-[#144e3f]/25 animate-bounce">
            <CheckCircle className="w-9 h-9 text-[#f4a261]" />
          </div>
          <h3 className="text-2xl font-black text-[#144e3f]">تم تأكيد حجزك بنجاح!</h3>
          <p className="text-xs text-[#586e63]">
            شكراً لإنقاذك وجبة طازجة وتقليل الهدر الغذائي 🌍
          </p>
        </div>

        {/* Digital Pickup Pass / Voucher with QR Code */}
        <div className="bg-white rounded-3xl p-5 border-2 border-dashed border-[#144e3f]/40 space-y-4 shadow-sm relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-[#ebdcc9] pb-3">
            <div>
              <div className="text-xs text-[#71887e] font-bold">كود الاستلام السريع</div>
              <div className="text-2xl font-black text-[#e58849] font-mono tracking-wider">
                {booking.bookingCode}
              </div>
            </div>
            <div className="p-2 bg-[#faf6ee] rounded-xl border border-[#ebdcc9]">
              <QrCode className="w-10 h-10 text-[#144e3f]" />
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-[#40564b]">
            <div className="font-bold text-sm text-[#144e3f]">{booking.offerTitle}</div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#144e3f]">المتجر:</span>
              <span>{booking.storeName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#e58849]" />
              <span>{booking.storeAddress}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#144e3f]" />
              <span className="font-bold text-[#144e3f]">ميعاد الاستلام: {booking.pickupWindow}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#ebdcc9] flex items-center justify-between font-bold text-xs">
            <span className="text-[#64796e]">طريقة الدفع:</span>
            <span className="text-[#144e3f]">
              {booking.paymentMethod === 'vodafone_cash' ? 'فودافون كاش' : booking.paymentMethod === 'card' ? 'كارت بنكي' : 'الدفع عند الاستلام'}
            </span>
          </div>

          <div className="flex items-center justify-between font-black text-sm text-[#144e3f]">
            <span>المبلغ الإجمالي:</span>
            <span className="text-lg text-[#e58849]">{toArabicNumerals(booking.totalAmount)} ج.م</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              onClose();
              onViewAllBookings();
            }}
            className="w-full py-3.5 rounded-2xl bg-[#144e3f] hover:bg-[#0f3c30] text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>عرض كل حجوزاتي</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-white border border-[#ded3be] text-[#144e3f] font-bold text-sm hover:bg-[#faf6ee] transition-colors cursor-pointer"
          >
            متابعة تصفح العروض
          </button>
        </div>
      </div>
    </div>
  );
};
