import React, { useState, useEffect } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow, 
  useMap 
} from '@vis.gl/react-google-maps';
import { SurplusOffer } from '../types';
import { toArabicNumerals } from '../utils/formatters';
import { 
  Search, 
  MapPin, 
  Clock, 
  Compass, 
  ChevronDown, 
  Sparkles, 
  X,
  Layers,
  Key,
  ExternalLink,
  Info
} from 'lucide-react';

interface InteractiveMapViewProps {
  offers: SurplusOffer[];
  onSelectOffer: (offer: SurplusOffer) => void;
  onBookOffer: (offer: SurplusOffer) => void;
}

// Map Controller for smooth panning
const MapController: React.FC<{ targetCoords?: { lat: number; lng: number } | null }> = ({ targetCoords }) => {
  const map = useMap();
  useEffect(() => {
    if (map && targetCoords) {
      map.panTo(targetCoords);
      map.setZoom(14);
    }
  }, [map, targetCoords]);
  return null;
};

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  offers,
  onSelectOffer,
  onBookOffer,
}) => {
  // Read API Key from environment or local state
  const envApiKey = ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const [apiKey, setApiKey] = useState<string>(envApiKey);
  const [tempApiKey, setTempApiKey] = useState<string>('');
  const [showKeyModal, setShowKeyModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOfferId, setSelectedOfferId] = useState<string>(offers[0]?.id || '');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [mapType, setMapType] = useState<'roadmap' | 'hybrid'>('roadmap');
  const [panCoords, setPanCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Filter offers
  const filteredOffers = offers.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'all' || item.storeCategory === typeFilter;
    const matchesDist = item.distanceKm <= maxDistance;
    const matchesTime = 
      timeFilter === 'all' ? true :
      timeFilter === 'urgent' ? item.expiryMinutes <= 60 :
      timeFilter === 'medium' ? item.expiryMinutes <= 120 : true;

    return matchesSearch && matchesType && matchesDist && matchesTime;
  });

  const activeOffer = offers.find(o => o.id === selectedOfferId) || filteredOffers[0] || offers[0];

  const handleSelectOffer = (offer: SurplusOffer) => {
    setSelectedOfferId(offer.id);
    setPanCoords({ lat: offer.coordinates.lat, lng: offer.coordinates.lng });
  };

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPanCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        () => {
          // Fallback to Cairo Center (Tahrir / Dokki)
          if (activeOffer) {
            setPanCoords({ lat: activeOffer.coordinates.lat, lng: activeOffer.coordinates.lng });
          } else {
            setPanCoords({ lat: 30.0444, lng: 31.2357 });
          }
        }
      );
    } else {
      setPanCoords({ lat: 30.0444, lng: 31.2357 });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Google Maps Status & Notice Header */}
      {!apiKey && (
        <div className="bg-[#faefe5] border border-[#f4cb98] rounded-2xl p-4 mb-4 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[#7c3a0e]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#e58849] shrink-0" />
            <span>
              <strong>خرائط جوجل (Google Maps Platform)</strong> جاهزة ومفعلة. يمكنك إضافة مفتاح الـ API الخاص بك أو استخدام مفتاح تجريبي مجاني لعرض خرائط حية مخصصة.
            </span>
          </div>
          <button
            onClick={() => setShowKeyModal(true)}
            className="px-3.5 py-1.5 bg-[#e58849] hover:bg-[#cf7438] text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Key className="w-3.5 h-3.5" />
            <span>إعداد مفتاح الخريطة (API Key)</span>
          </button>
        </div>
      )}

      {/* Search and Top Filter Bar */}
      <div className="bg-[#f5ede0] rounded-3xl p-4 sm:p-5 border border-[#e4d9c4] mb-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#71867c]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              id="map-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن الطعام الفائض، المطاعم، المخابز أو المنطقة في القاهرة والجيزة..."
              className="w-full pl-10 pr-12 py-3 bg-white rounded-2xl border border-[#ded4c0] text-sm text-[#144e3f] placeholder-[#81948b] focus:outline-none focus:ring-2 focus:ring-[#144e3f] focus:border-transparent font-medium shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#81948b] hover:text-[#144e3f]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            
            {/* Category Dropdown */}
            <div className="relative">
              <select
                id="filter-category-select"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none bg-[#144e3f] text-white px-4 py-2.5 pr-8 rounded-full text-xs font-bold border border-[#144e3f] cursor-pointer focus:outline-none shadow-xs"
              >
                <option value="all">النوع: الكل</option>
                <option value="bakeries">مخابز</option>
                <option value="restaurants">مطاعم</option>
                <option value="produce">خضار وفاكهة</option>
                <option value="sweets">حلويات</option>
                <option value="supermarkets">سوبر ماركت</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-white/80 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Distance Filter */}
            <div className="relative">
              <select
                id="filter-distance-select"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="appearance-none bg-[#144e3f] text-white px-4 py-2.5 pr-8 rounded-full text-xs font-bold border border-[#144e3f] cursor-pointer focus:outline-none shadow-xs"
              >
                <option value={10}>المسافة: الكل</option>
                <option value={2}>أقل من ٢ كم</option>
                <option value={5}>أقل من ٥ كم</option>
                <option value={10}>أقل من ١٠ كم</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-white/80 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Time Left Filter */}
            <div className="relative">
              <select
                id="filter-time-select"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="appearance-none bg-white text-[#144e3f] border border-[#d6cbb5] px-4 py-2.5 pr-8 rounded-full text-xs font-bold cursor-pointer focus:outline-none shadow-xs hover:bg-[#fcfaf5]"
              >
                <option value="all">الوقت: الكل</option>
                <option value="urgent">عاجل (&lt; ساعة)</option>
                <option value="medium">خلال ساعتين</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#144e3f] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Key Setting Button */}
            <button
              onClick={() => setShowKeyModal(true)}
              title="إعداد مفتاح Google Maps"
              className="p-2.5 bg-white text-[#144e3f] border border-[#d6cbb5] hover:bg-[#faf6ee] rounded-full text-xs font-bold flex items-center justify-center cursor-pointer shadow-xs"
            >
              <Key className="w-4 h-4 text-[#e58849]" />
            </button>

          </div>

        </div>
      </div>

      {/* Map & List Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left/Main on RTL: Interactive Google Map Container */}
        <div className="lg:col-span-7 xl:col-span-8 bg-[#e9f1ee] rounded-3xl border border-[#d2dfda] overflow-hidden relative shadow-xs h-[520px] sm:h-[620px] flex flex-col justify-between">
          
          {/* Top Map Bar with Cairo Area indicator & Controls */}
          <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#d2dfda] shadow-sm flex items-center gap-2 text-xs font-bold text-[#144e3f]">
            <MapPin className="w-4 h-4 text-[#e58849]" />
            <span>خريطة وفرة التفاعلية • Google Maps</span>
          </div>

          {/* Map Layer Switcher & User Location Controls */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <button
              onClick={() => setMapType(mapType === 'roadmap' ? 'hybrid' : 'roadmap')}
              className="bg-white/95 hover:bg-white text-[#144e3f] p-2.5 rounded-2xl border border-[#d4cbba] shadow-md flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
              title="تغيير نمط الخريطة"
            >
              <Layers className="w-4 h-4 text-[#144e3f]" />
              <span className="hidden sm:inline">{mapType === 'roadmap' ? 'قمر صناعي' : 'خريطة شوارع'}</span>
            </button>

            <button
              id="my-location-map-btn"
              onClick={handleLocateUser}
              className="bg-white/95 hover:bg-white text-[#144e3f] px-3.5 py-2.5 rounded-2xl border border-[#d4cbba] shadow-md flex items-center gap-2 text-xs font-black transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#e58849]" />
              <span className="hidden sm:inline">موقعي</span>
            </button>
          </div>

          {/* Google Maps View with @vis.gl/react-google-maps */}
          <div className="relative w-full h-full min-h-[520px] sm:min-h-[620px] bg-[#eef4f0] overflow-hidden">
            <APIProvider 
              apiKey={apiKey}
              language="ar"
              region="EG"
            >
              <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={{ lat: 30.0444, lng: 31.2357 }} // Cairo Center
                defaultZoom={12}
                mapTypeId={mapType}
                gestureHandling="greedy"
                disableDefaultUI={false}
                zoomControl={true}
                streetViewControl={false}
                mapTypeControl={false}
                fullscreenControl={false}
                style={{ width: '100%', height: '100%' }}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              >
                <MapController targetCoords={panCoords} />

                {/* Markers for all surplus food offers */}
                {filteredOffers.map((offer) => {
                  const isSelected = offer.id === selectedOfferId;
                  return (
                    <AdvancedMarker
                      key={offer.id}
                      position={{ lat: offer.coordinates.lat, lng: offer.coordinates.lng }}
                      title={offer.storeName}
                      onClick={() => handleSelectOffer(offer)}
                    >
                      <div className={`relative flex flex-col items-center cursor-pointer transition-transform duration-200 ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-10'
                      }`}>
                        {/* Floating Price Pill */}
                        <div className={`px-2 py-0.5 rounded-full text-[11px] font-black shadow-md border whitespace-nowrap mb-1 transition-colors ${
                          isSelected 
                            ? 'bg-[#e58849] text-white border-white ring-2 ring-[#e58849]/40' 
                            : 'bg-[#144e3f] text-white border-white/80'
                        }`}>
                          {toArabicNumerals(offer.price)} ج.م
                        </div>
                        
                        <Pin
                          background={isSelected ? '#e58849' : '#144e3f'}
                          borderColor={isSelected ? '#b45309' : '#0d362c'}
                          glyphColor="#ffffff"
                          scale={isSelected ? 1.2 : 1.0}
                        >
                          <span className="text-xs">🍴</span>
                        </Pin>
                      </div>
                    </AdvancedMarker>
                  );
                })}

                {/* InfoWindow for the selected offer */}
                {activeOffer && (
                  <InfoWindow
                    position={{ lat: activeOffer.coordinates.lat, lng: activeOffer.coordinates.lng }}
                    onCloseClick={() => {}}
                    maxWidth={260}
                    headerDisabled={true}
                  >
                    <div className="p-1 text-right text-slate-800 font-sans" dir="rtl">
                      <div className="flex items-center gap-2 mb-1.5">
                        <img 
                          src={activeOffer.imageUrl} 
                          alt={activeOffer.title} 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0" 
                        />
                        <div className="min-w-0">
                          <h4 className="font-black text-xs text-[#144e3f] truncate">{activeOffer.storeName}</h4>
                          <span className="text-[10px] text-slate-500">{activeOffer.area} ({toArabicNumerals(activeOffer.distanceKm)} كم)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs my-1 pt-1 border-t border-slate-100 font-bold">
                        <span className="text-[#e58849] font-black">{toArabicNumerals(activeOffer.price)} ج.م</span>
                        <span className="text-emerald-700 text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
                          متبقي {toArabicNumerals(activeOffer.remainingCount)} وجبات
                        </span>
                      </div>
                      <button
                        onClick={() => onBookOffer(activeOffer)}
                        className="w-full mt-1.5 py-1.5 bg-[#144e3f] hover:bg-[#0f3c30] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        احجز الوجبة الآن
                      </button>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          </div>

          {/* Active Offer Floating Card on Map Bottom */}
          {activeOffer && (
            <div className="m-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#ded3be] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                <img
                  src={activeOffer.imageUrl}
                  alt={activeOffer.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover border border-[#e0d6c1] shrink-0"
                />
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#62776d]">{activeOffer.storeName}</span>
                    <span className="text-xs font-bold text-[#e58849] bg-[#faefe5] px-2 py-0.5 rounded-md">
                      {toArabicNumerals(activeOffer.remainingCount)} قطع متبقية
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-[#144e3f] mt-0.5 line-clamp-1">
                    {activeOffer.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#526a5e]">
                    <span className="font-black text-[#e58849] text-sm">{toArabicNumerals(activeOffer.price)} ج.م</span>
                    <span className="line-through text-[#90a299]">{toArabicNumerals(activeOffer.originalPrice)} ج.م</span>
                    <span>• {activeOffer.area} ({toArabicNumerals(activeOffer.distanceKm)} كم)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onSelectOffer(activeOffer)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#ded3be] hover:bg-[#faf6ee] text-[#144e3f] text-xs font-bold transition-all cursor-pointer text-center"
                >
                  التفاصيل
                </button>
                <button
                  onClick={() => onBookOffer(activeOffer)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#144e3f] hover:bg-[#0f3c30] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#f4a261]" />
                  <span>احجز الآن</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right on RTL: Scrollable List matching Cairo Offers */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4 max-h-[620px] overflow-y-auto pr-1">
          
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-black text-[#144e3f]">
              عروض الخريطة الحية ({filteredOffers.length})
            </h3>
            <span className="text-xs text-[#6e8278] font-medium">مرتبة حسب المسافة</span>
          </div>

          {filteredOffers.length === 0 ? (
            <div className="bg-[#f7f2e7] rounded-2xl p-8 text-center border border-[#e5dac4]">
              <p className="text-sm font-bold text-[#144e3f]">لا توجد عروض مطابقة للبحث</p>
              <p className="text-xs text-[#70847b] mt-1">جرّب تغيير التصنيف أو توسيع نطاق المسافة</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('all');
                  setMaxDistance(10);
                  setTimeFilter('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#144e3f] text-white text-xs font-bold cursor-pointer"
              >
                إعادة ضبط الفلاتر
              </button>
            </div>
          ) : (
            filteredOffers.map((offer) => {
              const isSelected = offer.id === selectedOfferId;
              return (
                <div
                  key={offer.id}
                  id={`map-list-item-${offer.id}`}
                  onClick={() => handleSelectOffer(offer)}
                  className={`bg-[#fbf8f2] rounded-2xl p-3.5 border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-[#e58849] bg-white ring-2 ring-[#e58849]/30 shadow-md'
                      : 'border-[#e4d8c2] hover:border-[#144e3f]/50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    
                    {/* Thumbnail Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#e0d6c1] shrink-0">
                      <img
                        src={offer.imageUrl}
                        alt={offer.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {toArabicNumerals(offer.remainingCount)} باقي
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      
                      {/* Top row: Expiry pill */}
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#faefe5] text-[#b83232] text-[10px] font-bold mb-1">
                        <Clock className="w-3 h-3" />
                        <span>ينتهي خلال: {toArabicNumerals(Math.floor(offer.expiryMinutes / 60))}س و {toArabicNumerals(offer.expiryMinutes % 60)}د</span>
                      </div>

                      <h4 className="text-sm font-black text-[#144e3f] truncate">
                        {offer.storeName}
                      </h4>
                      <div className="text-xs text-[#6e8278] truncate">{offer.area}</div>

                      {/* Pricing */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-black text-[#e58849]">
                            {toArabicNumerals(offer.price)} ج.م
                          </span>
                          <span className="text-xs text-[#9aa8a1] line-through">
                            {toArabicNumerals(offer.originalPrice)} ج.م
                          </span>
                        </div>
                        <span className="text-xs text-[#6e8278] font-medium">
                          {toArabicNumerals(offer.distanceKm)} كم
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* Buttons when expanded/active */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-[#eee5d5] flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectOffer(offer);
                        }}
                        className="flex-1 py-1.5 rounded-lg border border-[#d8cdb8] hover:bg-[#faf6ee] text-xs font-bold text-[#144e3f] transition-colors"
                      >
                        عرض التفاصيل
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookOffer(offer);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-[#144e3f] hover:bg-[#0f3c30] text-xs font-bold text-white transition-colors flex items-center justify-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-[#f4a261]" />
                        <span>حجز فوري</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}

        </div>

      </div>

      {/* Google Maps API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf6ee] rounded-3xl p-6 max-w-md w-full border border-[#e4d8c2] shadow-2xl text-right">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebdcc4]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#144e3f] text-white flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="font-black text-sm text-[#144e3f]">إعداد Google Maps Platform</h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-[#445b50] leading-relaxed">
              <p>
                لتشغيل خرائط Google Maps الحية بدقة عالية، أدخل مفتاح الـ API الخاص بك من Google Cloud Console، أو استخدم الـ Demo Key المجاني للتجربة.
              </p>

              <div className="space-y-1.5">
                <label className="font-bold text-[#144e3f]">مفتاح Google Maps API Key:</label>
                <input
                  type="text"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full p-2.5 bg-white rounded-xl border border-[#ded3be] text-xs font-mono text-[#144e3f] focus:outline-none focus:ring-2 focus:ring-[#144e3f]"
                  dir="ltr"
                />
              </div>

              <div className="p-3 bg-[#ede5d6] rounded-xl space-y-1.5 text-[11px]">
                <div className="font-bold text-[#144e3f]">كيف أحصل على مفتاح مجاني؟</div>
                <div>
                  يمكنك الحصول على <strong>Maps Demo Key</strong> بدون بطاقة دفع أو حساب فوترة من خلال الرابط:
                </div>
                <a
                  href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#e58849] hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>Google Maps Demo Key Quickstart</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-[#ebdcc4]">
              <button
                onClick={() => {
                  if (tempApiKey.trim()) {
                    setApiKey(tempApiKey.trim());
                  }
                  setShowKeyModal(false);
                }}
                className="flex-1 py-2.5 bg-[#144e3f] hover:bg-[#0f3c30] text-white rounded-xl font-black text-xs transition-colors cursor-pointer"
              >
                حفظ وتفعيل الخريطة
              </button>
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2.5 border border-[#ded3be] hover:bg-[#ede5d6] text-[#6b7f74] rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
