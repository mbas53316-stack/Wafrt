import React from 'react';
import { Store, Instagram, Facebook, Twitter, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onMerchantClick: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onMerchantClick,
  onNavigateHome,
}) => {
  return (
    <footer className="mt-16 bg-[#f4ece0] border-t border-[#e5dac4] pt-12 pb-10 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Merchant Callout Banner matching Screenshot 6 */}
        <div className="rounded-3xl bg-[#144e3f] text-white p-7 sm:p-10 mb-12 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-right space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#f4a261]">
                <Store className="w-3.5 h-3.5" />
                <span>لأصحاب الأعمال والمنشآت الغذائية</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                هل أنت صاحب مطعم أو متجر؟
              </h3>
              <p className="text-xs sm:text-sm text-[#c5ded5] leading-relaxed">
                انضم لشبكة وفرة وساهم في تقليل الهدر الغذائي، وزيادة دخلك اليومي، والوصول لآلاف العملاء الجدد في منطقتك!
              </p>
            </div>

            <button
              id="footer-merchant-join-btn"
              onClick={onMerchantClick}
              className="px-8 py-3.5 rounded-2xl bg-[#e58849] hover:bg-[#d57839] text-white font-black text-sm sm:text-base shadow-sm shadow-[#e58849]/30 active:scale-98 transition-all shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>سجّل الآن</span>
            </button>
          </div>

          {/* Subtle background decoration */}
          <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        </div>

        {/* Links and Copyright Bar matching Screenshot 6 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-[#e2d6c1]">
          
          {/* Social Icons matching Screenshot 6 */}
          <div className="flex items-center gap-4 text-[#144e3f]">
            <a 
              href="#instagram" 
              className="w-9 h-9 rounded-xl bg-white border border-[#ded3be] flex items-center justify-center hover:bg-[#144e3f] hover:text-white transition-colors cursor-pointer"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="#facebook" 
              className="w-9 h-9 rounded-xl bg-white border border-[#ded3be] flex items-center justify-center hover:bg-[#144e3f] hover:text-white transition-colors cursor-pointer"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="#twitter" 
              className="w-9 h-9 rounded-xl bg-white border border-[#ded3be] flex items-center justify-center hover:bg-[#144e3f] hover:text-white transition-colors cursor-pointer"
              title="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          {/* Navigation Links matching Screenshot 6 */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-bold text-[#4c6357]">
            <button onClick={onNavigateHome} className="hover:text-[#144e3f] transition-colors cursor-pointer">
              عن وفرة
            </button>
            <button className="hover:text-[#144e3f] transition-colors cursor-pointer">
              الخصوصية
            </button>
            <button className="hover:text-[#144e3f] transition-colors cursor-pointer">
              الشروط والأحكام
            </button>
            <button className="hover:text-[#144e3f] transition-colors cursor-pointer">
              اتصل بنا
            </button>
          </div>

          {/* Copyright */}
          <div className="text-xs text-[#71867b] font-medium flex items-center gap-1">
            <span>صُنع بـ</span>
            <Heart className="w-3 h-3 text-[#e58849] fill-[#e58849]" />
            <span>في مصر • جميع الحقوق محفوظة لـ وَفْرة ٢٠٢٦</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
