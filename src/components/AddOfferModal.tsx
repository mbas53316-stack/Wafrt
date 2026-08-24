import React, { useState } from 'react';
import { SurplusOffer, CategoryType } from '../types';
import { X, Plus, Sparkles, Upload, Clock } from 'lucide-react';

interface AddOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOffer: (offer: SurplusOffer) => void;
}

export const AddOfferModal: React.FC<AddOfferModalProps> = ({
  isOpen,
  onClose,
  onAddOffer,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [storeName, setStoreName] = useState('حلويات الجارحي');
  const [category, setCategory] = useState<CategoryType>('sweets');
  const [originalPrice, setOriginalPrice] = useState<number>(100);
  const [price, setPrice] = useState<number>(40);
  const [totalCount, setTotalCount] = useState<number>(8);
  const [expiryMinutes, setExpiryMinutes] = useState<number>(90);
  const [pickupWindow, setPickupWindow] = useState('08:30 م - 10:00 م');
  const [area, setArea] = useState('الدقي');
  const [fullAddress, setFullAddress] = useState('١٥ شارع مصدق، الدقي، الجيزة');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80');

  const presetImages = [
    { label: 'حلويات', url: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80' },
    { label: 'مشويات', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' },
    { label: 'مخبوزات', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
    { label: 'خضار وفاكهة', url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOffer: SurplusOffer = {
      id: 'offer-' + Date.now(),
      title: title || 'صندوق التوفير والمفاجأة اليومية',
      storeName: storeName || 'متجر وفرة الشريك',
      storeCategory: category,
      originalPrice: Number(originalPrice) || 100,
      price: Number(price) || 40,
      remainingCount: Number(totalCount) || 5,
      totalCount: Number(totalCount) || 5,
      expiryMinutes: Number(expiryMinutes) || 90,
      distanceKm: 1.5,
      area: area || 'القاهرة',
      fullAddress: fullAddress || 'شارع التحرير، القاهرة',
      imageUrl: imageUrl,
      description: description || 'صندوق يحتوي على أشهى المأكولات الطازجة المتبقية اليوم بجودة ممتازة.',
      rating: 4.9,
      reviewsCount: 1,
      pickupWindow: pickupWindow || '08:00 م - 10:00 م',
      coordinates: { lat: 30.0444, lng: 31.2357, xPercent: 50, yPercent: 50 },
      bookingsCount: 0,
      status: 'active',
    };
    onAddOffer(newOffer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#faf6ee] rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto border border-[#e2d6c1] shadow-2xl p-6 relative text-right space-y-4">
        
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white hover:bg-[#eae3d2] text-[#144e3f] flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-xl font-black text-[#144e3f] flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#e58849]" />
          <span>إضافة عرض فائض طعام جديد</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="font-bold text-[#144e3f] block mb-1">عنوان العرض / الصندوق</label>
            <input
              type="text"
              required
              placeholder="مثال: بوكس المشويات المشكلة / علبة حلويات شرقية"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#ded3be] bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#144e3f]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#144e3f] block mb-1">السعر الأصلي (ج.م)</label>
              <input
                type="number"
                required
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-[#ded3be] bg-white font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-[#144e3f] block mb-1">سعر وفرة المخفض (ج.م)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-[#ded3be] bg-white font-bold text-[#e58849]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#144e3f] block mb-1">الكمية المتوفرة (صناديق)</label>
              <input
                type="number"
                required
                value={totalCount}
                onChange={(e) => setTotalCount(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-[#ded3be] bg-white font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-[#144e3f] block mb-1">وقت الصلاحية (بالدقائق)</label>
              <input
                type="number"
                required
                value={expiryMinutes}
                onChange={(e) => setExpiryMinutes(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-[#ded3be] bg-white font-bold"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#144e3f] block mb-1">ميعاد الاستلام من المحل</label>
            <input
              type="text"
              value={pickupWindow}
              onChange={(e) => setPickupWindow(e.target.value)}
              placeholder="مثال: 08:30 م - 10:00 م"
              className="w-full p-3 rounded-xl border border-[#ded3be] bg-white"
            />
          </div>

          <div>
            <label className="font-bold text-[#144e3f] block mb-1">اختر صورة الوجبة</label>
            <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
              {presetImages.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(p.url)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold shrink-0 transition-all ${
                    imageUrl === p.url ? 'bg-[#144e3f] text-white border-[#144e3f]' : 'bg-white text-[#144e3f] border-[#ded3be]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold text-[#144e3f] block mb-1">وصف محتويات الصندوق للعميل</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب نبذة عن الأطعمة الطازجة الموجودة بالصندوق..."
              className="w-full p-3 rounded-xl border border-[#ded3be] bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-[#144e3f] hover:bg-[#0f3c30] text-white font-black text-sm shadow-md cursor-pointer transition-all"
          >
            نشر العرض الآن للزبائن 🚀
          </button>
        </form>

      </div>
    </div>
  );
};
