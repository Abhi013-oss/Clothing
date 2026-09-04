export interface GoogleReview {
  id: string;
  authorName: string;
  authorInitial: string;
  authorColor: string; // Tailwind background color class for Google-style avatar
  badge?: string; // e.g. "Local Guide • 41 reviews"
  reviewCountInfo?: string; // e.g. "2 reviews"
  rating: number; // 5
  relativeTime: string; // e.g. "3 years ago", "a year ago", "7 months ago"
  comment: string;
  likesCount?: number;
  ownerResponse?: {
    text: string;
    relativeTime: string;
  };
}

export const googleReviewsData = {
  averageRating: 5.0,
  totalReviewsCount: 5,
  source: 'Google Maps Business Profile',
  writeReviewUrl: 'https://www.google.com/maps/place/BANWARILAL+CLOTH+HOUSE/@25.9557296,82.0044568,922m/data=!3m1!1e3!4m8!3m7!1s0x399a914be3f9fd9d:0x3d4e2eee5c7b4562!8m2!3d25.9557296!4d82.0070317!9m1!1b1!16s%2Fg%2F11lgyrhdz_?entry=ttu',
  reviews: [
    {
      id: 'rev-001',
      authorName: 'Gaurav Kumar',
      authorInitial: 'G',
      authorColor: 'bg-emerald-600',
      reviewCountInfo: '2 reviews',
      rating: 5,
      relativeTime: '3 years ago',
      comment: 'Cloth material are so 👍 good\nFast service\nGood 👍 behaviors\nHappiness 😊 Nature\nBest 🥇 shop\nNo.1 Quality cloth for Man 👱 Woman 👧 and kids',
      likesCount: 2,
      ownerResponse: {
        text: 'Thank You, Visit Again! 🙏',
        relativeTime: '3 years ago',
      },
    },
    {
      id: 'rev-002',
      authorName: 'Vijay Kumar Kumar',
      authorInitial: 'V',
      authorColor: 'bg-orange-600',
      reviewCountInfo: '2 reviews',
      rating: 5,
      relativeTime: 'a year ago',
      comment: 'Price is good and they have a variety of range 😻 Got a best experience 😜',
      ownerResponse: {
        text: 'Thank You! 🙏',
        relativeTime: 'a year ago',
      },
    },
    {
      id: 'rev-003',
      authorName: 'Ajay Puspjivi',
      authorInitial: 'A',
      authorColor: 'bg-sky-600',
      reviewCountInfo: '1 review',
      rating: 5,
      relativeTime: 'a year ago',
      comment: 'Huge Variety Of Clothing And Price Is Also Good',
      ownerResponse: {
        text: 'Thank You! 🙏',
        relativeTime: 'a year ago',
      },
    },
    {
      id: 'rev-004',
      authorName: 'Shrikant Tripathi',
      authorInitial: 'S',
      authorColor: 'bg-amber-700',
      badge: 'Local Guide • 41 reviews',
      reviewCountInfo: 'Local Guide • 41 reviews • 3 photos',
      rating: 5,
      relativeTime: '7 months ago',
      comment: 'Best Quality Clothes',
      ownerResponse: {
        text: 'Thank You! 🙏 🤩',
        relativeTime: '7 months ago',
      },
    },
    {
      id: 'rev-005',
      authorName: 'Diksha Gupta',
      authorInitial: 'D',
      authorColor: 'bg-teal-600',
      reviewCountInfo: '1 review',
      rating: 5,
      relativeTime: '11 months ago',
      comment: 'Best Shop And Reasonable Price',
    },
  ] as GoogleReview[],
};
