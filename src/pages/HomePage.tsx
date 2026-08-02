import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Zap, RefreshCw, CreditCard, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '@/features/product/hooks/useProducts';
import { useCategories } from '@/features/product/hooks/useCategories';
import ProductGrid from '@/features/product/components/ProductGrid';
import { ProductGridSkeleton } from '@/features/product/components/ProductSkeleton';
import HeroCarousel from '@/features/ads/components/HeroCarousel';

const UTILITIES = [
  { icon: Cpu, label: 'Siêu Phẩm Mới', color: 'text-indigo-600', bg: 'bg-indigo-50', path: '/products' },
  { icon: ShieldCheck, label: 'Bảo Hành 2 Năm', color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/products' },
  { icon: Zap, label: 'Giao Hỏa Tốc 2H', color: 'text-amber-600', bg: 'bg-amber-50', path: '/products' },
  { icon: RefreshCw, label: 'Thu Cũ Đổi Mới', color: 'text-rose-600', bg: 'bg-rose-50', path: '/products' },
  { icon: CreditCard, label: 'Trả Góp 0% Lãi', color: 'text-sky-600', bg: 'bg-sky-50', path: '/products' },
];

const CATS_PER_PAGE = 10;

export default function HomePage() {
  const { data: newProducts, isLoading } = useProducts({ size: 8, sort: 'newest' });
  const { data: categories } = useCategories();
  const [catPage, setCatPage] = useState(0);

  const totalCatPages = categories ? Math.ceil(categories.length / CATS_PER_PAGE) : 1;
  const visibleCats = categories?.slice(catPage * CATS_PER_PAGE, (catPage + 1) * CATS_PER_PAGE) ?? [];

  return (
    <div className="flex flex-col pb-24 bg-[#FAFAFA]">
      {/* Marketplace Hero Banner — carousel quảng cáo từ seller */}
      <HeroCarousel />

      {/* Utilities Icons Row (Marketplace Style) */}
      <section className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mx-auto max-w-7xl bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between overflow-x-auto pb-4 md:pb-0 scrollbar-hide gap-4 w-full">
            {UTILITIES.map((u, i) => (
              <Link key={i} to={u.path || "/products"} className="flex flex-col items-center justify-center gap-3 group text-center flex-1 min-w-[80px]">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${u.bg} ${u.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <u.icon className="h-6 w-6 stroke-[2]" />
                </div>
                <span className="text-xs font-semibold text-secondary/80 leading-tight group-hover:text-primary transition-colors">{u.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories Grid */}
      {categories && categories.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 mt-10">
          <div className="mx-auto max-w-7xl">
            <div className="relative flex items-center gap-2">
              {/* Prev button */}
              <button
                onClick={() => setCatPage((p) => p - 1)}
                disabled={catPage === 0}
                className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Grid */}
              <div className="flex-1 bg-transparent overflow-hidden">
                <div className="flex items-center pb-5 px-1">
                  <h2 className="text-xl font-extrabold text-secondary uppercase tracking-wider">Danh mục công nghệ</h2>
                  {totalCatPages > 1 && (
                    <span className="ml-auto text-xs text-gray-400 font-semibold">{catPage + 1} / {totalCatPages}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 p-1">
                  {visibleCats.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?categoryId=${cat.id}`}
                      className="group relative flex flex-col items-center justify-center p-5 h-40 rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.06)] hover:border-primary/20 transition-all duration-300 hover:-translate-y-1.5"
                    >
                      <div className="h-16 w-16 mb-4 rounded-xl overflow-hidden flex items-center justify-center bg-primary/5 group-hover:scale-105 transition-transform duration-300">
                        {cat.imageUrl ? (
                          <img src={cat.imageUrl} alt={cat.name} className="h-full w-full object-cover" />
                        ) : (
                          <Tag className="h-7 w-7 text-primary" />
                        )}
                      </div>
                      <span className="text-xs text-center font-bold text-secondary/80 group-hover:text-primary transition-colors line-clamp-2 px-1 tracking-tight">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Next button */}
              <button
                onClick={() => setCatPage((p) => p + 1)}
                disabled={catPage >= totalCatPages - 1}
                className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Suggested Products (Marketplace Style) */}
      <section className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between border-b-2 border-primary pb-3">
            <h2 className="text-xl font-bold tracking-tight text-primary uppercase">Gợi Ý Hôm Nay</h2>
            <Link to="/products?sort=newest" className="text-sm font-semibold text-secondary hover:text-primary flex items-center gap-1 group transition-colors">
              Xem tất cả <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="mt-4">
            {isLoading ? (
              <ProductGridSkeleton count={8} />
            ) : newProducts && newProducts.content.length > 0 ? (
              <ProductGrid products={newProducts.content} />
            ) : (
              <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
                Chưa có sản phẩm gợi ý nào.
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center border-t border-border pt-6">
            <Link
              to="/products"
              className="flex items-center gap-2 rounded-sm border border-primary/40 bg-white px-16 py-2.5 text-sm font-medium text-primary/80 transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              Xem Thêm
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
