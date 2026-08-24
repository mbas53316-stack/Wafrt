import React from 'react';
import { Map, CreditCard, ShoppingBag, ArrowLeft } from 'lucide-react';

interface HowItWorksProps {
  onOpenMap: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenMap }) => {
  const steps = [
    {
      number: '١',
      title: 'افتح الخريطة واستكشف',
      desc: 'افتح الخريطة لمعرفة المطاعم، المخابز والمتاجر المحيطة بك وعروض صناديق التوفير المتاحة اليوم.',
      icon: Map,
      bgIcon: 'bg-[#e58849]/15 text-[#e58849]',
    },
    {
      number: '٢',
      title: 'احجز وادفع في ثوانٍ',
      desc: 'اختر وجبتك المفضلة بخصم يصل لـ 70%، وادفع بأمان عبر فودافون كاش، البطاقات البنكية، أو عند الاستلام.',
      icon: CreditCard,
      bgIcon: 'bg-[#144e3f]/15 text-[#144e3f]',
    },
    {
      number: '٣',
      title: 'استلم وجبتك في الميعاد',
      desc: 'توجه إلى المتجر في نافذة الاستلام المحددة، أظهر كود الحجز أو رمز QR، واستمتع بوجبة طازجة وشهية!',
      icon: ShoppingBag,
      bgIcon: 'bg-[#e58849]/15 text-[#e58849]',
    },
  ];

  return (
    <section id="how-it-works-section" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-right max-w-2xl mb-10">
          <div className="text-[#e58849] text-sm font-black uppercase tracking-wider mb-1">
            خطوات بسيطة وسريعة
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#144e3f] tracking-tight">
            إزاي بتشتغل منصة وَفْرة؟
          </h2>
          <p className="text-sm sm:text-base text-[#5d7368] mt-2">
            من خلال ٣ خطوات بس هتقدر توفر جزء كبير من مصاريف أكلك وتكون شريك حقيقي في تقليل الهدر.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-[#f5ece0] rounded-3xl p-6 sm:p-7 border border-[#e5dac4] relative flex flex-col justify-between hover:border-[#144e3f]/40 hover:bg-white transition-all shadow-xs"
              >
                <div>
                  {/* Step number badge matching design */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-[#e58849] text-white font-black text-xl flex items-center justify-center shadow-xs">
                      {step.number}
                    </div>
                    <div className={`p-3 rounded-2xl ${step.bgIcon}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-[#144e3f] mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#61776c] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#e2d8c3]/60 flex items-center justify-between text-xs font-bold text-[#144e3f]">
                  <span>جاهز تبدأ؟</span>
                  <span className="text-[#e58849]">خطوة {step.number} من ٣</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action button */}
        <div className="mt-8 text-center sm:text-right">
          <button
            onClick={onOpenMap}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#144e3f] hover:text-[#e58849] bg-white px-5 py-2.5 rounded-xl border border-[#ded3be] shadow-xs hover:border-[#144e3f] transition-all cursor-pointer"
          >
            <span>استكشف الخريطة المباشرة للمطاعم المحيطة</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
