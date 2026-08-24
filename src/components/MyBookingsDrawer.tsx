import React from 'react';
import { Booking } from '../types';
import { toArabicNumerals } from '../utils/formatters';
import { QrCode, MapPin, Clock, CheckCircle, Sparkles, ArrowLeft, ShoppingBag } from 'lucide-react';

interface MyBookingsDrawerProps {
  bookings: Booking[];
  onOpenOfferDetail: (offerId: string) => void;
  onExploreMore: () => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  bookings,
  onExploreMore,
}) => {
  const totalMoneySaved = bookings.reduce((sum, b) => sum + b.price * 1.5, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-right">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onExploreMore}
          className="text-xs font-bold text-[#144e3f] bg-white px-3.5 py-2 rounded-xl border border-[#ded3be] flex items-center gap-1.5 hover:bg-[#faf6ee] cursor-pointer"
        >
          <span>تصفح المزيد من العروض</span>
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#144e3f]">حجوزاتي ووجباتي المنقذة</h2>
          <p className="text-xs text-[#6e8579]">أكواد الاستلام وتفاصيل الطلبات السابقة</p>
        </div>
      </div>

      {/* Impact summary card */}
      <div className="bg-[#144e3f] text-white rounded-3xl p-6 shadow-md grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="text-xs text-[#b8ded0] font-semibold">إجمالي الوجبات التي أنقذتها</div>
          <div className="text-3xl font-black text-[#f4a261]">{bookings.length} وجبة</div>
        </div>
        <div className="space-y-1 border-y sm:border-y-0 sm:border-x border-[#236a57] py-2 sm:py-0">
          <div className="text-xs text-[#b8ded0] font-semibold">الأموال التي وفرتها</div>
          <div className="text-3xl font-black text-white">{toArabicNumerals(Math.round(totalMoneySaved))} ج.م</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-[#b8ded0] font-semibold">تأثيرك البيئي الإيجابي</div>
          <div className="text-3xl font-black text-[#f4a261]">{(bookings.length * 2.5).toFixed(1)} كجم CO2</div>
        </div>
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#ded3be] space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#faf6ee] text-[#144e3f] mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-[#e58849]" />
          </div>
          <h3 className="text-lg font-black text-[#144e3f]">لا توجد حجوزات نشطة حالياً</h3>
          <p className="text-xs text-[#6e8579] max-w-xs mx-auto">
            تصفح الخريطة وقائمة المطاعم واحجز أول وجبة لك بخصم كبير وساهم في تقليل الهدر!
          </p>
          <button
            onClick={onExploreMore}
            className="px-6 py-3 rounded-2xl bg-[#144e3f] text-white font-bold text-sm shadow-md"
          >
            استكشف عروض اليوم 🚀
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-3xl p-5 border border-[#ded3be] shadow-xs flex flex-col md:flex-row items-center justify-between gap-5"
            >
              {/* Pickup Voucher Badge */}
              <div className="bg-[#faf6ee] p-4 rounded-2xl border-2 border-dashed border-[#144e3f]/30 flex items-center gap-4 w-full md:w-auto">
                <QrCode className="w-12 h-12 text-[#144e3f] shrink-0" />
                <div className="text-right">
                  <div className="text-[10px] text-[#6d8479] font-bold">كود الاستلام</div>
                  <div className="text-xl font-black text-[#e58849] font-mono tracking-wider">{booking.bookingCode}</div>
                  <div className="text-[11px] text-[#144e3f] font-bold">جاهز للاستلام ⏱️</div>
                </div>
              </div>

              {/* Booking Info */}
              <div className="space-y-1 text-right flex-1 w-full">
                <div className="font-black text-base text-[#144e3f]">{booking.offerTitle}</div>
                <div className="text-xs text-[#6e8579] font-semibold">{booking.storeName}</div>
                <div className="flex items-center gap-1.5 text-xs text-[#4e6459]">
                  <MapPin className="w-3.5 h-3.5 text-[#e58849]" />
                  <span>{booking.storeAddress}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#144e3f]">
                  <Clock className="w-3.5 h-3.5 text-[#144e3f]" />
                  <span>ميعاد الاستلام: {booking.pickupWindow}</span>
                </div>
              </div>

              {/* Price & Image */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[#eee]">
                <div className="text-left">
                  <div className="text-base font-black text-[#e58849]">
                    {toArabicNumerals(booking.totalAmount)} ج.م
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#e6f4ea] text-[#137333]">
                    مدفوع بالكامل
                  </span>
                </div>
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#e0d6c1] shrink-0">
                  <img src={booking.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
