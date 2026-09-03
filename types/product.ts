export type AvailabilityStatus = 'in_stock' | 'out_of_stock' | 'upon_request';

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText: string;
  displayOrder: number;
  isPrimary: boolean;
  width?: number;
  height?: number;
}

export interface ProductSpecification {
  fabric?: string;
  color?: string;
  sizesAvailable?: string[];
  patternDetails?: string;
  careInstructions?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName?: string;
  categorySlug?: string;
  description: string;
  price?: number;            // If undefined or null, displayed as "Price on Request"
  compareAtPrice?: number;   // Comparative original price (discount indicator)
  specifications: ProductSpecification;
  availability: AvailabilityStatus;
  featured: boolean;
  displayOrder: number;
  relatedProductIds?: string[];
  images: ProductImage[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
