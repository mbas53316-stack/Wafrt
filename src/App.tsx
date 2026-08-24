import React, { useState } from 'react';
import { SurplusOffer, CategoryType, Booking, MerchantStats, UserProfile } from './types';
import { INITIAL_OFFERS, INITIAL_MERCHANT_STATS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { OfferCard } from './components/OfferCard';
import { HowItWorks } from './components/HowItWorks';
import { InteractiveMapView } from './components/InteractiveMapView';
import { OfferDetailsModal } from './components/OfferDetailsModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { MerchantDashboard } from './components/MerchantDashboard';
import { AddOfferModal } from './components/AddOfferModal';
import { BookingsView } from './components/BookingsView';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  MapPin, 
  ShoppingBag, 
  ArrowLeft, 
  CheckCircle2, 
  Search
} from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState<'home' | 'map' | 'merchant' | 'bookings'>('home');
  const [isMerchantMode, setIsMerchantMode] = useState(false);

  // Core Data state
  const [offers, setOffers] = useState<SurplusOffer[]>(INITIAL_OFFERS);
  const [merchantStats, setMerchantStats] = useState<MerchantStats>(INITIAL_MERCHANT_STATS);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'BOOK-INIT-1',
      bookingCode: 'WAF-9241',
      offerId: 'wafra-1',
      offerTitle: 'صندوق التوفير من حلويات الجارحي',
      storeName: 'حلويات الجارحي',
      price: 40,
      quantity: 1,
      subtotal: 40,
      serviceFee: 2, // 5% عمولة المنصة
      totalAmount: 42,
      paymentMethod: 'vodafone_cash',
      pickupWindow: '08:00 م - 09:30 م',
      storeAddress: '١٥ شارع مصدق، الدقي، الجيزة',
      imageUrl: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
      createdAt: '06:15 م',
      status: 'confirmed',
      customerName: 'أحمد يوسف',
      customerPhone: '01012345678',
    }
  ]);

  // Selected Category filter on Home
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [homeSearchQuery, setHomeSearchQuery] = useState('');

  // Modals state
  const [selectedOfferForDetails, setSelectedOfferForDetails] = useState<SurplusOffer | null>(null);
  const [selectedOfferForCheckout, setSelectedOfferForCheckout] = useState<SurplusOffer | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddOfferModalOpen, setIsAddOfferModalOpen] = useState(false);

  // User Auth state (Profile & Google Auth integration)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    name: 'أحمد يوسف',
    email: 'alhawyamywsf@gmail.com',
    phone: '01012345678',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
    provider: 'google',
    isMerchant: false,
  });

  // Success Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered offers for Home Grid
  const homeFilteredOffers = offers.filter((offer) => {
    const matchesCat = selectedCategory === 'all' || offer.storeCategory === selectedCategory;
    const matchesSearch = 
      offer.title.toLowerCase().includes(homeSearchQuery.toLowerCase()) ||
      offer.storeName.toLowerCase().includes(homeSearchQuery.toLowerCase()) ||
      offer.area.toLowerCase().includes(homeSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Handle successful booking
  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);

    // Update remaining count on offer
    setOffers((prev) =>
      prev.map((o) =>
        o.id === newBooking.offerId
          ? {
              ...o,
              remainingCount: Math.max(0, o.remainingCount - newBooking.quantity),
              bookingsCount: o.bookingsCount + newBooking.quantity,
            }
          : o
      )
    );

    // Update merchant stats
    setMerchantStats((prev) => ({
      ...prev,
      totalEarnings: prev.totalEarnings + newBooking.totalAmount,
      rescuedMealsCount: prev.rescuedMealsCount + newBooking.quantity,
    }));

    setSelectedOfferForCheckout(null);
    setSelectedOfferForDetails(null);
    showToast(`تم تأكيد الحجز بنجاح! كود الاستلام: ${newBooking.bookingCode}`);
    setCurrentView('bookings');
  };

  // Handle adding new offer by merchant
  const handleAddNewOffer = (newOffer: SurplusOffer) => {
    setOffers((prev) => [newOffer, ...prev]);
    setMerchantStats((prev) => ({
      ...prev,
      activeOffersCount: prev.activeOffersCount + 1,
    }));
    showToast('تم نشر العرض بنجاح على منصة وفرة والخريطة!');
  };

  // Handle deleting offer by merchant
  const handleDeleteOffer = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
    showToast('تم حذف العرض');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6ee] text-[#1c2420] font-['Cairo',sans-serif] selection:bg-[#144e3f] selection:text-white">
      
      {/* Global Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view !== 'merchant') setIsMerchantMode(false);
        }}
        activeBookingsCount={bookings.length}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        onSignOut={() => {
          setCurrentUser(null);
          showToast('تم تسجيل الخروج بنجاح.');
        }}
        isMerchantMode={isMerchantMode}
        onToggleMerchantMode={() => {
          const next = !isMerchantMode;
          setIsMerchantMode(next);
          if (next) {
            setCurrentView('merchant');
          } else {
            setCurrentView('home');
          }
        }}
      />

      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#144e3f] text-white px-5 py-3 rounded-2xl shadow-xl border border-[#e58849] flex items-center gap-2.5 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-[#f4a261]" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME & OFFERS CATALOG */}
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* Hero Section matching Screenshot 3 */}
            <Hero
              onExploreClick={() => {
                document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMapClick={() => setCurrentView('map')}
              totalOffersCount={offers.length}
            />

            {/* Category Filter matching Screenshot 3 & 4 */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
            />

            {/* Live Offers Section */}
            <section id="offers-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              
              {/* Header with Search and Stats */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#34a853] animate-pulse"></span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#144e3f]">
                      عروض اليوم المتوفرة الآن
                    </h2>
                  </div>
                  <p className="text-xs text-[#62776c] mt-1 font-medium">
                    خصومات تصل إلى 70% على أشهى المأكولات الطازجة من أفضل المخابز والمطاعم
                  </p>
                </div>

                {/* Home In-line Search Bar */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={homeSearchQuery}
                    onChange={(e) => setHomeSearchQuery(e.target.value)}
                    placeholder="ابحث بالاسم أو المحل أو المنطقة..."
                    className="w-full py-2.5 pr-9 pl-3 rounded-2xl bg-white border border-[#ded3be] text-xs font-semibold text-[#144e3f] placeholder-[#8ca094] focus:outline-none focus:ring-2 focus:ring-[#144e3f] shadow-2xs"
                  />
                  <Search className="w-4 h-4 text-[#8ca094] absolute right-3 top-3" />
                  {homeSearchQuery && (
                    <button
                      onClick={() => setHomeSearchQuery('')}
                      className="absolute left-3 top-2.5 text-xs text-[#8ca094] hover:text-[#144e3f]"
                    >
                      مسح
                    </button>
                  )}
                </div>
              </div>

              {/* Grid of Offers */}
              {homeFilteredOffers.length === 0 ? (
                <div className="bg-[#f5ece0] rounded-3xl p-10 text-center border border-[#e4d8c1] my-6">
                  <p className="text-base font-black text-[#144e3f]">لا توجد عروض متطابقة في هذا التصنيف حالياً</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setHomeSearchQuery('');
                    }}
                    className="mt-3 px-4 py-2 rounded-xl bg-[#144e3f] text-white text-xs font-bold cursor-pointer"
                  >
                    عرض كل الوجبات
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                  {homeFilteredOffers.map((offer) => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      onSelect={(o) => setSelectedOfferForDetails(o)}
                      onQuickBook={(o) => setSelectedOfferForCheckout(o)}
                    />
                  ))}
                </div>
              )}

              {/* Map CTA banner */}
              <div className="mt-12 p-6 rounded-3xl bg-[#f2e7d5] border border-[#e0d3be] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-right">
                  <h3 className="text-base sm:text-lg font-black text-[#144e3f] flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#e58849]" />
                    <span>تفضل استكشاف العروض حسب الخريطة والموقع الجغرافي؟</span>
                  </h3>
                  <p className="text-xs text-[#5e7368] mt-1">
                    شاهد جميع المخابز والمطاعم المحيطة بك على خريطة القاهرة الكبرى والجيزة
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView('map')}
                  className="px-6 py-3 rounded-2xl bg-[#144e3f] hover:bg-[#0f3c30] text-white text-xs sm:text-sm font-black shadow-xs flex items-center gap-2 transition-all cursor-pointer shrink-0"
                >
                  <span>افتح الخريطة التفاعلية</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

            </section>

            {/* How It Works Section matching Screenshot 6 */}
            <HowItWorks onOpenMap={() => setCurrentView('map')} />

          </div>
        )}

        {/* VIEW 2: INTERACTIVE MAP & SEARCH VIEW matching Screenshot 5 */}
        {currentView === 'map' && (
          <InteractiveMapView
            offers={offers}
            onSelectOffer={(o) => setSelectedOfferForDetails(o)}
            onBookOffer={(o) => setSelectedOfferForCheckout(o)}
          />
        )}

        {/* VIEW 3: MERCHANT DASHBOARD matching Screenshot 1 */}
        {currentView === 'merchant' && (
          <MerchantDashboard
            offers={offers}
            stats={merchantStats}
            onAddNewOffer={() => setIsAddOfferModalOpen(true)}
            onDeleteOffer={handleDeleteOffer}
            onBackToCustomerView={() => {
              setIsMerchantMode(false);
              setCurrentView('home');
            }}
          />
        )}

        {/* VIEW 4: USER BOOKINGS */}
        {currentView === 'bookings' && (
          <BookingsView
            bookings={bookings}
            onExploreClick={() => setCurrentView('home')}
          />
        )}

      </main>

      {/* Offer Details Modal matching Screenshot 4 */}
      <OfferDetailsModal
        offer={selectedOfferForDetails}
        onClose={() => setSelectedOfferForDetails(null)}
        onProceedToBooking={(o) => {
          setSelectedOfferForDetails(null);
          setSelectedOfferForCheckout(o);
        }}
      />

      {/* Checkout & Booking Modal matching Screenshot 2 */}
      <CheckoutModal
        offer={selectedOfferForCheckout}
        onClose={() => setSelectedOfferForCheckout(null)}
        onConfirmBooking={handleConfirmBooking}
        defaultCustomerName={currentUser?.name || 'أحمد يوسف'}
        defaultCustomerPhone={currentUser?.phone || '01012345678'}
      />

      {/* Auth Modal matching Screenshot 3 with Google Auth */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(userProfile) => {
          setCurrentUser(userProfile);
          if (userProfile.isMerchant) {
            setIsMerchantMode(true);
            setCurrentView('merchant');
          }
          showToast(`أهلاً بك يا ${userProfile.name}! تم تسجيل الدخول بنجاح ${userProfile.provider === 'google' ? 'بواسطة Google 🚀' : ''}.`);
        }}
      />

      {/* Add New Offer Modal for Merchants */}
      <AddOfferModal
        isOpen={isAddOfferModalOpen}
        onClose={() => setIsAddOfferModalOpen(false)}
        onAddOffer={handleAddNewOffer}
      />

      {/* Global Footer matching Screenshot 6 */}
      {currentView !== 'merchant' && (
        <Footer
          onMerchantClick={() => {
            setIsMerchantMode(true);
            setCurrentView('merchant');
          }}
          onNavigateHome={() => setCurrentView('home')}
        />
      )}

    </div>
  );
}
