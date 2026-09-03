import React from 'react';
import ProductForm from '@/components/admin/ProductForm';
import { getCategories } from '@/lib/data/categories';

export const revalidate = 0;

export default async function NewProductPage() {
  const categories = await getCategories({ includeInvisible: true });

  return (
    <div>
      <ProductForm categories={categories} isNew={true} />
    </div>
  );
}
