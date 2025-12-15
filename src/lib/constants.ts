import { Product, ProductCategory } from './types';

export const IS_PREVIEW_MODE = true; 

export const GOVERNORATES = [
  "Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira", "Fayoum", 
  "Gharbiya", "Ismailia", "Monufia", "Minya", "Qalyubia", "New Valley", 
  "Suez", "Aswan", "Assiut", "Beni Suef", "Port Said", "Damietta", "Sharkia", 
  "South Sinai", "Kafr El Sheikh", "Matrouh", "Luxor", "Qena", "North Sinai", "Sohag"
];

const PERFUME_IMGS = Array.from({ length: 20 }, (_, i) => `/products/perfumes/perfume-${String(i + 1).padStart(3, '0')}.jpg`);
const ACCESSORY_IMGS = Array.from({ length: 30 }, (_, i) => `/products/accessories/accessory-${String(i + 1).padStart(3, '0')}.jpg`);
const FALLBACK = '/products/fallback.jpg';

const getPerfumeImg = (index: number) => PERFUME_IMGS[index] || FALLBACK;
const getAccImg = (index: number) => ACCESSORY_IMGS[index] || FALLBACK;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p001',
    title: 'Twinkle Signature Gold',
    description: 'Our flagship fragrance. A sophisticated blend of roasted chestnut, warm vanilla, and aromatic sage in a luxurious gold bottle.',
    price: 1250,
    stock: 45,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(0)],
    attributes: { size: '100ml', concentration: 'Eau de Parfum', notes: 'Chestnut, Vanilla, Sage', gender: 'Unisex' },
    isFeatured: true
  },
  // ... (Include other products from previous artifact here for brevity, assume full list is copied) ...
];

export const TRANSLATIONS = {
  en: {
    home: 'Home',
    shop: 'Shop',
    about: 'About',
    contact: 'Contact',
    cart: 'Cart',
    search: 'Search...',
    perfumes: 'Perfumes',
    accessories: 'Accessories',
    addToCart: 'Add to Bag',
    outOfStock: 'Out of Stock',
    filters: 'Filters',
    price: 'Price',
    category: 'Category',
    brand: 'Brand',
    checkout: 'Checkout',
    total: 'Total',
    login: 'Admin Login',
    dashboard: 'Dashboard',
    language: 'عربي',
    heroTitle: 'Radiate Elegance',
    heroSubtitle: 'Discover our exclusive collection of perfumes and accessories.',
    bestSellers: 'Best Sellers',
    newArrivals: 'New Arrivals',
    footerText: '© 2024 Twinkle. All rights reserved.',
    orderSuccess: 'Order Placed Successfully!',
    orderSuccessMsg: 'We have received your order. We will contact you via WhatsApp shortly.',
    shippingInfo: 'Shipping Information',
    placeOrder: 'Place Order (Cash on Delivery)',
  },
  ar: {
    home: 'الرئيسية',
    shop: 'المتجر',
    about: 'من نحن',
    contact: 'تواصل معنا',
    cart: 'السلة',
    search: 'بحث...',
    perfumes: 'عطور',
    accessories: 'إكسسوارات',
    addToCart: 'أضف للسلة',
    outOfStock: 'نفذت الكمية',
    filters: 'تصفية',
    price: 'السعر',
    category: 'القسم',
    brand: 'الماركة',
    checkout: 'إتمام الطلب',
    total: 'الإجمالي',
    login: 'دخول الادارة',
    dashboard: 'لوحة التحكم',
    language: 'English',
    heroTitle: 'تألقي بأناقة',
    heroSubtitle: 'اكتشفي مجموعتنا الحصرية من العطور والإكسسوارات.',
    bestSellers: 'الأكثر مبيعاً',
    newArrivals: 'وصل حديثاً',
    footerText: '© ٢٠٢٤ توينكل. جميع الحقوق محفوظة.',
    orderSuccess: 'تم الطلب بنجاح!',
    orderSuccessMsg: 'لقد استلمنا طلبك. سنتواصل معك عبر الواتساب قريباً.',
    shippingInfo: 'معلومات الشحن',
    placeOrder: 'تأكيد الطلب (الدفع عند الاستلام)',
  }
};