import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  X, 
  Sparkles, 
  Phone, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  ChevronRight,
  UserCheck,
  Plus
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userProfile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [identifier, setIdentifier] = useState('01012345678');
  const [password, setPassword] = useState('••••••••');
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [isCustomGoogleMode, setIsCustomGoogleMode] = useState(false);

  // Available sample Google accounts (defaulting to the active user's email)
  const defaultGoogleAccounts = [
    {
      name: 'أحمد يوسف',
      email: 'alhawyamywsf@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
    },
    {
      name: 'وفرة للأعمال (تاجر)',
      email: 'wafra.partner@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
      isMerchant: true,
    }
  ];

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: tab === 'signup' ? 'مستخدم جديد' : 'محمد أحمد',
      email: identifier.includes('@') ? identifier : 'user@wafra.app',
      phone: identifier.includes('@') ? '01012345678' : identifier,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
      provider: identifier.includes('@') ? 'email' : 'phone',
      isMerchant: false,
    });
    onClose();
  };

  const handleSelectGoogleAccount = (acc: { name: string; email: string; avatarUrl: string; isMerchant?: boolean }) => {
    setIsGoogleSigningIn(true);
    setTimeout(() => {
      setIsGoogleSigningIn(false);
      setShowGoogleChooser(false);
      onLoginSuccess({
        name: acc.name,
        email: acc.email,
        phone: '01012345678',
        avatarUrl: acc.avatarUrl,
        provider: 'google',
        isMerchant: !!acc.isMerchant,
      });
      onClose();
    }, 600);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail) return;
    setIsGoogleSigningIn(true);
    setTimeout(() => {
      setIsGoogleSigningIn(false);
      setShowGoogleChooser(false);
      const nameFromEmail = customGoogleEmail.split('@')[0];
      onLoginSuccess({
        name: nameFromEmail,
        email: customGoogleEmail,
        phone: '01012345678',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
        provider: 'google',
        isMerchant: false,
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in">
      <div 
        id="auth-modal-dialog"
        className="bg-[#f7f2e6] rounded-3xl max-w-sm w-full border border-[#ded3be] shadow-2xl p-6 relative text-right space-y-5"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white hover:bg-[#eae3d2] text-[#144e3f] flex items-center justify-center cursor-pointer border border-[#ded3be]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Name */}
        <div className="text-center pt-1">
          <div className="text-3xl sm:text-4xl font-black text-[#144e3f] tracking-tight">وَفْرة</div>
          <div className="text-xs text-[#6e8579] mt-0.5 font-semibold">
            أنقذ الأكل • وفّر فلوسك
          </div>
        </div>

        {/* Google Account Selector Overlay View */}
        {showGoogleChooser ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="text-center pb-2 border-b border-[#ded3be]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#ded3be] text-xs font-bold text-[#144e3f] mb-1">
                <GoogleIcon className="w-4 h-4" />
                <span>تسجيل الدخول عبر Google</span>
              </div>
              <p className="text-xs text-[#60776b] font-medium">
                اختر الحساب للمتابعة إلى منصة وفرة
              </p>
            </div>

            {isGoogleSigningIn ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-10 h-10 border-3 border-[#144e3f] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-bold text-[#144e3f]">جاري التحقق والمزامنة مع Google...</p>
              </div>
            ) : isCustomGoogleMode ? (
              <form onSubmit={handleCustomGoogleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#144e3f] mb-1">
                    أدخل بريدك الإلكتروني لدى Google
                  </label>
                  <input
                    type="email"
                    required
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#ded3be] text-xs font-semibold text-[#144e3f] text-left focus:outline-none focus:ring-2 focus:ring-[#144e3f]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#144e3f] text-white text-xs font-bold hover:bg-[#0e3b2f] cursor-pointer"
                >
                  المتابعة
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomGoogleMode(false)}
                  className="w-full text-center text-xs text-[#6e8579] font-medium cursor-pointer"
                >
                  الرجوع لقائمة الحسابات
                </button>
              </form>
            ) : (
              <div className="space-y-2">
                {defaultGoogleAccounts.map((acc, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectGoogleAccount(acc)}
                    className="w-full p-2.5 rounded-2xl bg-white hover:bg-[#faf6ee] border border-[#ded3be] flex items-center justify-between transition-all group cursor-pointer text-right shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={acc.avatarUrl}
                        alt={acc.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#ded3be]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#144e3f] flex items-center gap-1.5">
                          <span>{acc.name}</span>
                          {acc.isMerchant && (
                            <span className="text-[10px] bg-[#144e3f] text-white px-1.5 py-0.2 rounded font-normal">
                              تاجر
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#71887d] font-mono" dir="ltr">
                          {acc.email}
                        </div>
                      </div>
                    </div>
                    <GoogleIcon className="w-4 h-4 opacity-70 group-hover:opacity-100 shrink-0" />
                  </button>
                ))}

                <button
                  onClick={() => setIsCustomGoogleMode(true)}
                  className="w-full p-2.5 rounded-2xl bg-[#ede5d5] hover:bg-[#e4dcba] border border-dashed border-[#ded3be] flex items-center justify-center gap-2 text-xs font-bold text-[#144e3f] transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#e58849]" />
                  <span>استخدام حساب Google آخر</span>
                </button>

                <button
                  onClick={() => setShowGoogleChooser(false)}
                  className="w-full pt-2 text-center text-xs font-bold text-[#6a8074] hover:text-[#144e3f] cursor-pointer"
                >
                  إلغاء والعودة لخيارات الدخول
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Primary Google Login Button */}
            <div className="space-y-2">
              <button
                id="google-signin-btn"
                type="button"
                onClick={() => setShowGoogleChooser(true)}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-[#fcfaf7] border border-[#ded3be] shadow-sm hover:shadow-md text-[#1f2937] font-bold text-sm flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-98"
              >
                <GoogleIcon className="w-5 h-5 shrink-0" />
                <span className="text-xs sm:text-sm font-black text-[#202124]">
                  المتابعة باستخدام Google
                </span>
              </button>
              <p className="text-[11px] text-center text-[#758d81]">
                تسجيل سريع وآمن بنقرة واحدة بدون كلمة سر
              </p>
            </div>

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#ded3be]"></div>
              <span className="flex-shrink mx-3 text-[11px] font-bold text-[#8ca094]">
                أو الدخول برقم الهاتف / البريد
              </span>
              <div className="flex-grow border-t border-[#ded3be]"></div>
            </div>

            {/* Tabs: تسجيل دخول / حساب جديد */}
            <div className="flex border-b border-[#ded3be]">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-2 text-center font-bold text-xs transition-all cursor-pointer ${
                  tab === 'login'
                    ? 'text-[#144e3f] border-b-2 border-[#144e3f]'
                    : 'text-[#82998e]'
                }`}
              >
                تسجيل دخول
              </button>
              <button
                onClick={() => setTab('signup')}
                className={`flex-1 py-2 text-center font-bold text-xs transition-all cursor-pointer ${
                  tab === 'signup'
                    ? 'text-[#144e3f] border-b-2 border-[#144e3f]'
                    : 'text-[#82998e]'
                }`}
              >
                حساب جديد
              </button>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleStandardSubmit} className="space-y-3 text-xs">
              <div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="رقم الموبايل أو البريد الإلكتروني"
                  className="w-full py-3 px-4 rounded-xl bg-[#ede5d5] border border-[#ded3be] text-[#144e3f] font-semibold text-center focus:outline-none focus:ring-2 focus:ring-[#144e3f]"
                />
              </div>

              {!isOtpMode ? (
                <div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="كلمة المرور"
                    className="w-full py-3 px-4 rounded-xl bg-[#ede5d5] border border-[#ded3be] text-[#144e3f] font-semibold text-center focus:outline-none focus:ring-2 focus:ring-[#144e3f]"
                  />
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="أدخل كود الـ OTP (مثال: 4592)"
                    className="w-full py-3 px-4 rounded-xl bg-[#ede5d5] border border-[#ded3be] text-[#144e3f] font-bold text-center"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#144e3f] hover:bg-[#0f3c30] text-white font-black text-sm shadow-md cursor-pointer transition-transform active:scale-98"
              >
                {tab === 'signup' ? 'إنشاء حساب' : 'دخول'}
              </button>

              {/* Sub actions */}
              <div className="text-center space-y-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => alert('تم إرسال رابط استعادة كلمة المرور إلى هاتفك')}
                  className="text-[11px] font-bold text-[#445b50] hover:text-[#e58849] block mx-auto cursor-pointer"
                >
                  نسيت كلمة السر؟
                </button>

                <button
                  type="button"
                  onClick={() => setIsOtpMode(!isOtpMode)}
                  className="text-[11px] font-black text-[#144e3f] hover:text-[#e58849] block mx-auto cursor-pointer"
                >
                  {isOtpMode ? 'الدخول بكلمة المرور' : 'الدخول عبر كود التأكيد (OTP)'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// Official Google 'G' Multi-colored Icon SVG
const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);
