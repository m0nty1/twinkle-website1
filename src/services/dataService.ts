import { Product, User, Order, AuditLog, UserRole, OrderStatus } from '../lib/types';
import { INITIAL_PRODUCTS } from '../lib/constants';

const KEYS = {
  PRODUCTS: 'twinkle_products',
  ORDERS: 'twinkle_orders',
  LOGS: 'twinkle_logs',
  MEDIA: 'twinkle_media'
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const isBrowser = typeof window !== 'undefined';

export const DataService = {
  getProducts: (): Product[] => {
    if (!isBrowser) return INITIAL_PRODUCTS;
    const stored = localStorage.getItem(KEYS.PRODUCTS);
    if (!stored) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(stored);
  },

  saveProduct: async (product: Product, user: User): Promise<void> => {
    if (!isBrowser) return;
    await delay(300);
    const products = DataService.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    
    let action = 'Created product';
    if (index >= 0) {
      products[index] = product;
      action = 'Updated product';
    } else {
      products.push(product);
    }
    
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    DataService.logAction(user, `${action}: ${product.title}`);
  },

  deleteProduct: async (productId: string, user: User): Promise<void> => {
    if (!isBrowser) return;
    await delay(300);
    const products = DataService.getProducts();
    const filtered = products.filter(p => p.id !== productId);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(filtered));
    DataService.logAction(user, `Deleted product ID: ${productId}`);
  },

  getOrders: (): Order[] => {
    if (!isBrowser) return [];
    const stored = localStorage.getItem(KEYS.ORDERS);
    return stored ? JSON.parse(stored) : [];
  },

  createOrder: async (order: Order): Promise<void> => {
    if (!isBrowser) return;
    await delay(500);
    const orders = DataService.getOrders();
    orders.unshift(order); 
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));

    const products = DataService.getProducts();
    order.items.forEach(item => {
      const prodIndex = products.findIndex(p => p.id === item.id);
      if (prodIndex >= 0) {
        products[prodIndex].stock = Math.max(0, products[prodIndex].stock - item.quantity);
      }
    });
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus, user: User): Promise<void> => {
    if (!isBrowser) return;
    await delay(300);
    const orders = DataService.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index >= 0) {
      orders[index].status = status;
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
      DataService.logAction(user, `Updated Order #${orderId} to ${status}`);
    }
  },

  getMediaLibrary: (): string[] => {
    if (!isBrowser) return [];
    const stored = localStorage.getItem(KEYS.MEDIA);
    if (stored) return JSON.parse(stored);
    
    const perfumePaths = Array.from({ length: 20 }, (_, i) => `/products/perfumes/perfume-${String(i + 1).padStart(3, '0')}.jpg`);
    const accPaths = Array.from({ length: 30 }, (_, i) => `/products/accessories/accessory-${String(i + 1).padStart(3, '0')}.jpg`);
    
    const initialMedia = [...perfumePaths, ...accPaths];
    localStorage.setItem(KEYS.MEDIA, JSON.stringify(initialMedia));
    return initialMedia;
  },

  addToMediaLibrary: async (path: string, user: User): Promise<void> => {
    if (!isBrowser) return;
    await delay(300);
    const media = DataService.getMediaLibrary();
    if (!media.includes(path)) {
      media.push(path);
      localStorage.setItem(KEYS.MEDIA, JSON.stringify(media));
      DataService.logAction(user, `Added image ref: ${path}`);
    }
  },

  getLogs: (): AuditLog[] => {
    if (!isBrowser) return [];
    const stored = localStorage.getItem(KEYS.LOGS);
    return stored ? JSON.parse(stored) : [];
  },

  logAction: (user: User, action: string) => {
    if (!isBrowser) return;
    const logs = DataService.getLogs();
    const newLog: AuditLog = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      action,
      timestamp: new Date().toISOString()
    };
    logs.unshift(newLog);
    localStorage.setItem(KEYS.LOGS, JSON.stringify(logs));
  },

  login: async (email: string, password: string): Promise<User | null> => {
    await delay(500);
    if (email === 'admin@twinkle.com' && password === 'admin') {
      return { id: 'u1', name: 'Owner', email, role: UserRole.OWNER };
    }
    if (email === 'editor@twinkle.com' && password === 'editor') {
      return { id: 'u2', name: 'Editor', email, role: UserRole.EDITOR };
    }
    return null;
  }
};