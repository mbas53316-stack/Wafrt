import React, { useState } from 'react';
import { SurplusOffer, MerchantStats } from '../types';
import { toArabicNumerals, formatCountdownHMS } from '../utils/formatters';
import { 
  Plus, 
  TrendingUp, 
  Utensils, 
  Star, 
  Clock, 
  Settings, 
  ClipboardList, 
  BarChart3, 
  Package, 
  CheckCircle, 
  Sparkles,
  Edit,
  Trash2,
  AlertCircle
} from 'lucide-react';

interface MerchantDashboardProps {
  offers: SurplusOffer[];
  stats: MerchantStats;
  onAddNewOffer: () => void;
  onDeleteOffer: (id: string) => void;
  onBackToCustomerView: () => void;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({
  offers,
  stats,
  onAddNewOffer,
  onDeleteOffer,
  onBackToCustomerView,
}) => {
  const [activeTab, setActiveTab] = useState<'current_offers' | 'earnings' | 'orders' | 'settings'>('current_offers');

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 pb-24">
      
      {/* Top Header Bar matching Screenshot 1 */}
      <div className="bg-[#144e3f] text-white rounded-3xl p-5 sm:p-6 mb-6 shadow-md flex items-center justify-between">
        
        {/* Left on RTL: Add New Offer Button */}
        <button
          id="merchant-add-offer-btn"
          onClick={onAddNewOffer}
          className="px-4 sm:px-5 py-2.5 rounded-2xl bg-[#e58849] hover:bg-[#d47839] active:scale-98 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عرض جديد</span>
        </button>

        {/* Right on RTL: Dashboard Title */}
        <div className="text-right">
          <h1 className="text-xl sm:text-2xl font-black text-white">
            لوحة التحكم
          </h1>
          <p className="text-xs text-[#c6ded5] mt-0.5">
            مطعم ومخبز الشريك • فرع الزمالك والدقي
          </p>
        </div>

      </div>

      {/* 3 Summary Stats Cards matching Screenshot 1 */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
        
        {/* Total Earnings */}
        <div className="bg-[#ebdcc9] rounded-2xl p-3 sm:p-5 border border-[#dfcfbb] text-right flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-black text-[#144e3f] truncate">
              إجمالي الأرباح
            </span>
            <div className="w-6 h-6 rounded-full bg-[#144e3f] text-white flex items-center justify-center text-[10px] font-black shrink-0">
              ج
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-sm sm:text-2xl font-black text-[#144e3f]">
                {toArabicNumerals(stats.totalEarnings.toLocaleString())}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#445b50]">ج.م</span>
            </div>
            <div className="flex items-center justify-end gap-1 text-[10px] sm:text-xs text-[#144e3f] font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#144e3f]" />
              <span>+١٨٪ اليوم</span>
            </div>
          </div>
        </div>

        {/* Rescued Meals */}
        <div className="bg-[#ebdcc9] rounded-2xl p-3 sm:p-5 border border-[#dfcfbb] text-right flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-black text-[#144e3f] truncate">
              وجبات أنقذتها
            </span>
            <div className="text-[#144e3f] text-sm shrink-0">
              🍲
            </div>
          </div>

          <div className="mt-3 text-right">
            <div className="text-base sm:text-2xl font-black text-[#144e3f]">
              {toArabicNumerals(stats.rescuedMealsCount)}
            </div>
            <div className="text-[10px] sm:text-xs text-[#526b5e] font-semibold mt-1">
              وجبة طازجة
            </div>
          </div>
        </div>

        {/* Average Rating */}
        <div className="bg-[#ebdcc9] rounded-2xl p-3 sm:p-5 border border-[#dfcfbb] text-right flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-black text-[#144e3f] truncate">
              متوسط التقييم
            </span>
            <Star className="w-4 h-4 fill-[#144e3f] text-[#144e3f] shrink-0" />
          </div>

          <div className="mt-3 text-right">
            <div className="text-base sm:text-2xl font-black text-[#144e3f]">
              {stats.averageRating}
            </div>
            <div className="flex items-center justify-end gap-0.5 text-[#e58849] mt-1">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} className="text-xs">★</span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Main Tab Views */}
      {activeTab === 'current_offers' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg sm:text-xl font-black text-[#144e3f]">
              العروض الحالية
            </h2>
            <span className="text-xs font-bold text-[#62776c] bg-[#faefe5] px-2.5 py-1 rounded-lg">
              {toArabicNumerals(offers.length)} عروض منشورة
            </span>
          </div>

          {offers.length === 0 ? (
            <div className="bg-[#f5ede0] rounded-3xl p-10 text-center border border-[#e4d8c1]">
              <p className="text-base font-black text-[#144e3f]">لا توجد عروض منشورة حالياً</p>
              <p className="text-xs text-[#6e8278] mt-1">اضغط على زر إضافة عرض جديد لنشر وجبات فائضة فوراً</p>
              <button
                onClick={onAddNewOffer}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#e58849] text-white text-xs font-black"
              >
                + إضافة عرض
              </button>
            </div>
          ) : (
            offers.map((offer) => {
              const seconds = offer.expiryMinutes * 60;
              return (
                <div
                  key={offer.id}
                  id={`merchant-offer-${offer.id}`}
                  className="bg-[#faf6ee] rounded-3xl p-4 sm:p-5 border border-[#e4d8c2] shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  {/* Right on RTL: Image & Offer Details matching Screenshot 1 */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-[#ded2bd] shrink-0"
                    />

                    <div className="text-right">
                      <h3 className="text-base sm:text-lg font-black text-[#144e3f]">
                        {offer.title}
                      </h3>
                      
                      <div className="text-xs font-bold text-[#566c61] mt-0.5">
                        الكمية باقي: {toArabicNumerals(offer.remainingCount)}/{toArabicNumerals(offer.totalCount)}
                      </div>

                      <div className="text-base sm:text-lg font-black text-[#144e3f] mt-1">
                        {toArabicNumerals(offer.price)} ج.م
                      </div>

                      <div className="text-xs text-[#71867c] font-semibold mt-0.5">
                        عدد الحجوزات: {toArabicNumerals(offer.bookingsCount)}
                      </div>
                    </div>
                  </div>

                  {/* Left on RTL: Rescue Stamp Timer Stamp & Actions matching Screenshot 1 */}
                  <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-[#eee4d2]">
                    
                    {/* Live Rescue Stamp Badge matching Screenshot 1 */}
                    <div className="rescue-stamp px-3 py-1.5 text-center min-w-[100px] select-none">
                      <div className="text-[9px] uppercase font-bold tracking-wider leading-none text-[#b92b27]/80">
                        rescue stamp
                      </div>
                      <div className="text-sm font-black font-mono mt-0.5 leading-tight">
                        {formatCountdownHMS(seconds)}
                      </div>
                      <div className="text-[9px] font-bold text-[#b92b27]/80 leading-none">
                        {toArabicNumerals(Math.floor(offer.expiryMinutes / 60))}h {toArabicNumerals(offer.expiryMinutes % 60)}m left
                      </div>
                    </div>

                    {/* Quick Delete/Manage */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onDeleteOffer(offer.id)}
                        className="p-2 rounded-xl text-[#b83232] hover:bg-[#fee2e2] transition-colors cursor-pointer"
                        title="حذف أو إنهاء العرض"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })
          )}

        </div>
      )}

      {activeTab === 'earnings' && (
        <div className="bg-[#faf6ee] rounded-3xl p-6 border border-[#e4d8c2] space-y-5 text-right">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-[#144e3f]">تفاصيل الأرباح ونظام العمولة</h2>
            <span className="text-[11px] font-black bg-[#e3f0ea] text-[#144e3f] px-3 py-1 rounded-xl">
              عمولة وفرة: ٥ ج لكل ١٠٠ ج (٥٪ فقط)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#ede5d6] text-xs leading-relaxed text-[#445b50] border border-[#ded2bd]">
            تحصل منصة <strong>وَفْرة</strong> على عمولة تشغيلية رمزية تبلغ <strong>٥ جنيه فقط على كل ١٠٠ جنيه (٥٪)</strong>. يتم تسوية ٩٥٪ من صافي مبيعاتك يومياً وتحويلها مباشرة إلى محفظة فودافون كاش أو الحساب البنكي.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-white rounded-2xl border border-[#ded3be]">
              <div className="text-[11px] font-bold text-[#71867c]">إجمالي المبيعات</div>
              <div className="text-xl font-black text-[#144e3f] mt-1">
                {toArabicNumerals(Math.round(stats.totalEarnings * 1.0526))} ج.م
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#ded3be]">
              <div className="text-[11px] font-bold text-[#b45309]">عمولة المنصة (٥٪)</div>
              <div className="text-xl font-black text-[#e58849] mt-1">
                -{toArabicNumerals(Math.round(stats.totalEarnings * 0.05))} ج.م
              </div>
            </div>

            <div className="p-4 bg-[#e8f3ee] rounded-2xl border border-[#c4ded3]">
              <div className="text-[11px] font-bold text-[#144e3f]">صافي أرباح التاجر (٩٥٪)</div>
              <div className="text-xl font-black text-[#144e3f] mt-1">
                {toArabicNumerals(stats.totalEarnings)} ج.م
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="text-xs font-black text-[#144e3f]">سجل التسويات الأخيرة:</div>
            <div className="flex justify-between p-3 bg-white rounded-xl border border-[#ded3be] text-xs">
              <div>
                <div className="font-bold text-[#144e3f]">تسوية اليوم (مؤكدة)</div>
                <div className="text-[11px] text-[#71867c]">تحويل لمحفظة فودافون كاش • مخصوم ٥٪ عمولة</div>
              </div>
              <span className="font-black text-[#144e3f] text-sm self-center">٤٨٠ ج.م</span>
            </div>
            <div className="flex justify-between p-3 bg-white rounded-xl border border-[#ded3be] text-xs">
              <div>
                <div className="font-bold text-[#144e3f]">تسوية الأسبوع الماضي</div>
                <div className="text-[11px] text-[#71867c]">تم التحويل بنجاح</div>
              </div>
              <span className="font-black text-[#144e3f] text-sm self-center">١,٢٥٠ ج.م</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-[#faf6ee] rounded-3xl p-6 border border-[#e4d8c2] space-y-4 text-right">
          <h2 className="text-lg font-black text-[#144e3f]">طلبات الاستلام اليوم</h2>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-[#ded3be] flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-[#e58849] bg-[#faefe5] px-2 py-0.5 rounded">كود الحجز: WAF-8842</span>
                <h4 className="text-sm font-black text-[#144e3f] mt-1">صندوق التوفير من حلويات الجارحي (عدد ١)</h4>
                <p className="text-xs text-[#6e8278]">العميل: كريم سمير (01098765432) • الدفع: فودافون كاش</p>
              </div>
              <span className="text-xs font-bold text-[#144e3f] bg-[#e4f2eb] px-3 py-1 rounded-xl">جاهز للاستلام</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-[#faf6ee] rounded-3xl p-6 border border-[#e4d8c2] space-y-4 text-right">
          <h2 className="text-lg font-black text-[#144e3f]">إعدادات المتجر والفرع</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-[#144e3f] block mb-1">اسم المطعم / المخبز</label>
              <input type="text" readOnly value="حلويات الجارحي - فرع الدقي" className="w-full p-2.5 rounded-xl bg-white border border-[#ded3be] text-xs font-bold" />
            </div>
            <div>
              <label className="text-xs font-bold text-[#144e3f] block mb-1">رقم فودافون كاش لاستقبال الأرباح</label>
              <input type="text" readOnly value="01099887766" className="w-full p-2.5 rounded-xl bg-white border border-[#ded3be] text-xs font-bold text-left" />
            </div>
            <button
              onClick={onBackToCustomerView}
              className="mt-4 px-4 py-2 rounded-xl bg-[#144e3f] text-white text-xs font-black cursor-pointer"
            >
              الرجوع لتصفح كعميل
            </button>
          </div>
        </div>
      )}

      {/* Bottom Sticky Navigation Bar matching Screenshot 1 */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#144e3f] text-white border-t border-[#236856] shadow-xl">
        <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-around">
          
          <button
            onClick={() => setActiveTab('current_offers')}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === 'current_offers' ? 'text-[#f4a261] font-black' : 'text-[#c6ded5] hover:text-white'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-[11px]">العروض الحالية</span>
          </button>

          <button
            onClick={() => setActiveTab('earnings')}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === 'earnings' ? 'text-[#f4a261] font-black' : 'text-[#c6ded5] hover:text-white'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[11px]">الأرباح</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'text-[#f4a261] font-black' : 'text-[#c6ded5] hover:text-white'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-[11px]">الطلبات</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === 'settings' ? 'text-[#f4a261] font-black' : 'text-[#c6ded5] hover:text-white'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[11px]">الإعدادات</span>
          </button>

        </div>
      </div>

    </div>
  );
};
