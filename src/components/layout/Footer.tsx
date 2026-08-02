import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

const SOCIALS = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Youtube, label: 'Youtube', href: '#' },
];

const PAYMENTS = ['VISA', 'MASTERCARD', 'JCB', 'VNPAY', 'MOMO', 'COD'];

export default function Footer() {
  return (
    <footer className="w-full bg-[#f4f4f5] border-t border-gray-200 text-zinc-800">
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-xl font-mono tracking-[0.3em] font-black text-black uppercase">C O R E</span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              Hệ thống bán lẻ thiết bị điện tử, máy tính và phụ kiện thông minh hàng đầu. Định hình tương lai công nghệ tối giản.
            </p>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-3">Kết nối</p>
              <div className="flex gap-2.5">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-zinc-600 hover:bg-black hover:border-black hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 font-editorial">Về Chúng Tôi</h4>
            <ul className="space-y-3 text-xs text-zinc-600">
              <li><Link to="#" className="hover:text-black transition-colors">Giới thiệu CORE</Link></li>
              <li><Link to="/products" className="hover:text-black transition-colors">Cửa hàng</Link></li>
              <li><Link to="#" className="hover:text-black transition-colors">Tuyển dụng</Link></li>
              <li><Link to="#" className="hover:text-black transition-colors">Tin tức & Blog</Link></li>
              <li><Link to="#" className="hover:text-black transition-colors">Đối tác</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Support */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 font-editorial">Hỗ Trợ</h4>
            <ul className="space-y-3 text-xs text-zinc-600">
              <li><Link to="#" className="hover:text-black transition-colors">Trung tâm trợ giúp</Link></li>
              <li><Link to="#" className="hover:text-black transition-colors">Giao hàng & Đổi trả</Link></li>
              <li><Link to="#" className="hover:text-black transition-colors">Câu hỏi thường gặp</Link></li>
              <li><Link to="#" className="hover:text-black transition-colors">Hướng dẫn mua hàng</Link></li>
              <li><Link to="#" className="hover:text-black transition-colors">Bảo mật thông tin</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900 font-editorial">Liên Hệ</h4>
            <ul className="space-y-3 text-xs text-zinc-600">
              <li className="flex items-start gap-3">
                <Phone className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-900">1800 CORE <span className="text-zinc-400 text-[10px] font-normal">(miễn phí)</span></p>
                  <p className="text-[10px] text-zinc-400">Thứ Hai – Chủ Nhật, 08:00 – 22:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                <a href="mailto:hi@core.com" className="hover:text-black transition-colors">hi@core.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">Tầng 5, Toà nhà CORE, 12 Nguyễn Văn Bảo, Gò Vấp, TP. Hồ Chí Minh</span>
              </li>
            </ul>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="pt-2"
            >
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">Đăng ký nhận tin</p>
              <div className="flex rounded-md border border-gray-300 bg-white overflow-hidden focus-within:border-black transition-colors max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Email của bạn"
                  className="flex-1 min-w-0 px-3 py-2 text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="bg-black hover:bg-zinc-800 text-white px-4 flex items-center justify-center transition-colors"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom: Payment & Certificate */}
      <div className="container mx-auto px-6 md:px-12 py-6 border-t border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mr-2">Thanh toán</span>
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded border border-gray-300 bg-white text-zinc-600 font-bold"
              >
                {p}
              </span>
            ))}
          </div>
          <a
            href="http://online.gov.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Đã thông báo với Bộ Công Thương
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Footer Bottom: Copyright & Legal */}
      <div className="bg-[#ebebeb] border-t border-gray-200">
        <div className="container mx-auto px-6 md:px-12 py-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[10px] text-zinc-500">
            <div className="space-y-0.5 font-mono">
              <p>© {new Date().getFullYear()} CÔNG TY TNHH CORE TECHNOLOGY. All rights reserved.</p>
              <p>GPĐKKD số 0123456789 do Sở KH&amp;ĐT TP. Hồ Chí Minh cấp ngày 01/01/2026.</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link to="#" className="hover:text-black transition-colors">Điều khoản</Link>
              <Link to="#" className="hover:text-black transition-colors">Bảo mật</Link>
              <Link to="#" className="hover:text-black transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
