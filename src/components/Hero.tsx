import React from 'react';
import { ArrowLeft, Store, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onMerchantRegisterClick: () => void;
  totalActiveOffers: number;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onMerchantRegisterClick,
  totalActiveOffers,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Card Container */}
        <div className="relative rounded-3xl bg-[#f5ede0] border border-[#e4d8c1] p-6 sm:p-10 md:p-14 shadow-xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Right column: Heading & Actions */}
            <div className="lg:col-span-8 space-y-6 text-right">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#144e3f]/10 border border-[#144e3f]/15 text-[#144e3f] text-xs sm:text-sm font-bold">
                <Sparkles className="w-4 h-4 text-[#e58849]" />
                <span>أول وأكبر منصة مصرية لمحاربة الهدر الغذائي والتوفير</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#144e3f] leading-[1.2] tracking-tight">
                أنقذ الأكل، وفّـر فلوسك،<br className="hidden sm:inline" />
                <span className="text-[#e58849]"> وساعد الكوكب</span>
              </h1>

              <p className="text-base sm:text-lg text-[#55695f] max-w-2xl leading-relaxed">
                كل يوم مطاعم ومخابز مميزة بتعمل أكل طازج وشهي بيفيض عن الحاجة. احجز صندوق التوفير والمفاجآت بسعر يبدأ من 30% فقط من سعره الأصلي واستلمه طازة!
              </p>

              {/* Action Buttons matching screenshot */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  id="hero-explore-btn"
                  onClick={onExploreClick}
                  className="px-7 py-3.5 rounded-2xl bg-[#e58849] hover:bg-[#d57839] active:scale-98 text-white font-bold text-base shadow-sm shadow-[#e58849]/25 flex items-center gap-2.5 transition-all cursor-pointer"
                >
                  <span>تصفح العروض الآن</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  id="hero-register-store-btn"
                  onClick={onMerchantRegisterClick}
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#fbf9f4] border-2 border-[#144e3f]/25 hover:border-[#144e3f] text-[#144e3f] font-bold text-base transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Store className="w-5 h-5 text-[#e58849]" />
                  <span>سجّل محلك كشريك</span>
                </button>
              </div>

              {/* Trust micro-badges */}
              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#5a7065]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#144e3f]" />
                  <span>طعام طازج وصالح للاستهلاك 100%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-[#e58849]" />
                  <span>أكثر من {totalActiveOffers * 15}+ وجبة تم إنقاذها هذا الأسبوع</span>
                </div>
              </div>
            </div>

            {/* Left column: Circular Rescue Stamp Badge matching screenshot */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative group cursor-pointer" onClick={onExploreClick}>
                
                {/* Decorative dashed outer circle */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-dashed border-[#144e3f]/50 p-3 flex items-center justify-center bg-white/80 backdrop-blur-xs shadow-md group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full border-2 border-[#144e3f] flex flex-col items-center justify-center text-center p-4 bg-[#f8f5ee]">
                    
                    <span className="text-xs uppercase tracking-widest text-[#667e72] font-extrabold mb-1">
                      وجبات اليوم
                    </span>
                    
                    <div className="text-xl sm:text-2xl font-black text-[#144e3f] leading-tight">
                      ساعات متبقية: <span className="text-[#e58849]">١٠</span>
                    </div>

                    <div className="text-xs text-[#526a5e] font-semibold mt-1">
                      لإنقاذ وجبات اليوم
                    </div>

                    <div className="mt-3 px-3 py-1 rounded-full bg-[#144e3f] text-white text-xs font-bold shadow-xs">
                      {totalActiveOffers} عروض نشطة حولك 📍
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Dark Green Stats Ribbon matching screenshot */}
          <div className="mt-10 rounded-2xl bg-[#144e3f] text-white p-5 sm:p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-[#236856]">
              
              <div className="py-2 sm:py-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#f4a261]">
                  +٥٠٠ محل
                </div>
                <div className="text-xs sm:text-sm text-[#c8ded5] mt-1 font-medium">
                  مطاعم ومخابز وسوبرماركت شريكة
                </div>
              </div>

              <div className="py-2 sm:py-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                  ١٠ طن أكل اتنقذ
                </div>
                <div className="text-xs sm:text-sm text-[#c8ded5] mt-1 font-medium">
                  وفرناها ومنعنا انبعاثات الكربون
                </div>
              </div>

              <div className="py-2 sm:py-0">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#f4a261]">
                  خصم بيوصل لـ ٧٠٪
                </div>
                <div className="text-xs sm:text-sm text-[#c8ded5] mt-1 font-medium">
                  على كافة المأكولات والمشروبات
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
