import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { 
  Store, 
  MapPin, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  Search,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'map' | 'merchant' | 'bookings';
  onNavigate: (view: 'home' | 'map' | 'merchant' | 'bookings') => void;
  activeBookingsCount: number;
  onOpenAuthModal: () => void;
  currentUser: UserProfile | null;
  onSignOut: () => void;
  isMerchantMode: boolean;
  onToggleMerchantMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  activeBookingsCount,
  onOpenAuthModal,
  currentUser,
  onSignOut,
  isMerchantMode,
  onToggleMerchantMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#faf6ee]/95 backdrop-blur-md border-b border-[#e9dfcc] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Right: Logo */}
          <div className="flex items-center gap-6">
            <button 
              id="logo-btn"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-right group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-[#144e3f] flex items-center justify-center text-white shadow-sm shadow-[#144e3f]/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-[#f4a261]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#144e3f] tracking-tight leading-none">
                  وَفْرة
                </span>
                <span className="text-[11px] text-[#63756d] font-medium mt-0.5">
                  أنقذ الأكل • وفّر فلوسك
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-[#354f44]">
              <button
                id="nav-home-btn"
                onClick={() => onNavigate('home')}
                className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                  currentView === 'home' 
                    ? 'bg-[#e7dec8] text-[#144e3f] font-bold' 
                    : 'hover:bg-[#f1ebd9] text-[#415a4e]'
                }`}
              >
                العروض
              </button>
              <button
                id="nav-map-btn"
                onClick={() => onNavigate('map')}
                className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentView === 'map' 
                    ? 'bg-[#e7dec8] text-[#144e3f] font-bold' 
                    : 'hover:bg-[#f1ebd9] text-[#415a4e]'
                }`}
              >
                <MapPin className="w-4 h-4 text-[#e58849]" />
                الخريطة والبحث
              </button>
              <button
                id="nav-how-btn"
                onClick={() => {
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-3.5 py-2 rounded-lg hover:bg-[#f1ebd9] text-[#415a4e] transition-colors cursor-pointer"
              >
                إزاي بتشتغل
              </button>
              <button
                id="nav-merchant-info-btn"
                onClick={() => {
                  if (!isMerchantMode) onToggleMerchantMode();
                  onNavigate('merchant');
                }}
                className="px-3.5 py-2 rounded-lg hover:bg-[#f1ebd9] text-[#415a4e] transition-colors cursor-pointer"
              >
                للمطاعم والمتاجر
              </button>
            </nav>
          </div>

          {/* Left: Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Search quick button */}
            <button
              id="quick-search-nav-btn"
              onClick={() => onNavigate('map')}
              className="p-2.5 rounded-xl border border-[#e2d8c3] bg-white/80 hover:bg-white text-[#144e3f] transition-all shadow-xs cursor-pointer"
              title="بحث سريع"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* My Bookings Button */}
            <button
              id="my-bookings-nav-btn"
              onClick={() => onNavigate('bookings')}
              className={`relative px-3 sm:px-4 py-2 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                currentView === 'bookings'
                  ? 'bg-[#144e3f] text-white border-[#144e3f]'
                  : 'bg-white/90 text-[#144e3f] border-[#ded3be] hover:bg-white shadow-xs'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#e58849]" />
              <span className="hidden sm:inline">حجوزاتي</span>
              {activeBookingsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#b83232] text-white text-xs flex items-center justify-center font-bold">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* Merchant / Store Toggle Button */}
            <button
              id="merchant-mode-btn"
              onClick={() => {
                onToggleMerchantMode();
                if (!isMerchantMode) {
                  onNavigate('merchant');
                } else {
                  onNavigate('home');
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                isMerchantMode
                  ? 'bg-[#144e3f] text-white ring-2 ring-[#e58849]'
                  : 'bg-[#144e3f] hover:bg-[#0f3c30] text-white'
              }`}
            >
              {isMerchantMode ? (
                <>
                  <LayoutDashboard className="w-4 h-4 text-[#e58849]" />
                  <span>لوحة التاجر</span>
                </>
              ) : (
                <>
                  <Store className="w-4 h-4 text-[#e58849]" />
                  <span>سجّل محلك</span>
                </>
              )}
            </button>

            {/* User Auth Section / Profile Menu */}
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-[#ded3be] bg-white hover:bg-[#faf6ee] text-[#144e3f] text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <div className="relative">
                    <img 
                      src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'} 
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#ded3be]" 
                    />
                    {currentUser.provider === 'google' && (
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-xs border border-[#ded3be]">
                        <GoogleTinyIcon className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline font-bold truncate max-w-[90px]">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#82998e]" />
                </button>

                {/* Profile Popover Menu */}
                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white border border-[#ded3be] shadow-xl py-3 px-3 z-50 text-right space-y-3 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#e9dfcc]">
                      <img 
                        src={currentUser.avatarUrl} 
                        alt={currentUser.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#ded3be]"
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-[#144e3f] truncate">
                          {currentUser.name}
                        </div>
                        <div className="text-[11px] text-[#71887d] truncate font-mono" dir="ltr">
                          {currentUser.email}
                        </div>
                        {currentUser.provider === 'google' && (
                          <div className="flex items-center gap-1 mt-0.5 text-[10px] font-bold text-[#1a73e8]">
                            <GoogleTinyIcon className="w-2.5 h-2.5" />
                            <span>مسجّل عبر Google</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 text-xs font-medium">
                      <button
                        onClick={() => {
                          onNavigate('bookings');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-right hover:bg-[#faf6ee] text-[#144e3f] flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="font-bold">طلباتي وحجوزاتي</span>
                        <ShoppingBag className="w-4 h-4 text-[#e58849]" />
                      </button>

                      <button
                        onClick={() => {
                          onToggleMerchantMode();
                          onNavigate('merchant');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-right hover:bg-[#faf6ee] text-[#144e3f] flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="font-bold">لوحة تحكم التاجر</span>
                        <Store className="w-4 h-4 text-[#144e3f]" />
                      </button>
                    </div>

                    <div className="pt-2 border-t border-[#e9dfcc]">
                      <button
                        onClick={() => {
                          onSignOut();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-xl text-right text-[#b83232] hover:bg-red-50 font-bold text-xs flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>تسجيل الخروج</span>
                        <LogOut className="w-4 h-4 text-[#b83232]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="auth-nav-btn"
                onClick={onOpenAuthModal}
                className="p-2 sm:px-3.5 sm:py-2 rounded-xl border border-[#ded3be] bg-white/90 hover:bg-white text-[#144e3f] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#e8dfcf] flex items-center justify-center text-[#144e3f]">
                  <User className="w-3 h-3" />
                </div>
                <span>تسجيل الدخول</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-[#ded3be] text-[#144e3f] hover:bg-[#f1ebd9] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#e9dfcc] flex flex-col gap-1 pb-4 animate-in fade-in slide-in-from-top-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`text-right px-4 py-2.5 rounded-lg text-sm font-bold ${
                currentView === 'home' ? 'bg-[#e7dec8] text-[#144e3f]' : 'text-[#354f44]'
              }`}
            >
              الصفحة الرئيسية والعروض
            </button>
            <button
              onClick={() => {
                onNavigate('map');
                setMobileMenuOpen(false);
              }}
              className={`text-right px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-between ${
                currentView === 'map' ? 'bg-[#e7dec8] text-[#144e3f]' : 'text-[#354f44]'
              }`}
            >
              <span>الخريطة والبحث بالمنطقة</span>
              <MapPin className="w-4 h-4 text-[#e58849]" />
            </button>
            <button
              onClick={() => {
                onNavigate('bookings');
                setMobileMenuOpen(false);
              }}
              className={`text-right px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-between ${
                currentView === 'bookings' ? 'bg-[#e7dec8] text-[#144e3f]' : 'text-[#354f44]'
              }`}
            >
              <span>حجوزاتي وطلباتي السابقة</span>
              {activeBookingsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#b83232] text-white text-xs flex items-center justify-center">
                  {activeBookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                if (!isMerchantMode) onToggleMerchantMode();
                onNavigate('merchant');
                setMobileMenuOpen(false);
              }}
              className={`text-right px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-between ${
                currentView === 'merchant' ? 'bg-[#144e3f] text-white' : 'text-[#144e3f] bg-[#efe7d6]'
              }`}
            >
              <span>لوحة التحكم لأصحاب المطاعم</span>
              <Store className="w-4 h-4 text-[#e58849]" />
            </button>

            {currentUser && (
              <div className="pt-2 mt-2 border-t border-[#e9dfcc]">
                <button
                  onClick={() => {
                    onSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-right px-4 py-2 text-red-600 text-sm font-bold flex items-center justify-between"
                >
                  <span>تسجيل الخروج ({currentUser.name})</span>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

const GoogleTinyIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
  </svg>
);
