import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/types/api.types';
import { formatPrice } from '@/utils/format';
import RatingStars from '@/components/common/RatingStars';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const defaultPlaceholder = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600';
  const mainImage = product.images?.[0] || defaultPlaceholder;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 p-3 hover:shadow-minimal-hover transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="relative aspect-square overflow-hidden rounded-xl bg-[#F8F9FA]">
        <img
          src={mainImage}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = defaultPlaceholder;
          }}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
        />
        {product.status !== 'ACTIVE' && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-xs">
            <span className="rounded bg-[#ff3b30] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Ngưng bán
            </span>
          </div>
        )}
      </Link>

      {/* Quick Add to Cart */}
      {onAddToCart && product.status === 'ACTIVE' && product.stock > 0 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
          className="absolute bottom-[calc(40%+1rem)] left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap rounded bg-black px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg opacity-0 transition-all duration-300 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-zinc-800 hover:scale-102 z-10"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Thêm vào giỏ
        </button>
      )}

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-2 pb-1 pt-4">
        <Link
          to={`/products/${product.id}`}
          className="line-clamp-2 text-xs font-bold leading-snug text-zinc-900 hover:text-[#ff3b30] transition-colors tracking-tight"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex flex-col gap-1.5">
          <div className="flex items-end justify-between">
            <span className="text-base font-black text-black font-editorial tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.stock <= 5 && product.stock > 0 ? (
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Còn {product.stock}
              </span>
            ) : product.stock === 0 ? (
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">Hết hàng</span>
            ) : null}
          </div>
          
          <div className="flex items-center justify-between pt-1 border-t border-gray-50 opacity-90 transition-opacity">
            <RatingStars rating={product.ratingAvg ?? 0} reviewCount={product.ratingCount ?? 0} />
            {(product.soldCount ?? 0) > 0 && (
              <span className="text-[10px] font-mono text-zinc-400">
                Đã bán {product.soldCount! >= 1000
                  ? `${(product.soldCount! / 1000).toFixed(1)}k`
                  : product.soldCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
