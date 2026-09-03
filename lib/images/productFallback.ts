/**
 * Smart Contextual Image Fallback Helper
 * Returns appropriate high-resolution fashion photography matching the garment name
 */

export function getProductFallbackImage(name: string = '', category: string = ''): string {
  const query = `${name} ${category}`.toLowerCase();

  if (query.includes('lehenga') || query.includes('bridal') || query.includes('velvet') || query.includes('zardosi')) {
    return 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85';
  }

  if (query.includes('saree') || query.includes('sari') || query.includes('katan') || query.includes('organza') || query.includes('tussar') || query.includes('pallu')) {
    if (query.includes('tussar') || query.includes('gold') || query.includes('yellow') || query.includes('mustard')) {
      return 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85';
    }
    if (query.includes('organza') || query.includes('peach') || query.includes('pink')) {
      return 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85';
    }
    return 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85';
  }

  if (query.includes('kurti') || query.includes('anarkali') || query.includes('modal') || query.includes('gown')) {
    if (query.includes('modal') || query.includes('cotton') || query.includes('straight')) {
      return 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=85';
    }
    return 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=1200&q=85';
  }

  if (query.includes('suit') || query.includes('chanderi') || query.includes('dress material') || query.includes('unstitched')) {
    if (query.includes('brocade') || query.includes('emerald') || query.includes('banarasi')) {
      return 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85';
    }
    return 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85';
  }

  if (query.includes('shirt') || query.includes('linen') || query.includes('shirting')) {
    if (query.includes('giza') || query.includes('blue') || query.includes('fabric')) {
      return 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=85';
    }
    return 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85';
  }

  if (query.includes('trouser') || query.includes('pant') || query.includes('bottom') || query.includes('wool-blend')) {
    return 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=85';
  }

  if (query.includes('suiting') || query.includes('houndstooth') || query.includes('poly-wool')) {
    return 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85';
  }

  if (query.includes('fabric') || query.includes('textile') || query.includes('cloth') || query.includes('weaves')) {
    return 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85';
  }

  // Default fallback for any clothing piece
  return 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85';
}
