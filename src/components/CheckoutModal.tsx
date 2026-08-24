import React, { useState } from 'react';
import { SurplusOffer, Booking } from '../types';
import { toArabicNumerals } from '../utils/formatters';
import { 
  X, 
  CreditCard, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  Phone,
  User,
  ShoppingBag
} from 'lucide-react';

interface CheckoutModalProps {
  offer: SurplusOffer | null;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
  defaultCustomerName?: string;
  defaultCustomerPhone?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  offer,
  onClose,
  onConfirmBooking,
  defaultCustomerName = 'محمد أحمد',
  defaultCustomerPhone = '01012345678',
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'vodafone_cash' | 'cash_on_pickup'>('vodafone_cash');
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState(defaultCustomerName);
  const [customerPhone, setCustomerPhone] = useState(defaultCustomerPhone);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!offer) return null;

  const subtotal = offer.price * quantity;
  // عمولة المنصة والخدمة: 5 جنيه لكل 100 جنيه (5%)
  const commissionRate = 0.05;
  const serviceFee = Math.max(1, Math.round(subtotal * commissionRate));
  const totalAmount = subtotal + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking: Booking = {
        id: `BOOK-${Date.now().toString().slice(-6)}`,
        bookingCode: `WAF-${Math.floor(1000 + Math.random() * 9000)}`,
        offerId: offer.id,
        offerTitle: offer.title,
        storeName: offer.storeName,
        price: offer.price,
        quantity,
        subtotal,
        serviceFee,
        totalAmount,
        paymentMethod,
        pickupWindow: offer.pickupWindow,
        storeAddress: offer.fullAddress,
        imageUrl: offer.imageUrl,
        createdAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        status: 'confirmed',
        customerName,
        customerPhone,
      };

      setIsSubmitting(false);
      onConfirmBooking(newBooking);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        id="checkout-modal"
        className="bg-[#faf6ee] w-full max-w-lg rounded-3xl border border-[#ded3be] shadow-2xl overflow-hidden text-right relative animate-in zoom-in-95"
      >
        {/* Header with Close */}
        <div className="px-6 py-4 border-b border-[#e6dbc8] flex items-center justify-between bg-[#f5ece0]">
          <h2 className="text-lg font-black text-[#144e3f] flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#e58849]" />
            <span>إتمام حجز صندوق التوفير</span>
          </h2>
          <button
            id="close-checkout-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#eae0cd] text-[#144e3f] flex items-center justify-center transition-colors cursor-pointer border border-[#ded3be]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
          
          {/* Top Summary Card matching Screenshot 2 */}
          <div className="bg-[#ebdcc9]/60 rounded-2xl p-4 border border-[#decfba] flex items-center justify-between gap-4">
            <div className="text-right">
              <h3 className="text-sm sm:text-base font-black text-[#144e3f]">
                {offer.title}
              </h3>
              <p className="text-xs text-[#5f7469] mt-0.5 font-medium">
                {offer.storeName}
              </p>
              <div className="text-lg sm:text-xl font-black text-[#144e3f] mt-1">
                {toArabicNumerals(totalAmount)} ج
              </div>
            </div>

            <img
              src={offer.imageUrl}
              alt={offer.title}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-xl object-cover border border-[#d6c7b0] shrink-0"
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-[#ded3be]">
            <span className="text-xs font-bold text-[#144e3f]">عدد الصناديق المطلوبة:</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-[#f0e8d9] text-[#144e3f] font-black text-base hover:bg-[#e4dcba] transition-colors cursor-pointer flex items-center justify-center"
              >
                -
              </button>
              <span className="font-black text-sm text-[#144e3f] w-4 text-center">
                {toArabicNumerals(quantity)}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(offer.remainingCount, quantity + 1))}
                className="w-8 h-8 rounded-lg bg-[#144e3f] text-white font-black text-base hover:bg-[#0e3b2f] transition-colors cursor-pointer flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#144e3f] uppercase tracking-wider">
              بيانات المستلم
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="relative">
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="الاسم بالكامل"
                  className="w-full pl-3 pr-9 py-2.5 bg-white rounded-xl border border-[#ded3be] text-xs font-bold text-[#144e3f] focus:ring-2 focus:ring-[#144e3f] focus:outline-none"
                />
                <User className="w-4 h-4 text-[#8b9e95] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="رقم الموبايل (واتساب)"
                  className="w-full pl-3 pr-9 py-2.5 bg-white rounded-xl border border-[#ded3be] text-xs font-bold text-[#144e3f] focus:ring-2 focus:ring-[#144e3f] focus:outline-none text-left"
                />
                <Phone className="w-4 h-4 text-[#8b9e95] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Payment Methods matching Screenshot 2 */}
          <div className="space-y-2.5">
            <h3 className="text-base font-black text-[#144e3f]">
              طرق الدفع
            </h3>

            {/* Vodafone Cash */}
            <label 
              id="pay-option-vodafone"
              className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'vodafone_cash'
                  ? 'bg-white border-[#144e3f] ring-2 ring-[#144e3f]/20 shadow-xs'
                  : 'bg-[#faf6ee] border-[#ded3be] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="vodafone_cash"
                  checked={paymentMethod === 'vodafone_cash'}
                  onChange={() => setPaymentMethod('vodafone_cash')}
                  className="w-4 h-4 accent-[#144e3f] text-[#144e3f]"
                />
                <span className="text-sm font-black text-[#144e3f]">فودافون كاش ومحافظ المحمول</span>
              </div>

              {/* Vodafone Logo Badge matching Screenshot 2 */}
              <div className="w-7 h-7 rounded-md bg-[#e60000] flex items-center justify-center text-white font-bold text-[9px] shadow-xs">
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center font-serif text-[10px]">
                  ✓
                </div>
              </div>
            </label>

            {/* Bank Card */}
            <label 
              id="pay-option-card"
              className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'card'
                  ? 'bg-white border-[#144e3f] ring-2 ring-[#144e3f]/20 shadow-xs'
                  : 'bg-[#faf6ee] border-[#ded3be] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="w-4 h-4 accent-[#144e3f] text-[#144e3f]"
                />
                <span className="text-sm font-black text-[#144e3f]">كارت بنكي (فيزا / ميزة / ماستركارد)</span>
              </div>
              <CreditCard className="w-5 h-5 text-[#144e3f]" />
            </label>

            {/* Cash on Pickup */}
            <label 
              id="pay-option-cash"
              className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                paymentMethod === 'cash_on_pickup'
                  ? 'bg-white border-[#144e3f] ring-2 ring-[#144e3f]/20 shadow-xs'
                  : 'bg-[#faf6ee] border-[#ded3be] hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="cash_on_pickup"
                  checked={paymentMethod === 'cash_on_pickup'}
                  onChange={() => setPaymentMethod('cash_on_pickup')}
                  className="w-4 h-4 accent-[#144e3f] text-[#144e3f]"
                />
                <span className="text-sm font-black text-[#144e3f]">الدفع نقداً عند الاستلام</span>
              </div>
              <span className="text-xs font-bold text-[#62776c] bg-[#ede6d8] px-2 py-0.5 rounded">كاش</span>
            </label>
          </div>

          {/* Pickup Window matching Screenshot 2 */}
          <div className="space-y-1">
            <h3 className="text-sm font-black text-[#144e3f]">
              ميعاد الاستلام
            </h3>
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#ede5d6] border border-[#ded2bd] text-[#144e3f]">
              <span className="text-xs font-semibold text-[#5a6f64]">نافذة الاستلام بالفرع:</span>
              <div className="flex items-center gap-1.5 font-black text-sm">
                <Clock className="w-4 h-4 text-[#144e3f]" />
                <span>{offer.pickupWindow}</span>
              </div>
            </div>
          </div>

          {/* Price Breakdown & Commission (5 EGP per 100 EGP) */}
          <div className="bg-white rounded-2xl p-4 border border-[#ded3be] space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-[#5c7267]">
              <span>قيمة الوجبات ({toArabicNumerals(quantity)} صندوق):</span>
              <span className="font-black text-[#144e3f]">{toArabicNumerals(subtotal)} ج.م</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-[#5c7267]">
              <div className="flex items-center gap-1.5">
                <span>عمولة المنصة والخدمة:</span>
                <span className="text-[10px] bg-[#faefe5] text-[#b45309] font-black px-1.5 py-0.5 rounded">
                  ٥ ج لكل ١٠٠ ج (٥٪)
                </span>
              </div>
              <span className="font-black text-[#e58849]">+{toArabicNumerals(serviceFee)} ج.م</span>
            </div>

            <div className="pt-2 border-t border-[#ede5d6] flex items-center justify-between">
              <span className="text-sm font-black text-[#144e3f]">المبلغ الإجمالي للدفع:</span>
              <div className="text-right">
                <span className="text-lg sm:text-xl font-black text-[#144e3f]">
                  {toArabicNumerals(totalAmount)} ج.م
                </span>
              </div>
            </div>
          </div>

          {/* Warning Banner matching Screenshot 2 */}
          <div className="bg-[#fceddc] border border-[#f5cb98] text-[#8e4508] p-3 rounded-2xl flex items-center gap-2.5 text-xs font-bold shadow-xs">
            <AlertTriangle className="w-5 h-5 text-[#e58849] shrink-0" />
            <span>برجاء العلم أن الحجز غير قابل للاسترجاع بعد التأكيد لضمان جودة الأطعمة الطازجة.</span>
          </div>

          {/* Confirm Button matching Screenshot 2 */}
          <div>
            <button
              type="submit"
              id="confirm-booking-btn"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-[#144e3f] hover:bg-[#0e3a2e] active:scale-98 text-white font-black text-base transition-all shadow-md shadow-[#144e3f]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>جاري تأكيد الحجز...</span>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-[#f4a261]" />
                  <span>تأكيد الحجز ({toArabicNumerals(totalAmount)} ج.م)</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
