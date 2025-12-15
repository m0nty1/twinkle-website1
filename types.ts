export enum UserRole {
  OWNER = 'OWNER',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER'
}

export enum ProductCategory {
  PERFUME = 'PERFUME',
  ACCESSORY = 'ACCESSORY',
  BUNDLE = 'BUNDLE'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  brand?: string; // For perfumes
  images: string[];
  attributes?: {
    size?: string; // ml or dim
    concentration?: string; // EDP, EDT
    notes?: string;
    gender?: 'Male' | 'Female' | 'Unisex';
    material?: string; // Accessories
    color?: string;
  };
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  governorate: string;
  notes?: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
}

export type Language = 'en' | 'ar';