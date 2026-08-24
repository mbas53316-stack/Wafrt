import React from 'react';
import { CategoryType } from '../types';
import { 
  Croissant, 
  Utensils, 
  Apple, 
  CupSoda, 
  ShoppingCart, 
  Cake, 
  LayoutGrid 
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: 'all' as CategoryType, label: 'الكل', icon: LayoutGrid },
    { id: 'bakeries' as CategoryType, label: 'مخابز', icon: Croissant },
    { id: 'restaurants' as CategoryType, label: 'مطاعم', icon: Utensils },
    { id: 'produce' as CategoryType, label: 'خضار وفاكهة', icon: Apple },
    { id: 'beverages' as CategoryType, label: 'مشروبات', icon: CupSoda },
    { id: 'supermarkets' as CategoryType, label: 'سوبر ماركت', icon: ShoppingCart },
    { id: 'sweets' as CategoryType, label: 'حلويات', icon: Cake },
  ];

  return (
    <div className="w-full overflow-x-auto pb-3 pt-1 scrollbar-none">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-max">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              id={`cat-filter-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#144e3f] text-white shadow-xs scale-102 ring-2 ring-[#144e3f]/20'
                  : 'bg-[#ede5d5] hover:bg-[#e4dcba] text-[#334b3f] border border-[#ded3be]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-[#f4a261]' : 'text-[#5a7467]'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
