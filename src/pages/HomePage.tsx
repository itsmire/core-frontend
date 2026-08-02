import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Zap, RefreshCw, CreditCard, ArrowRight, Sparkles, Star, ShoppingBag, Laptop, Smartphone, Headphones, Home, Gamepad2 } from 'lucide-react';
import { useProducts } from '@/features/product/hooks/useProducts';
import { useCategories } from '@/features/product/hooks/useCategories';
import ProductGrid from '@/features/product/components/ProductGrid';
import { ProductGridSkeleton } from '@/features/product/components/ProductSkeleton';

const COMMITMENTS = [
  { id: '01', title: 'Bảo Hành 2 Năm', desc: 'Chính sách bảo hành vàng cho mọi thiết bị CORE.' },
  { id: '02', title: 'Giao Hỏa Tốc 2H', desc: 'Vận chuyển nhanh nội thành chỉ trong 2 tiếng.' },
  { id: '03', title: 'Thu Cũ Đổi Mới', desc: 'Trợ giá lên đời máy mới tiết kiệm đến 30%.' },
  { id: '04', title: 'Trả Góp 0% Lãi', desc: 'Hỗ trợ trả góp linh hoạt qua thẻ tín dụng.' },
  { id: '05', title: '100% Chính Hãng', desc: 'Cam kết nguồn gốc xuất xứ chính hãng từ nhà sản xuất.' },
  { id: '06', title: 'Miễn Phí Vận Chuyển', desc: 'Cho mọi đơn hàng công nghệ từ 2 triệu đồng.' },
  { id: '07', title: 'Đổi Trả 7 Ngày', desc: 'Đổi trả miễn phí, hỗ trợ nhanh chóng tận tâm.' },
];

export default function HomePage() {
  const { data: newProducts, isLoading } = useProducts({ size: 8, sort: 'newest' });
  const { data: categories } = useCategories();

  // Helper để lấy ảnh đại diện tĩnh cho bento grid khi API chưa trả về hoặc thiếu
  const getCategoryPlaceholder = (catId: string) => {
    switch (catId) {
      case 'cat_01': return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'; // Laptop
      case 'cat_02': return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'; // Phone
      case 'cat_03': return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'; // Audio
      case 'cat_04': return 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500'; // Smart Home
      case 'cat_05': return 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=500'; // Gaming Gear
      default: return 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500';
    }
  };

  return (
    <div className="flex flex-col pb-24 bg-[#f9f9fb]">
      
      {/* 1. Split-Screen Hero Section */}
      <section className="relative bg-white border-b border-gray-200 overflow-hidden py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left: Editorial Headline */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-100 text-zinc-800 font-mono text-xs font-semibold tracking-wider uppercase">
              <Cpu className="w-3.5 h-3.5" /> [00] CORE SYSTEM V2.0
            </div>
            <h1 className="font-editorial text-5xl md:text-7xl font-black text-black leading-[0.95] uppercase tracking-tighter">
              Thiết bị <br />
              công nghệ <br />
              <span className="text-[#ff3b30] underline decoration-1 decoration-dashed underline-offset-8">đỉnh cao</span>
            </h1>
            <p className="text-zinc-500 text-sm md:text-base max-w-lg leading-relaxed font-light">
              Hệ sinh thái CORE mang triết lý tối giản thuần khiết, tích hợp hiệu năng tối đa cùng tính thẩm mỹ hiện đại của thời đại số.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded bg-black hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider px-8 py-4 transition-all duration-300 shadow-md hover:-translate-y-0.5"
              >
                Khám phá sản phẩm <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#commitments"
                className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-bold uppercase tracking-wider px-6 py-4 transition-all"
              >
                Cam kết dịch vụ
              </a>
            </div>
          </div>

          {/* Hero Right: Floating Device Mockup collage */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-3xl bg-zinc-50 border border-gray-200 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.02)] relative flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-radial-gradient from-zinc-100/50 to-transparent pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800"
                alt="CoreBook Pro Signature"
                className="w-[85%] h-auto object-contain z-10 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800';
                }}
              />
              <div className="absolute bottom-4 left-6 z-15 font-mono text-[9px] text-zinc-400 tracking-widest uppercase">
                COREBOOK PRO 15 // SIGNATURE EDITION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bento Grid Categories Section */}
      <section className="px-6 md:px-12 mt-20 max-w-7xl mx-auto w-full">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] text-zinc-400 font-bold tracking-widest uppercase mb-1">
              [01] CATEGORIES
            </div>
            <h2 className="font-editorial text-3xl font-black text-black uppercase tracking-tight">
              Danh mục thiết bị
            </h2>
          </div>
          <Link to="/products" className="text-xs font-bold uppercase tracking-wider text-[#ff3b30] hover:underline flex items-center gap-1">
            Tất cả danh mục <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[160px]">
          
          {/* Bento Item 1: Laptops (2x2) */}
          <Link
            to="/products?categoryId=cat_01"
            className="md:col-span-2 md:row-span-2 bg-white border border-gray-200 rounded-3xl p-8 flex flex-col justify-between overflow-hidden group relative hover:border-black hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
          >
            <div className="z-10">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-mono text-[9px] font-bold uppercase tracking-widest mb-3">
                <Laptop className="w-3 h-3" /> Core Laptops
              </span>
              <h3 className="text-xl font-extrabold text-black uppercase tracking-tight font-editorial">
                Laptops & Computers
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-[200px] leading-relaxed">
                Máy tính xách tay tối giản, hiệu suất vượt trội cho công việc.
              </p>
            </div>
            <div className="absolute right-[-10px] bottom-[-20px] w-[55%] aspect-square flex items-center justify-center z-5">
              <img
                src={getCategoryPlaceholder('cat_01')}
                alt="Laptops"
                className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="font-mono text-[9px] text-zinc-300 tracking-wider">
              VIEW SPECIFICATIONS →
            </div>
          </Link>

          {/* Bento Item 2: Smartphones (1x2) - Tall card */}
          <Link
            to="/products?categoryId=cat_02"
            className="md:col-span-1 md:row-span-2 bg-[#fafafa] border border-gray-200 rounded-3xl p-6 flex flex-col justify-between overflow-hidden group relative hover:border-black hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
          >
            <div className="z-10">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-mono text-[9px] font-bold uppercase tracking-widest mb-3">
                <Smartphone className="w-3 h-3" /> Mobile Devices
              </span>
              <h3 className="text-lg font-extrabold text-black uppercase tracking-tight font-editorial leading-tight">
                Smartphones & Tablets
              </h3>
            </div>
            <div className="my-2 h-[150px] w-full flex items-center justify-center z-5">
              <img
                src={getCategoryPlaceholder('cat_02')}
                alt="Smartphones"
                className="h-full object-contain rounded-xl group-hover:translate-y-[-5px] transition-transform duration-500"
              />
            </div>
            <div className="font-mono text-[9px] text-zinc-400 tracking-wider">
              [02] EXPLORE CELLULAR
            </div>
          </Link>

          {/* Bento Item 3: Audio (1x1) */}
          <Link
            to="/products?categoryId=cat_03"
            className="md:col-span-1 md:row-span-1 bg-white border border-gray-200 rounded-3xl p-5 flex items-center justify-between overflow-hidden group hover:border-black hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
          >
            <div className="space-y-1 max-w-[55%]">
              <h3 className="text-sm font-extrabold text-zinc-900 uppercase tracking-tight font-editorial leading-tight">
                Audio & Wearables
              </h3>
              <span className="inline-block font-mono text-[8px] text-zinc-400 tracking-wider">
                [03] HEAR CORE
              </span>
            </div>
            <div className="w-[40%] aspect-square flex items-center justify-center">
              <img
                src={getCategoryPlaceholder('cat_03')}
                alt="Audio"
                className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>

          {/* Bento Item 4: Smart Home (1x1) */}
          <Link
            to="/products?categoryId=cat_04"
            className="md:col-span-1 md:row-span-1 bg-[#fafafa] border border-gray-200 rounded-3xl p-5 flex items-center justify-between overflow-hidden group hover:border-black hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
          >
            <div className="space-y-1 max-w-[55%]">
              <h3 className="text-sm font-extrabold text-zinc-900 uppercase tracking-tight font-editorial leading-tight">
                Smart Home Devices
              </h3>
              <span className="inline-block font-mono text-[8px] text-zinc-400 tracking-wider">
                [04] DOMESTIC TECH
              </span>
            </div>
            <div className="w-[40%] aspect-square flex items-center justify-center">
              <img
                src={getCategoryPlaceholder('cat_04')}
                alt="Smart Home"
                className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>

          {/* Bento Item 5: Gaming Gear (2x1) */}
          <Link
            to="/products?categoryId=cat_05"
            className="md:col-span-2 md:row-span-1 bg-white border border-gray-200 rounded-3xl p-5 flex items-center justify-between overflow-hidden group hover:border-black hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
          >
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-mono text-[8px] font-bold uppercase tracking-widest">
                <Gamepad2 className="w-3 h-3" /> Gaming Gear
              </span>
              <h3 className="text-lg font-extrabold text-black uppercase tracking-tight font-editorial">
                Gaming Gear & Accessories
              </h3>
              <p className="text-[11px] text-zinc-400 max-w-[300px]">
                Bàn phím, chuột và tay cầm chơi game phản hồi siêu nhạy.
              </p>
            </div>
            <div className="w-[28%] aspect-square flex items-center justify-center">
              <img
                src={getCategoryPlaceholder('cat_05')}
                alt="Gaming"
                className="w-full h-full object-contain rounded-xl group-hover:rotate-[-3deg] group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Link>

        </div>
      </section>

      {/* 3. Featured Products Section */}
      <section className="px-6 md:px-12 mt-20 max-w-7xl mx-auto w-full">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <div className="font-mono text-[10px] text-zinc-400 font-bold tracking-widest uppercase mb-1">
              [02] Curation
            </div>
            <h2 className="font-editorial text-3xl font-black text-black uppercase tracking-tight">
              Sản phẩm nổi bật
            </h2>
          </div>
          <Link
            to="/products?sort=newest"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-black hover:text-[#ff3b30] transition-colors"
          >
            Xem tất cả sản phẩm <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        <div>
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : newProducts && newProducts.content.length > 0 ? (
            <ProductGrid products={newProducts.content} />
          ) : (
            <div className="py-16 text-center text-zinc-400 bg-white rounded-2xl border border-gray-100">
              Không có sản phẩm nào để hiển thị.
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded border border-black bg-black hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider px-16 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
          >
            Tất cả sản phẩm
          </Link>
        </div>
      </section>

      {/* 4. Tech Spec Commitments Section */}
      <section id="commitments" className="px-6 md:px-12 mt-24 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <div className="font-mono text-[10px] text-zinc-400 font-bold tracking-widest uppercase mb-1">
            [03] Technical Specs
          </div>
          <h2 className="font-editorial text-3xl font-black text-black uppercase tracking-tight">
            Cam kết dịch vụ
          </h2>
        </div>

        {/* Spec grid: 7 commitments + 1 technical graphic spec card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMMITMENTS.map((c) => (
            <div
              key={c.id}
              className="p-6 bg-white border border-gray-200 rounded-2xl flex flex-col justify-between hover:border-black/30 transition-colors duration-300"
            >
              <div className="font-mono text-[10px] text-[#ff3b30] font-bold tracking-widest mb-4">
                [{c.id}] CORE SERVICE
              </div>
              <div className="space-y-2 mt-4">
                <h3 className="text-base font-extrabold text-black uppercase tracking-tight font-editorial">
                  {c.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Slot 8: Asymmetric Branded Technical spec graphic */}
          <div className="p-6 bg-black text-white rounded-2xl flex flex-col justify-between font-mono text-[10px] tracking-wider relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-white uppercase text-[11px]">CORE SYSTEM V2.0</p>
                <p className="text-zinc-500 text-[9px] mt-0.5">EST. 2026 // MINIMALIST HARDWARE</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b30] animate-pulse" />
            </div>

            {/* Vertical Barcode Graphics using pure CSS/HTML divs */}
            <div className="my-6 flex items-end gap-[2px] h-12 w-full opacity-60">
              <div className="w-[3px] h-full bg-white" />
              <div className="w-[1px] h-full bg-white" />
              <div className="w-[2px] h-full bg-white" />
              <div className="w-[4px] h-full bg-white" />
              <div className="w-[1px] h-full bg-white" />
              <div className="w-[3px] h-full bg-white" />
              <div className="w-[1px] h-full bg-white" />
              <div className="w-[2px] h-full bg-white" />
              <div className="w-[5px] h-full bg-white" />
              <div className="w-[1px] h-full bg-white" />
              <div className="w-[2px] h-full bg-white" />
              <div className="w-[3px] h-full bg-white" />
              <div className="w-[1px] h-full bg-white" />
              <div className="w-[4px] h-full bg-white" />
              <div className="w-[1px] h-full bg-white" />
              <div className="w-[2px] h-full bg-white" />
              <div className="w-[3px] h-full bg-white" />
            </div>

            <div className="flex justify-between items-end border-t border-zinc-800 pt-3 text-[9px] text-zinc-500">
              <span>SYSTEM: OK</span>
              <span>VERIFIED: 100%</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
