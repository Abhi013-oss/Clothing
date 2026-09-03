import React from 'react';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { getProductById } from '@/lib/data/products';
import { getCategories } from '@/lib/data/categories';

export const revalidate = 0;

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, categories] = await Promise.all([
    getProductById(params.id),
    getCategories({ includeInvisible: true }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductForm initialProduct={product} categories={categories} isNew={false} />
    </div>
  );
}
