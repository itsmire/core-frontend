// mockAdapter.ts - Giả lập toàn bộ API của Core Technology Microservices
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// Dữ liệu ban đầu
const INITIAL_CATEGORIES = [
  { id: 'cat_01', name: 'Laptops & Computers', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150', created_at: new Date().toISOString() },
  { id: 'cat_02', name: 'Smartphones & Tablets', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150', created_at: new Date().toISOString() },
  { id: 'cat_03', name: 'Audio & Wearables', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150', created_at: new Date().toISOString() },
  { id: 'cat_04', name: 'Smart Home Devices', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=150', created_at: new Date().toISOString() },
  { id: 'cat_05', name: 'Gaming Gear & Accessories', imageUrl: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=150', created_at: new Date().toISOString() }
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod_01',
    categoryId: 'cat_01',
    sellerId: 'user_002_seller',
    name: 'CoreBook Pro 15',
    description: 'High-performance laptop with Intel i7, 16GB RAM, 512GB SSD and 15.6-inch IPS screen.',
    price: 1299.00,
    stock: 50,
    soldCount: 12,
    status: 'ACTIVE',
    verified: true,
    images: ['https://images.unsplash.com/photo-1496181130204-755241524eab?w=600'],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_02',
    categoryId: 'cat_01',
    sellerId: 'user_002_seller',
    name: 'CoreStation Mini PC',
    description: 'Compact desktop PC featuring AMD Ryzen 5, 8GB DDR4, and silent cooling system.',
    price: 499.00,
    stock: 30,
    soldCount: 4,
    status: 'ACTIVE',
    verified: true,
    images: ['https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600'],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_03',
    categoryId: 'cat_02',
    sellerId: 'user_002_seller',
    name: 'CorePhone Neo 5G',
    description: 'Flagship smartphone with AMOLED display, 108MP camera, and 5000mAh battery.',
    price: 799.00,
    stock: 100,
    soldCount: 45,
    status: 'ACTIVE',
    verified: true,
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_04',
    categoryId: 'cat_02',
    sellerId: 'user_002_seller',
    name: 'CorePad Air 10',
    description: 'Slim 10.1-inch tablet with stylus support, perfect for digital drawing and note-taking.',
    price: 349.00,
    stock: 80,
    soldCount: 18,
    status: 'ACTIVE',
    verified: true,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600'],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_05',
    categoryId: 'cat_03',
    sellerId: 'user_002_seller',
    name: 'CoreBuds Active ANC',
    description: 'True wireless earbuds with Active Noise Cancelling, ultra-low latency, and 30-hour battery life.',
    price: 89.00,
    stock: 150,
    soldCount: 95,
    status: 'ACTIVE',
    verified: true,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600'],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_06',
    categoryId: 'cat_03',
    sellerId: 'user_002_seller',
    name: 'CoreWatch Fit Pro',
    description: 'Smartwatch featuring heart rate monitor, SpO2 sensor, and 14 built-in sports modes.',
    price: 129.00,
    stock: 120,
    soldCount: 60,
    status: 'ACTIVE',
    verified: true,
    images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600'],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_07',
    categoryId: 'cat_04',
    sellerId: 'user_002_seller',
    name: 'CoreHub Smart Gateway',
    description: 'Zigbee 3.0 control center for connecting and automating all smart home devices.',
    price: 59.00,
    stock: 60,
    soldCount: 8,
    status: 'ACTIVE',
    verified: true,
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=600'],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_08',
    categoryId: 'cat_04',
    sellerId: 'user_002_seller',
    name: 'CoreBulb RGB Duo',
    description: 'Pack of 2 smart Wi-Fi LED bulbs with 16 million colors and voice assistant support.',
    price: 29.99,
    stock: 200,
    soldCount: 110,
    status: 'ACTIVE',
    verified: true,
    images: ['https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600'],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_09',
    categoryId: 'cat_05',
    sellerId: 'user_002_seller',
    name: 'CoreMouse Shadow RGB',
    description: 'Lightweight 16000 DPI gaming mouse with optical switches and customizable macro buttons.',
    price: 49.00,
    stock: 180,
    soldCount: 74,
    status: 'ACTIVE',
    verified: true,
    images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600'],
    created_at: new Date().toISOString()
  },
  {
    id: 'prod_10',
    categoryId: 'cat_05',
    sellerId: 'user_002_seller',
    name: 'CoreKeys Mechanical Pro',
    description: 'Tenkeyless mechanical gaming keyboard with tactile blue switches and custom RGB lighting.',
    price: 79.99,
    stock: 90,
    soldCount: 32,
    status: 'ACTIVE',
    verified: true,
    images: ['https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600'],
    created_at: new Date().toISOString()
  }
];

const INITIAL_ADDRESSES = [
  {
    id: 'addr_01',
    receiverName: 'Trần Vũ Uyên My',
    phone: '0901234567',
    province: 'Hồ Chí Minh',
    district: 'Quận Gò Vấp',
    ward: 'Phường 4',
    street: '12 Nguyễn Văn Bảo',
    default: true
  }
];

// Helper lưu/lấy LocalStorage
const getStorage = <T>(key: string, initial: T): T => {
  const coreKey = key + '_core';
  const val = localStorage.getItem(coreKey);
  if (!val) {
    localStorage.setItem(coreKey, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(val);
  } catch {
    return initial;
  }
};

const setStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key + '_core', JSON.stringify(data));
};

export default function mockAdapter(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    const url = config.url || '';
    const method = (config.method || 'get').toLowerCase();
    const data = config.data ? (typeof config.data === 'string' ? JSON.parse(config.data) : config.data) : null;
    const params = config.params || {};

    // Khởi tạo DB local
    const categories = getStorage('mock_categories', INITIAL_CATEGORIES);
    const products = getStorage('mock_products', INITIAL_PRODUCTS);
    const addresses = getStorage('mock_addresses', INITIAL_ADDRESSES);
    const cart = getStorage<{ items: any[] }>('mock_cart', { items: [] });
    const orders = getStorage('mock_orders', []);

    const userProfile = {
      id: 'user_001_buyer',
      fullName: 'Trần Vũ Uyên My',
      phone: '0901234567',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      email: 'tranvuuyenmy0305@gmail.com',
      role: localStorage.getItem('mock_role') || 'USER',
      accountStatus: 'ACTIVE',
      banned: false,
      muted: false
    };

    const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

    delay().then(() => {
      // 1. AUTHENTICATION & PROFILE
      if (url.endsWith('/api/auth/login')) {
        const role = data.email === 'admin@core.com' ? 'ADMIN' : (data.email === 'seller@core.com' ? 'SELLER' : 'USER');
        localStorage.setItem('access_token', 'mock_jwt_token_header');
        localStorage.setItem('refresh_token', 'mock_refresh_token_body');
        localStorage.setItem('mock_role', role);
        return resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          data: {
            accessToken: 'mock_jwt_token_header',
            refreshToken: 'mock_refresh_token_body',
            user: { ...userProfile, role }
          }
        });
      }

      if (url.endsWith('/api/auth/register')) {
        const demoOtp = '123456';
        localStorage.setItem('mock_otp_' + data.email, demoOtp);
        return resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          data: { email: data.email, message: 'OTP_SENT_TO_EMAIL', demoOtp }
        });
      }

      if (url.includes('/api/auth/verify-email')) {
        return resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          data: 'EMAIL_VERIFIED_SUCCESS'
        });
      }

      if (url.includes('/api/auth/resend-verification')) {
        return resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          data: 'VERIFICATION_RESENT'
        });
      }

      if (url.endsWith('/api/auth/forgot-password')) {
        return resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          data: 'OTP_SENT'
        });
      }

      if (url.endsWith('/api/auth/reset-password')) {
        return resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          data: 'PASSWORD_RESET_SUCCESS'
        });
      }

      if (url.endsWith('/api/auth/logout')) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('mock_role');
        return resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          data: 'LOGOUT_SUCCESS'
        });
      }

      if (url.endsWith('/api/users/me')) {
        return resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          data: userProfile
        });
      }

      if (url.endsWith('/api/users/address')) {
        if (method === 'get') {
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: addresses });
        }
        if (method === 'post') {
          const newAddr = {
            id: 'addr_' + Date.now(),
            ...data,
            default: data.default || addresses.length === 0
          };
          if (newAddr.default) {
            addresses.forEach((a: any) => a.default = false);
          }
          addresses.push(newAddr);
          setStorage('mock_addresses', addresses);
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: newAddr });
        }
      }

      const addressIdMatch = url.match(/\/api\/users\/address\/([a-zA-Z0-9_-]+)$/);
      if (addressIdMatch) {
        const id = addressIdMatch[1];
        if (method === 'put') {
          const updated = addresses.map((a: any) => {
            if (a.id === id) {
              const res = { ...a, ...data };
              if (data.default) {
                addresses.forEach((item: any) => item.default = false);
                res.default = true;
              }
              return res;
            }
            return a;
          });
          setStorage('mock_addresses', updated);
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: updated.find((a: any) => a.id === id) });
        }
        if (method === 'delete') {
          const filtered = addresses.filter((a: any) => a.id !== id);
          if (filtered.length > 0 && !filtered.some((a: any) => a.default)) {
            filtered[0].default = true;
          }
          setStorage('mock_addresses', filtered);
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: { id } });
        }
      }

      // 2. PRODUCT & CATEGORY CATALOG
      if (url.endsWith('/api/products/categories')) {
        return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: categories });
      }

      if (url.endsWith('/api/products')) {
        if (method === 'get') {
          let list = [...products];

          // Filter keyword
          if (params.keyword) {
            const kw = params.keyword.toLowerCase();
            list = list.filter(p => p.name.toLowerCase().includes(kw) || p.description.toLowerCase().includes(kw));
          }
          // Filter category
          if (params.categoryId) {
            list = list.filter(p => p.categoryId === params.categoryId);
          }
          // Filter seller
          if (params.sellerId) {
            list = list.filter(p => p.sellerId === params.sellerId);
          }

          const page = params.page || 0;
          const size = params.size || 10;
          const paginated = list.slice(page * size, (page + 1) * size);

          return resolve({
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
            data: {
              content: paginated,
              totalPages: Math.ceil(list.length / size),
              totalElements: list.length,
              number: page,
              size
            }
          });
        }
        if (method === 'post') {
          const newProd = {
            id: 'prod_' + Date.now(),
            ...data,
            images: data.images || ['https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600'],
            soldCount: 0,
            status: 'ACTIVE',
            verified: true,
            created_at: new Date().toISOString()
          };
          products.push(newProd);
          setStorage('mock_products', products);
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: newProd });
        }
      }

      const productIdMatch = url.match(/\/api\/products\/([a-zA-Z0-9_-]+)$/);
      if (productIdMatch && !url.includes('categories') && !url.includes('reviews')) {
        const id = productIdMatch[1];
        if (method === 'get') {
          const found = products.find(p => p.id === id);
          if (found) {
            return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: found });
          }
          return reject({ response: { status: 404, data: { message: 'PRODUCT_NOT_FOUND' } } });
        }
        if (method === 'put') {
          const updatedList = products.map(p => (p.id === id ? { ...p, ...data } : p));
          setStorage('mock_products', updatedList);
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: updatedList.find(p => p.id === id) });
        }
        if (method === 'delete') {
          const filtered = products.filter(p => p.id !== id);
          setStorage('mock_products', filtered);
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: { id } });
        }
      }

      // 3. CART MANAGEMENT
      if (url.endsWith('/api/cart')) {
        if (method === 'get') {
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: cart });
        }
        if (method === 'post') {
          const existing = cart.items.find(item => item.productId === data.productId);
          if (existing) {
            existing.quantity += (data.quantity || 1);
          } else {
            const product = products.find(p => p.id === data.productId);
            cart.items.push({
              id: 'cart_item_' + Date.now(),
              productId: data.productId,
              productName: product?.name || 'Sản phẩm công nghệ',
              price: product?.price || 99.00,
              quantity: data.quantity || 1,
              imageUrl: product?.images?.[0] || ''
            });
          }
          setStorage('mock_cart', cart);
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: cart });
        }
      }

      const cartItemMatch = url.match(/\/api\/cart\/items\/([a-zA-Z0-9_-]+)$/);
      if (cartItemMatch) {
        const itemId = cartItemMatch[1];
        if (method === 'put') {
          cart.items = cart.items.map(item => (item.id === itemId ? { ...item, quantity: data.quantity } : item));
          setStorage('mock_cart', cart);
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: cart });
        }
        if (method === 'delete') {
          cart.items = cart.items.filter(item => item.id !== itemId);
          setStorage('mock_cart', cart);
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: cart });
        }
      }

      // 4. ORDER & CHECKOUT FLOW
      if (url.endsWith('/api/orders')) {
        if (method === 'get') {
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: orders });
        }
        if (method === 'post') {
          const newOrder = {
            id: 'order_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
            userId: userProfile.id,
            items: cart.items.map(item => ({
              productId: item.productId,
              productName: item.productName,
              price: item.price,
              quantity: item.quantity,
              imageUrl: item.imageUrl
            })),
            shippingAddress: data.shippingAddress || addresses.find((a: any) => a.default) || {},
            paymentMethod: data.paymentMethod || 'COD',
            totalPrice: cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: 'PENDING',
            created_at: new Date().toISOString()
          };

          orders.push(newOrder);
          setStorage('mock_orders', orders);

          // Xóa giỏ hàng
          cart.items = [];
          setStorage('mock_cart', cart);

          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: newOrder });
        }
      }

      const orderIdMatch = url.match(/\/api\/orders\/([a-zA-Z0-9_-]+)$/);
      if (orderIdMatch) {
        const id = orderIdMatch[1];
        const found = orders.find((o: any) => o.id === id);
        if (found) {
          return resolve({ status: 200, statusText: 'OK', headers: {}, config, data: found });
        }
        return reject({ response: { status: 404, data: { message: 'ORDER_NOT_FOUND' } } });
      }

      // 5. CORE AI ASSISTANT CHATBOT (SIMULATION)
      if (url.endsWith('/api/ai/chat')) {
        const msg = (data.message || '').toLowerCase();
        let reply = '';

        if (msg.includes('chào') || msg.includes('hello') || msg.includes('hi')) {
          reply = 'Xin chào! Tôi là trợ lý AI của CORE Technology. Tôi có thể giúp bạn tìm kiếm thiết bị điện tử, tư vấn Laptop/Điện thoại hoặc giải đáp các chính sách mua hàng. Bạn cần tôi hỗ trợ gì ạ?';
        } else if (msg.includes('đổi trả') || msg.includes('hoàn tiền') || msg.includes('lỗi')) {
          reply = 'Chính sách đổi trả của CORE cho phép bạn yêu cầu đổi trả/hoàn tiền trong vòng **7 ngày** kể từ khi nhận hàng đối với các trường hợp lỗi phần cứng do nhà sản xuất hoặc sản phẩm giao sai mô tả. Vui lòng giữ nguyên hộp và phụ kiện để được hỗ trợ nhanh nhất nhé!';
        } else if (msg.includes('vận chuyển') || msg.includes('giao hàng') || msg.includes('ship')) {
          reply = 'CORE hợp tác với GHN và GHTK. Đơn hàng nội thành HCM sẽ được giao trong vòng 1-2 ngày làm việc (có tùy chọn giao nhanh CORE Now trong 2h). Các đơn liên tỉnh sẽ mất từ 3-5 ngày làm việc. Toàn bộ thiết bị đều được đóng gói chống sốc 3 lớp để đảm bảo an toàn tuyệt đối.';
        } else if (msg.includes('laptop') || msg.includes('máy tính')) {
          reply = 'Hiện tại mẫu **CoreBook Pro 15** đang có giá khuyến mãi chỉ 1,299 USD (giảm 10%). Cấu hình mạnh mẽ Core i7, 16GB RAM, 512GB SSD vô cùng thích hợp cho công việc văn phòng và thiết kế đồ họa. Bạn có muốn thêm vào giỏ hàng ngay không?';
        } else if (msg.includes('điện thoại') || msg.includes('phone')) {
          reply = 'Chúng tôi có dòng **CorePhone Neo 5G** với màn hình AMOLED sắc nét, camera 108MP chụp ảnh siêu đẹp và pin dung lượng lớn 5000mAh, giá chỉ 799 USD. Rất đáng để sở hữu trong tầm giá!';
        } else {
          reply = 'Cảm ơn câu hỏi của bạn. CORE Technology là sàn thương mại điện tử chuyên cung cấp thiết bị công nghệ chính hãng. Tôi có thể giúp gì thêm cho bạn về sản phẩm, đơn hàng hay phương thức thanh toán?';
        }

        return resolve({
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          data: {
            reply,
            conversationId: data.conversationId || 'mock_conv_' + Date.now()
          }
        });
      }

      // CÁC ENDPOINT MẶC ĐỊNH
      return resolve({
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
        data: []
      });
    });
  });
}
