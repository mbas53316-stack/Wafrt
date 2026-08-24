import React, { useState } from 'react';
import { SurplusOffer } from '../types';
import { toArabicNumerals } from '../utils/formatters';
import { 
  Search, 
  MapPin, 
  Clock, 
  Navigation, 
  ChevronDown, 
  Filter,
  Sparkles,
  UtensilsCrossed
} from 'lucide-react';

interface MapViewProps {
  offers: SurplusOffer[];
  onSelectOffer: (offer: SurplusOffer) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  offers,
  onSelectOffer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPinId, setSelectedPinId] = useState<string>(offers[0]?.id || '');
  const [distanceFilter, setDistanceFilter] = useState<'all' | '2km' | '5km'>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | '1h' | '2h'>('all');

  const filteredOffers = offers.filter((o) => {
    const matchesSearch = 
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.area.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDistance = distanceFilter === 'all' ? true : distanceFilter === '2km' ? o.distanceKm <= 2 : o.distanceKm <= 5;
    const matchesTime = timeFilter === 'all' ? true : timeFilter === '1h' ? o.expiryMinutes <= 60 : o.expiryMinutes <= 120;

    return matchesSearch && matchesDistance && matchesTime;
  });

  const selectedOffer = offers.find((o) => o.id === selectedPinId) || offers[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4 text-right">
      
      {/* Search Bar matching screenshot */}
      <div className="relative">
        <div className="relative flex items-center bg-white rounded-2xl border border-[#ded3be] shadow-xs px-4 py-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن الطعام الفائض، المطاعم، أو المنطقة..."
            className="w-full bg-transparent text-sm text-[#144e3f] font-semibold text-right focus:outline-none placeholder-[#82998e]"
          />
          <Search className="w-5 h-5 text-[#82998e] mr-2 shrink-0" />
        </div>
      </div>

      {/* Filter Chips matching screenshot */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        
        {/* Type Filter */}
        <div className="relative inline-block">
          <button 
            className="px-4 py-2 rounded-full bg-[#144e3f] text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>النوع</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Distance Filter */}
        <button
          onClick={() => setDistanceFilter(distanceFilter === 'all' ? '2km' : distanceFilter === '2km' ? '5km' : 'all')}
          className={`px-4 py-2 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            distanceFilter !== 'all' ? 'bg-[#144e3f] text-white' : 'bg-[#ede5d5] text-[#334b3f] border border-[#ded3be]'
          }`}
        >
          <span>المسافة {distanceFilter !== 'all' && `(${distanceFilter})`}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {/* Time Filter */}
        <button
          onClick={() => setTimeFilter(timeFilter === 'all' ? '1h' : timeFilter === '1h' ? '2h' : 'all')}
          className={`px-4 py-2 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
            timeFilter !== 'all' ? 'bg-[#144e3f] text-white' : 'bg-[#ede5d5] text-[#334b3f] border border-[#ded3be]'
          }`}
        >
          <span>الوقت المتبقي {timeFilter !== 'all' && `(${timeFilter})`}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        <span className="text-[#6d8478] font-medium text-[11px] mr-auto">
          {filteredOffers.length} متجر متاح
        </span>
      </div>

      {/* Interactive Map Layout Grid matching screenshot unnamed (1).jpg */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[650px]">
        
        {/* Map Container (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#ded3be] relative bg-[#e5dfce] shadow-inner flex flex-col">
          
          {/* Stylized Cairo Map SVG Canvas */}
          <div className="relative w-full h-full bg-[#f3ecdd] overflow-hidden select-none">
            
            {/* Nile River Curve graphic */}
            <svg className="absolute inset-0 w-full h-full opacity-70 pointer-events-none" viewBox="0 0 500 600" preserveAspectRatio="none">
              <path
                d="M 180 0 Q 220 150 200 300 T 260 600"
                fill="none"
                stroke="#9fc5e8"
                strokeWidth="48"
              />
              <path
                d="M 180 0 Q 220 150 200 300 T 260 600"
                fill="none"
                stroke="#6fa8dc"
                strokeWidth="24"
              />
              {/* Road networks */}
              <path d="M 0 150 L 500 180" stroke="#dfd6c0" strokeWidth="6" fill="none" />
              <path d="M 50 350 L 450 320" stroke="#dfd6c0" strokeWidth="8" fill="none" />
              <path d="M 150 500 L 480 460" stroke="#dfd6c0" strokeWidth="6" fill="none" />
              <path d="M 300 0 L 280 600" stroke="#e7dfcb" strokeWidth="4" fill="none" />
            </svg>

            {/* City Area Labels matching Cairo geography */}
            <div className="absolute top-12 left-1/4 text-xs font-bold text-[#8c9f95] pointer-events-none">
              الزمالك • Zamalek
            </div>
            <div className="absolute top-1/2 left-1/3 text-lg font-black text-[#6d8479]/60 pointer-events-none">
              Cairo • القاهرة
            </div>
            <div className="absolute bottom-24 left-1/5 text-xs font-bold text-[#8c9f95] pointer-events-none">
              الجيزة • Giza
            </div>
            <div className="absolute bottom-16 right-1/4 text-xs font-bold text-[#8c9f95] pointer-events-none">
              المعادي • Maadi
            </div>

            {/* Interactive Pins on Map */}
            {filteredOffers.map((offer) => {
              const isSelected = offer.id === selectedPinId;
              return (
                <div
                  key={offer.id}
                  onClick={() => setSelectedPinId(offer.id)}
                  style={{
                    left: `${offer.coordinates.xPercent}%`,
                    top: `${offer.coordinates.yPercent}%`,
                  }}
                  className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-10 transition-all hover:scale-125"
                >
                  {/* Pin graphic */}
                  <div
                    className={`w-9 h-12 rounded-t-full rounded-b-none flex flex-col items-center justify-center p-1 shadow-md transition-all ${
                      isSelected
                        ? 'bg-[#e58849] ring-4 ring-[#e58849]/30 scale-115'
                        : 'bg-[#144e3f] hover:bg-[#1a6451]'
                    }`}
                  >
                    <UtensilsCrossed className="w-4 h-4 text-white" />
                    <span className="text-[8px] font-bold text-white leading-none mt-0.5">
                      {offer.price}ج
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-black/40 rounded-full mx-auto -mt-1 blur-[1px]" />
                </div>
              );
            })}

            {/* My Location button matching screenshot */}
            <button
              onClick={() => {
                alert('تم تحديد موقعك الحالي في القاهرة: الدقي / الزمالك');
              }}
              className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-[#ded3be] text-xs font-bold text-[#144e3f] shadow-md flex items-center gap-2 hover:bg-white cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#e58849]" />
              <span>موقعي الحالي (My Location)</span>
            </button>
          </div>

          {/* Quick Active Pin Banner at bottom of map */}
          {selectedOffer && (
            <div className="p-3 bg-white border-t border-[#ded3be] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={selectedOffer.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="text-right">
                  <div className="font-black text-xs text-[#144e3f]">{selectedOffer.title}</div>
                  <div className="text-[11px] text-[#6e8579]">{selectedOffer.storeName} • {selectedOffer.area}</div>
                </div>
              </div>
              <button
                onClick={() => onSelectOffer(selectedOffer)}
                className="px-4 py-2 rounded-xl bg-[#e58849] hover:bg-[#d67838] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                احجز {selectedOffer.price} ج.م
              </button>
            </div>
          )}

        </div>

        {/* Offers Side List (5 cols) matching screenshot unnamed (1).jpg */}
        <div className="lg:col-span-5 flex flex-col gap-3 overflow-y-auto pr-1">
          {filteredOffers.map((offer) => {
            const isSelected = offer.id === selectedPinId;
            return (
              <div
                key={offer.id}
                onClick={() => {
                  setSelectedPinId(offer.id);
                  onSelectOffer(offer);
                }}
                className={`bg-white rounded-2xl p-3 border transition-all cursor-pointer flex gap-3 hover:shadow-md ${
                  isSelected ? 'border-[#e58849] ring-2 ring-[#e58849]/20' : 'border-[#ded3be]'
                }`}
              >
                {/* Info */}
                <div className="flex-1 flex flex-col justify-between text-right">
                  <div>
                    {/* Expiry Pill */}
                    <div className="inline-block text-[10px] font-bold text-[#b83232] bg-[#fef2f2] px-2 py-0.5 rounded-md mb-1">
                      ينتهي خلال: {offer.expiryMinutes} دقيقة
                    </div>
                    <h4 className="font-black text-sm text-[#144e3f] line-clamp-1">{offer.storeName}</h4>
                    <div className="text-xs text-[#6e857a]">{offer.area} • {offer.distanceKm} كم</div>
                  </div>

                  <div className="flex items-baseline justify-between pt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-[#e58849]">{toArabicNumerals(offer.price)} ج.م</span>
                      <span className="text-[10px] text-[#8e9f96] line-through">{toArabicNumerals(offer.originalPrice)} ج.م</span>
                    </div>
                    <span className="text-xs font-bold text-[#144e3f] bg-[#faf6ee] px-2.5 py-1 rounded-lg border border-[#e8ded0]">
                      احجز
                    </span>
                  </div>
                </div>

                {/* Thumb */}
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#e0d6c1] shrink-0 border border-[#e8ded0]">
                  <img src={offer.imageUrl} alt={offer.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
