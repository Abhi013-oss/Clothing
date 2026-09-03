export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  isVisible?: boolean;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}
