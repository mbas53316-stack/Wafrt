import React from 'react';
import { Store, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface MerchantPromoBannerProps {
  onRegisterClick: () => void;
}

export const MerchantPromoBanner: React.FC<MerchantPromoBannerProps> = ({
  onRegisterClick,
}) => {
  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-[#144e3f] text-white p-7 sm:p-10 md:p-12 overflow-hidden shadow-lg border border-[#1d6b57]">
          
          {/* Subtle background graphic circles */}
          <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-[#1b614f]/50 pointer-events-none" />
          <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-right">
            
            {/* Text content */}
            <div className="space-y-3.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4a261]/20 text-[#f4a261] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>انضم لأكثر من 500+ علامة تجارية في مصر</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                هل أنت صاحب مطعم، مخبز أو متجر؟
              </h2>

              <p className="text-sm sm:text-base text-[#c3ddd2] leading-relaxed">
                انضم لشبكة وفرة وحوّل الطعام الفائض والمتبقي في نهاية اليوم إلى أرباح حقيقية، واكسب عملاء جدد بدون أي تكاليف اشتراك مقدمة!
              </p>

              {/* Benefits list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-semibold text-[#d5eee3]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f4a261]" />
                  <span>تغطية تكلفة الإنتاج وتحويل الفائض لأرباح</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f4a261]" />
                  <span>لوحة تحكم سهلة للإضافة والتحكم في الكميات</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f4a261]" />
                  <span>تسليم فوري وكود حجز مؤكد للزبون</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#f4a261]" />
                  <span>دعم تسويقي كامل لمحلك على التطبيق</span>
                </div>
              </div>
            </div>

            {/* CTA action */}
            <div className="shrink-0 w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                id="merchant-promo-register-btn"
                onClick={onRegisterClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#e58849] hover:bg-[#d47738] active:scale-98 text-white text-base font-black flex items-center justify-center gap-2.5 transition-all shadow-md shadow-[#e58849]/30 cursor-pointer"
              >
                <Store className="w-5 h-5" />
                <span>سجّل محلك الآن مجاناً</span>
              </button>

              <div className="text-center text-xs text-[#a9c9bc] flex items-center justify-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#f4a261]" />
                <span>إعداد الحساب وتفعيل العروض في أقل من ٣ دقائق</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
