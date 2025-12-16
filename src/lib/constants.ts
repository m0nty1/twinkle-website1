import { Product, ProductCategory } from './types';

export const IS_PREVIEW_MODE = false; 

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
  {
    id: 'p002',
    title: 'Black Night',
    description: 'A romantic and dreamy perfume with sensual hints of jasmine and deep musk. Perfect for evening wear.',
    price: 1300,
    stock: 18,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(1)], // perfume-002.jpg
    attributes: { size: '100ml', concentration: 'Parfum', notes: 'Jasmine, Black Musk, Amber', gender: 'Female' },
    isFeatured: true
  },
  {
    id: 'p003',
    title: 'Casablanca White',
    description: 'A refreshing white fragrance inspired by the lush gardens of Casablanca\'s riads. Crisp, clean, and invigorating.',
    price: 1150,
    stock: 25,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(2)], // perfume-003.jpg
    attributes: { size: '100ml', concentration: 'Eau de Parfum', notes: 'White Tea, Neroli, Musk', gender: 'Unisex' }
  },
  {
    id: 'p004',
    title: 'Zomorrodah Emerald',
    description: 'A fragrance that embodies the timeless beauty and sophistication of emeralds. Rich, green, and luxurious.',
    price: 1500,
    stock: 10,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(3)], // perfume-004.jpg
    attributes: { size: '100ml', concentration: 'Parfum', notes: 'Emerald Orchid, Vetiver, Sandalwood', gender: 'Female' },
    isFeatured: true
  },
  {
    id: 'p005',
    title: 'Royal Blue Oud',
    description: 'An ornate masterpiece. Deep blue oud encased in a handcrafted bottle. Smoky, woody, and intense.',
    price: 1600,
    stock: 8,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(4)], // perfume-005.jpg
    attributes: { size: '80ml', concentration: 'Extrait de Parfum', notes: 'Blue Oud, Incense, Leather', gender: 'Unisex' }
  },
  {
    id: 'p006',
    title: 'Antique Bronze Musk',
    description: 'Warm, spicy, and inviting. Presented in a vintage-inspired bronze vessel.',
    price: 1450,
    stock: 12,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(5)], // perfume-006.jpg
    attributes: { size: '100ml', concentration: 'Eau de Parfum', notes: 'Musk, Cinnamon, Tonka Bean', gender: 'Unisex' }
  },
  {
    id: 'p007',
    title: 'Midnight Rose Elixir',
    description: 'A romantic evening scent featuring Bulgarian rose, dark amber, and a touch of oud.',
    price: 1100,
    stock: 30,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(6)], // perfume-007.jpg
    attributes: { size: '100ml', concentration: 'Eau de Parfum', notes: 'Rose, Amber, Oud', gender: 'Female' }
  },
  {
    id: 'p008',
    title: 'Pure Jasmine',
    description: 'A single-note masterpiece capturing the essence of Egyptian jasmine fields at dawn.',
    price: 950,
    stock: 40,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(7)],
    attributes: { size: '50ml', concentration: 'Eau de Toilette', notes: 'Jasmine, Green Tea', gender: 'Female' }
  },
  {
    id: 'p009',
    title: 'Oud Wood Intense',
    description: 'Dark, woody, and commanding. A scent for those who lead.',
    price: 1800,
    stock: 5,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(8)],
    attributes: { size: '100ml', concentration: 'Parfum', notes: 'Oud, Cedar, Pepper', gender: 'Male' }
  },
  {
    id: 'p010',
    title: 'Vanilla Dreams',
    description: 'Sweet, comforting, and nostalgic. Like a warm embrace.',
    price: 800,
    stock: 60,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(9)],
    attributes: { size: '50ml', concentration: 'Eau de Toilette', notes: 'Vanilla, Caramel, Milk', gender: 'Female' }
  },
  {
    id: 'p011',
    title: 'Citrus Burst',
    description: 'An explosion of lime, mandarin, and bergamot. The ultimate summer scent.',
    price: 900,
    stock: 35,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(10)],
    attributes: { size: '100ml', concentration: 'Eau de Cologne', notes: 'Lime, Mandarin, Bergamot', gender: 'Unisex' }
  },
  {
    id: 'p012',
    title: 'Mystic Amber',
    description: 'Deep and resinous amber with a touch of sweet smoke.',
    price: 1350,
    stock: 15,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(11)],
    attributes: { size: '100ml', concentration: 'Eau de Parfum', notes: 'Amber, Labdanum, Vanilla', gender: 'Unisex' }
  },
  {
    id: 'p013',
    title: 'Ocean Breeze',
    description: 'Salty, aquatic, and fresh. Reminiscent of the Mediterranean coast.',
    price: 1050,
    stock: 28,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(12)],
    attributes: { size: '100ml', concentration: 'Eau de Toilette', notes: 'Sea Salt, Sage, Driftwood', gender: 'Male' }
  },
  {
    id: 'p014',
    title: 'Velvet Iris',
    description: 'Powdery, floral, and elegant. A classic scent for formal occasions.',
    price: 1400,
    stock: 12,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(13)],
    attributes: { size: '75ml', concentration: 'Eau de Parfum', notes: 'Iris, Violet, Musk', gender: 'Female' }
  },
  {
    id: 'p015',
    title: 'Spiced Leather',
    description: 'A bold combination of worn leather and exotic spices.',
    price: 1550,
    stock: 8,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(14)],
    attributes: { size: '100ml', concentration: 'Eau de Parfum', notes: 'Leather, Cardamom, Saffron', gender: 'Male' }
  },
  {
    id: 'p016',
    title: 'Golden Honey',
    description: 'Rich, sweet, and animalic honey notes balanced with tobacco.',
    price: 1250,
    stock: 20,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(15)],
    attributes: { size: '100ml', concentration: 'Eau de Parfum', notes: 'Honey, Tobacco, Hay', gender: 'Unisex' }
  },
  {
    id: 'p017',
    title: 'Night Blooming Jasmine',
    description: 'Intense white floral that comes alive in the dark.',
    price: 1100,
    stock: 22,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(16)],
    attributes: { size: '50ml', concentration: 'Parfum', notes: 'Jasmine Sambac, Tuberose', gender: 'Female' }
  },
  {
    id: 'p018',
    title: 'Cedar & Smoke',
    description: 'Dry woodiness with a wisp of incense smoke.',
    price: 1300,
    stock: 14,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(17)],
    attributes: { size: '100ml', concentration: 'Eau de Toilette', notes: 'Cedarwood, Incense, Vetiver', gender: 'Male' }
  },
  {
    id: 'p019',
    title: 'Berry Musk',
    description: 'Playful fruity notes resting on a clean musk base.',
    price: 900,
    stock: 50,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(18)],
    attributes: { size: '100ml', concentration: 'Eau de Parfum', notes: 'Raspberry, Blackberry, White Musk', gender: 'Female' }
  },
  {
    id: 'p020',
    title: 'Sandalwood Serenity',
    description: 'Creamy, smooth sandalwood for inner peace and calm.',
    price: 1450,
    stock: 16,
    category: ProductCategory.PERFUME,
    brand: 'Twinkle',
    images: [getPerfumeImg(19)],
    attributes: { size: '50ml', concentration: 'Parfum', notes: 'Sandalwood, Coconut, Fig', gender: 'Unisex' }
  },

  // =========================================
  // ACCESSORIES (30 Items)
  // =========================================
  {
    id: 'a001',
    title: 'The Layered Gold Edit',
    description: 'A curated set of three gold-plated chains. Includes a snake chain and pendant.',
    price: 450,
    stock: 25,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(0)],
    attributes: { material: '18K Gold Plated', color: 'Gold' },
    isFeatured: true
  },
  {
    id: 'a002',
    title: 'Stacked Ring Set',
    description: 'Set of 5 delicate bands including textured and smooth finishes.',
    price: 390,
    stock: 22,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(1)],
    attributes: { material: 'Gold Plated', color: 'Gold' }
  },
  {
    id: 'a003',
    title: 'Pearl & Gold Drop Earrings',
    description: 'Genuine freshwater pearls suspended from a gold-plated hoop. Classic elegance.',
    price: 380,
    stock: 15,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(2)],
    attributes: { material: 'Freshwater Pearl, Gold Plated', color: 'Gold/White' }
  },
  {
    id: 'a004',
    title: 'Classic Tennis Bracelet',
    description: 'Timeless luxury. A delicate line of cubic zirconia set in gold plating.',
    price: 550,
    stock: 30,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(3)],
    attributes: { material: 'Gold Plated, CZ', color: 'Gold' }
  },
  {
    id: 'a005',
    title: 'Vintage Coin Pendant',
    description: 'Inspired by ancient Roman coins, this pendant adds history to your neckline.',
    price: 420,
    stock: 20,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(4)],
    attributes: { material: '18K Gold Plated', color: 'Gold' }
  },
  {
    id: 'a006',
    title: 'Twisted Gold Hoops',
    description: 'Thick, hollow tube hoops with a unique twisted texture. Lightweight for daily wear.',
    price: 280,
    stock: 50,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(5)],
    attributes: { material: 'Stainless Steel, Gold Plated', color: 'Gold' }
  },
  {
    id: 'a007',
    title: 'Emerald Signet Ring',
    description: 'A modern take on the signet ring featuring a rectangular emerald-cut zirconia.',
    price: 350,
    stock: 12,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(6)],
    attributes: { material: 'Gold Plated', color: 'Gold/Green' }
  },
  {
    id: 'a008',
    title: 'Chain Link Watch Stack',
    description: 'Bold paperclip chain links paired with a classic watch style bracelet.',
    price: 480,
    stock: 18,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(7)],
    attributes: { material: '18K Gold Plated', color: 'Gold' }
  },
  {
    id: 'a009',
    title: 'Opal & Gold Ring Stack',
    description: 'A mesmerizing faux-opal center stone surrounded by textured gold bands.',
    price: 400,
    stock: 15,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(8)],
    attributes: { material: 'Gold Plated, Opalite', color: 'Gold/Iridescent' }
  },
  {
    id: 'a010',
    title: 'Minimalist Cuff',
    description: 'Sleek, open cuff design that adjusts to fit any wrist.',
    price: 300,
    stock: 35,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(9)],
    attributes: { material: 'Stainless Steel', color: 'Silver' }
  },
  {
    id: 'a011',
    title: 'Chunky Gold Chain',
    description: 'Make a statement with this bold, thick curb chain.',
    price: 600,
    stock: 10,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(10)],
    attributes: { material: 'Gold Plated', color: 'Gold' }
  },
  {
    id: 'a012',
    title: 'Celestial Star Necklace',
    description: 'Delicate chain featuring a starburst pendant with tiny crystals.',
    price: 350,
    stock: 28,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(11)],
    attributes: { material: 'Gold Plated', color: 'Gold' }
  },
  {
    id: 'a013',
    title: 'Rose Gold Bangle',
    description: 'Warm rose gold tone in a classic hinged bangle design.',
    price: 450,
    stock: 20,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(12)],
    attributes: { material: 'Rose Gold Plated', color: 'Rose Gold' }
  },
  {
    id: 'a014',
    title: 'Geometric Dangle Earrings',
    description: 'Modern art for your ears. Squares and circles in balance.',
    price: 320,
    stock: 18,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(13)],
    attributes: { material: 'Brass', color: 'Gold' }
  },
  {
    id: 'a015',
    title: 'Anklet with Charms',
    description: 'Summer essential. Delicate chain with tiny heart charms.',
    price: 250,
    stock: 40,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(14)],
    attributes: { material: 'Gold Plated', color: 'Gold' }
  },
  {
    id: 'a016',
    title: 'Pearl Choker',
    description: '90s vibe with a modern twist. Small freshwater pearls.',
    price: 500,
    stock: 15,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(15)],
    attributes: { material: 'Pearl', color: 'White' }
  },
  {
    id: 'a017',
    title: 'Initial Necklace (A-Z)',
    description: 'Personalized gold letter pendant on a fine chain.',
    price: 380,
    stock: 100,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(16)],
    attributes: { material: 'Gold Plated', color: 'Gold' }
  },
  {
    id: 'a018',
    title: 'Wrap Ring',
    description: 'Adjustable wrap design looking like a snake or vine.',
    price: 290,
    stock: 25,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(17)],
    attributes: { material: 'Silver Plated', color: 'Silver' }
  },
  {
    id: 'a019',
    title: 'Boho Bead Bracelet',
    description: 'Colorful beads mixed with gold spacers.',
    price: 200,
    stock: 50,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(18)],
    attributes: { material: 'Beads', color: 'Multicolor' }
  },
  {
    id: 'a020',
    title: 'Statement Ear Cuff',
    description: 'No piercing needed. Clips onto the cartilage.',
    price: 180,
    stock: 30,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(19)],
    attributes: { material: 'Gold Plated', color: 'Gold' }
  },
  {
    id: 'a021',
    title: 'Velvet Choker',
    description: 'Black velvet ribbon with a small gold charm.',
    price: 220,
    stock: 15,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(20)],
    attributes: { material: 'Velvet', color: 'Black' }
  },
  {
    id: 'a022',
    title: 'Locket Necklace',
    description: 'Keep a photo of your loved one close.',
    price: 550,
    stock: 10,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(21)],
    attributes: { material: 'Gold Plated', color: 'Gold' }
  },
  {
    id: 'a023',
    title: 'Twisted Bangle Set',
    description: 'Set of 3 bangles with different twisted textures.',
    price: 400,
    stock: 22,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(22)],
    attributes: { material: 'Mixed Metal', color: 'Mixed' }
  },
  {
    id: 'a024',
    title: 'Crystal Drop Earrings',
    description: 'Elegant long earrings for evening wear.',
    price: 480,
    stock: 12,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(23)],
    attributes: { material: 'Crystal, Silver', color: 'Silver' }
  },
  {
    id: 'a025',
    title: 'Double Finger Ring',
    description: 'Edgy design that spans across two fingers.',
    price: 360,
    stock: 8,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(24)],
    attributes: { material: 'Gold Plated', color: 'Gold' }
  },
  {
    id: 'a026',
    title: 'Turquoise Studs',
    description: 'Pop of color with genuine turquoise stones.',
    price: 300,
    stock: 18,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(25)],
    attributes: { material: 'Turquoise', color: 'Blue' }
  },
  {
    id: 'a027',
    title: 'Leather Wrap Bracelet',
    description: 'Casual leather bracelet with metallic clasp.',
    price: 350,
    stock: 25,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(26)],
    attributes: { material: 'Leather', color: 'Brown' }
  },
  {
    id: 'a028',
    title: 'Sun & Moon Ring',
    description: 'Celestial motifs engraved on a wide band.',
    price: 330,
    stock: 20,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(27)],
    attributes: { material: 'Gold Plated', color: 'Gold' }
  },
  {
    id: 'a029',
    title: 'Tassel Earrings',
    description: 'Fun and flirty silk tassels.',
    price: 280,
    stock: 15,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(28)],
    attributes: { material: 'Silk Thread', color: 'Red' }
  },
  {
    id: 'a030',
    title: 'Herringbone Chain',
    description: 'Flat, liquid gold effect. Very shiny.',
    price: 520,
    stock: 12,
    category: ProductCategory.ACCESSORY,
    images: [getAccImg(29)],
    attributes: { material: 'Gold Plated', color: 'Gold' }
  }
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