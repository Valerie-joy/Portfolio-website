// GENERATED FILE — do not edit by hand.
// Produced by scripts/src/build-portfolio.ts from the portfolio folders at the
// repository root. Regenerate with: pnpm --filter @workspace/scripts run portfolio

export type PortfolioKind = 'work' | 'process' | 'credentials';

export interface PortfolioImage {
  id: string;
  thumb: string;
  view: string;
  width: number;
  height: number;
  group: string | null;
}

export interface PortfolioDocument {
  id: string;
  title: string;
  file: string;
}

export interface PortfolioCategory {
  slug: string;
  title: string;
  blurb: string;
  kind: PortfolioKind;
  count: number;
  cover: PortfolioImage | null;
  images: PortfolioImage[];
  documents: PortfolioDocument[];
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    "slug": "skincare-content",
    "title": "Skincare Content",
    "blurb": "Skincare product content across two brand sets, CeraVe and I-on.",
    "kind": "work",
    "count": 16,
    "cover": {
      "id": "cerave-2",
      "thumb": "/portfolio/skincare-content/thumb/cerave-2.webp",
      "view": "/portfolio/skincare-content/view/cerave-2.webp",
      "width": 1254,
      "height": 1254,
      "group": "CeraVe"
    },
    "images": [
      {
        "id": "cerave-2",
        "thumb": "/portfolio/skincare-content/thumb/cerave-2.webp",
        "view": "/portfolio/skincare-content/view/cerave-2.webp",
        "width": 1254,
        "height": 1254,
        "group": "CeraVe"
      },
      {
        "id": "cerave-3",
        "thumb": "/portfolio/skincare-content/thumb/cerave-3.webp",
        "view": "/portfolio/skincare-content/view/cerave-3.webp",
        "width": 1254,
        "height": 1254,
        "group": "CeraVe"
      },
      {
        "id": "cerave-4",
        "thumb": "/portfolio/skincare-content/thumb/cerave-4.webp",
        "view": "/portfolio/skincare-content/view/cerave-4.webp",
        "width": 1254,
        "height": 1254,
        "group": "CeraVe"
      },
      {
        "id": "cerave-5",
        "thumb": "/portfolio/skincare-content/thumb/cerave-5.webp",
        "view": "/portfolio/skincare-content/view/cerave-5.webp",
        "width": 1254,
        "height": 1254,
        "group": "CeraVe"
      },
      {
        "id": "cerave-6",
        "thumb": "/portfolio/skincare-content/thumb/cerave-6.webp",
        "view": "/portfolio/skincare-content/view/cerave-6.webp",
        "width": 1254,
        "height": 1254,
        "group": "CeraVe"
      },
      {
        "id": "cerave-7",
        "thumb": "/portfolio/skincare-content/thumb/cerave-7.webp",
        "view": "/portfolio/skincare-content/view/cerave-7.webp",
        "width": 1254,
        "height": 1254,
        "group": "CeraVe"
      },
      {
        "id": "cerave-8",
        "thumb": "/portfolio/skincare-content/thumb/cerave-8.webp",
        "view": "/portfolio/skincare-content/view/cerave-8.webp",
        "width": 1254,
        "height": 1254,
        "group": "CeraVe"
      },
      {
        "id": "cerave-9",
        "thumb": "/portfolio/skincare-content/thumb/cerave-9.webp",
        "view": "/portfolio/skincare-content/view/cerave-9.webp",
        "width": 1254,
        "height": 1254,
        "group": "CeraVe"
      },
      {
        "id": "cerave-10",
        "thumb": "/portfolio/skincare-content/thumb/cerave-10.webp",
        "view": "/portfolio/skincare-content/view/cerave-10.webp",
        "width": 1254,
        "height": 1254,
        "group": "CeraVe"
      },
      {
        "id": "i-on-16",
        "thumb": "/portfolio/skincare-content/thumb/i-on-16.webp",
        "view": "/portfolio/skincare-content/view/i-on-16.webp",
        "width": 1600,
        "height": 1600,
        "group": "I-on"
      },
      {
        "id": "i-on-17",
        "thumb": "/portfolio/skincare-content/thumb/i-on-17.webp",
        "view": "/portfolio/skincare-content/view/i-on-17.webp",
        "width": 1600,
        "height": 1600,
        "group": "I-on"
      },
      {
        "id": "i-on-23",
        "thumb": "/portfolio/skincare-content/thumb/i-on-23.webp",
        "view": "/portfolio/skincare-content/view/i-on-23.webp",
        "width": 1600,
        "height": 1600,
        "group": "I-on"
      },
      {
        "id": "i-on-25",
        "thumb": "/portfolio/skincare-content/thumb/i-on-25.webp",
        "view": "/portfolio/skincare-content/view/i-on-25.webp",
        "width": 1600,
        "height": 1600,
        "group": "I-on"
      },
      {
        "id": "i-on-26",
        "thumb": "/portfolio/skincare-content/thumb/i-on-26.webp",
        "view": "/portfolio/skincare-content/view/i-on-26.webp",
        "width": 1600,
        "height": 1600,
        "group": "I-on"
      },
      {
        "id": "i-on-37",
        "thumb": "/portfolio/skincare-content/thumb/i-on-37.webp",
        "view": "/portfolio/skincare-content/view/i-on-37.webp",
        "width": 1600,
        "height": 1600,
        "group": "I-on"
      },
      {
        "id": "i-on-66",
        "thumb": "/portfolio/skincare-content/thumb/i-on-66.webp",
        "view": "/portfolio/skincare-content/view/i-on-66.webp",
        "width": 1600,
        "height": 1600,
        "group": "I-on"
      }
    ],
    "documents": []
  },
  {
    "slug": "mockup-products",
    "title": "Mockup Products",
    "blurb": "Apparel and accessory mockups — shirts, outerwear and hard goods placed on realistic surfaces.",
    "kind": "work",
    "count": 12,
    "cover": {
      "id": "syborg-jacket-front",
      "thumb": "/portfolio/mockup-products/thumb/syborg-jacket-front.webp",
      "view": "/portfolio/mockup-products/view/syborg-jacket-front.webp",
      "width": 1600,
      "height": 1644,
      "group": null
    },
    "images": [
      {
        "id": "ccs-shirt-sample-1",
        "thumb": "/portfolio/mockup-products/thumb/ccs-shirt-sample-1.webp",
        "view": "/portfolio/mockup-products/view/ccs-shirt-sample-1.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "ccs-shirt-sample-2",
        "thumb": "/portfolio/mockup-products/thumb/ccs-shirt-sample-2.webp",
        "view": "/portfolio/mockup-products/view/ccs-shirt-sample-2.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "ccs-shirt-sample-3",
        "thumb": "/portfolio/mockup-products/thumb/ccs-shirt-sample-3.webp",
        "view": "/portfolio/mockup-products/view/ccs-shirt-sample-3.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "m1",
        "thumb": "/portfolio/mockup-products/thumb/m1.webp",
        "view": "/portfolio/mockup-products/view/m1.webp",
        "width": 1600,
        "height": 2143,
        "group": null
      },
      {
        "id": "m2",
        "thumb": "/portfolio/mockup-products/thumb/m2.webp",
        "view": "/portfolio/mockup-products/view/m2.webp",
        "width": 1600,
        "height": 2143,
        "group": null
      },
      {
        "id": "mm2",
        "thumb": "/portfolio/mockup-products/thumb/mm2.webp",
        "view": "/portfolio/mockup-products/view/mm2.webp",
        "width": 1600,
        "height": 2143,
        "group": null
      },
      {
        "id": "mm3",
        "thumb": "/portfolio/mockup-products/thumb/mm3.webp",
        "view": "/portfolio/mockup-products/view/mm3.webp",
        "width": 1600,
        "height": 2143,
        "group": null
      },
      {
        "id": "mmm1",
        "thumb": "/portfolio/mockup-products/thumb/mmm1.webp",
        "view": "/portfolio/mockup-products/view/mmm1.webp",
        "width": 1600,
        "height": 2143,
        "group": null
      },
      {
        "id": "mmmm1",
        "thumb": "/portfolio/mockup-products/thumb/mmmm1.webp",
        "view": "/portfolio/mockup-products/view/mmmm1.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "syborg-jacket-back",
        "thumb": "/portfolio/mockup-products/thumb/syborg-jacket-back.webp",
        "view": "/portfolio/mockup-products/view/syborg-jacket-back.webp",
        "width": 1600,
        "height": 1569,
        "group": null
      },
      {
        "id": "syborg-jacket-front",
        "thumb": "/portfolio/mockup-products/thumb/syborg-jacket-front.webp",
        "view": "/portfolio/mockup-products/view/syborg-jacket-front.webp",
        "width": 1600,
        "height": 1644,
        "group": null
      },
      {
        "id": "watch-1",
        "thumb": "/portfolio/mockup-products/thumb/watch-1.webp",
        "view": "/portfolio/mockup-products/view/watch-1.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      }
    ],
    "documents": []
  },
  {
    "slug": "real-estate-content",
    "title": "Real Estate Content",
    "blurb": "Property listing creatives sized for Facebook and Instagram campaigns.",
    "kind": "work",
    "count": 9,
    "cover": {
      "id": "ig-1",
      "thumb": "/portfolio/real-estate-content/thumb/ig-1.webp",
      "view": "/portfolio/real-estate-content/view/ig-1.webp",
      "width": 1600,
      "height": 1986,
      "group": null
    },
    "images": [
      {
        "id": "fb-1",
        "thumb": "/portfolio/real-estate-content/thumb/fb-1.webp",
        "view": "/portfolio/real-estate-content/view/fb-1.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "fb-2",
        "thumb": "/portfolio/real-estate-content/thumb/fb-2.webp",
        "view": "/portfolio/real-estate-content/view/fb-2.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "fb-3",
        "thumb": "/portfolio/real-estate-content/thumb/fb-3.webp",
        "view": "/portfolio/real-estate-content/view/fb-3.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "fb-4",
        "thumb": "/portfolio/real-estate-content/thumb/fb-4.webp",
        "view": "/portfolio/real-estate-content/view/fb-4.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "ig-1",
        "thumb": "/portfolio/real-estate-content/thumb/ig-1.webp",
        "view": "/portfolio/real-estate-content/view/ig-1.webp",
        "width": 1600,
        "height": 1986,
        "group": null
      },
      {
        "id": "ig-2",
        "thumb": "/portfolio/real-estate-content/thumb/ig-2.webp",
        "view": "/portfolio/real-estate-content/view/ig-2.webp",
        "width": 1600,
        "height": 1986,
        "group": null
      },
      {
        "id": "ig-3",
        "thumb": "/portfolio/real-estate-content/thumb/ig-3.webp",
        "view": "/portfolio/real-estate-content/view/ig-3.webp",
        "width": 1600,
        "height": 2133,
        "group": null
      },
      {
        "id": "ig-4",
        "thumb": "/portfolio/real-estate-content/thumb/ig-4.webp",
        "view": "/portfolio/real-estate-content/view/ig-4.webp",
        "width": 1600,
        "height": 2133,
        "group": null
      },
      {
        "id": "ig-5",
        "thumb": "/portfolio/real-estate-content/thumb/ig-5.webp",
        "view": "/portfolio/real-estate-content/view/ig-5.webp",
        "width": 1600,
        "height": 2133,
        "group": null
      }
    ],
    "documents": []
  },
  {
    "slug": "fashion-ads",
    "title": "Fashion Ads",
    "blurb": "Streetwear and sportswear ad creatives built around bold typographic lockups.",
    "kind": "work",
    "count": 4,
    "cover": {
      "id": "nike-air-ad",
      "thumb": "/portfolio/fashion-ads/thumb/nike-air-ad.webp",
      "view": "/portfolio/fashion-ads/view/nike-air-ad.webp",
      "width": 1080,
      "height": 1080,
      "group": null
    },
    "images": [
      {
        "id": "ad-born-streets",
        "thumb": "/portfolio/fashion-ads/thumb/ad-born-streets.webp",
        "view": "/portfolio/fashion-ads/view/ad-born-streets.webp",
        "width": 1600,
        "height": 2057,
        "group": null
      },
      {
        "id": "just-do-it-ad",
        "thumb": "/portfolio/fashion-ads/thumb/just-do-it-ad.webp",
        "view": "/portfolio/fashion-ads/view/just-do-it-ad.webp",
        "width": 1080,
        "height": 1080,
        "group": null
      },
      {
        "id": "nike-air-ad",
        "thumb": "/portfolio/fashion-ads/thumb/nike-air-ad.webp",
        "view": "/portfolio/fashion-ads/view/nike-air-ad.webp",
        "width": 1080,
        "height": 1080,
        "group": null
      },
      {
        "id": "urban-ad",
        "thumb": "/portfolio/fashion-ads/thumb/urban-ad.webp",
        "view": "/portfolio/fashion-ads/view/urban-ad.webp",
        "width": 1600,
        "height": 2057,
        "group": null
      }
    ],
    "documents": []
  },
  {
    "slug": "performance-ads",
    "title": "Performance Ads",
    "blurb": "Direct-response ad variants designed to be tested against one another.",
    "kind": "work",
    "count": 7,
    "cover": {
      "id": "1",
      "thumb": "/portfolio/performance-ads/thumb/1.webp",
      "view": "/portfolio/performance-ads/view/1.webp",
      "width": 1600,
      "height": 1600,
      "group": null
    },
    "images": [
      {
        "id": "1",
        "thumb": "/portfolio/performance-ads/thumb/1.webp",
        "view": "/portfolio/performance-ads/view/1.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "2",
        "thumb": "/portfolio/performance-ads/thumb/2.webp",
        "view": "/portfolio/performance-ads/view/2.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "3",
        "thumb": "/portfolio/performance-ads/thumb/3.webp",
        "view": "/portfolio/performance-ads/view/3.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "4",
        "thumb": "/portfolio/performance-ads/thumb/4.webp",
        "view": "/portfolio/performance-ads/view/4.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "5",
        "thumb": "/portfolio/performance-ads/thumb/5.webp",
        "view": "/portfolio/performance-ads/view/5.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "6",
        "thumb": "/portfolio/performance-ads/thumb/6.webp",
        "view": "/portfolio/performance-ads/view/6.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "7",
        "thumb": "/portfolio/performance-ads/thumb/7.webp",
        "view": "/portfolio/performance-ads/view/7.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      }
    ],
    "documents": []
  },
  {
    "slug": "supplements-amazon",
    "title": "Supplements Amazon",
    "blurb": "Listing and A+ style imagery prepared for supplement products on Amazon.",
    "kind": "work",
    "count": 5,
    "cover": {
      "id": "1",
      "thumb": "/portfolio/supplements-amazon/thumb/1.webp",
      "view": "/portfolio/supplements-amazon/view/1.webp",
      "width": 1254,
      "height": 1254,
      "group": null
    },
    "images": [
      {
        "id": "1",
        "thumb": "/portfolio/supplements-amazon/thumb/1.webp",
        "view": "/portfolio/supplements-amazon/view/1.webp",
        "width": 1254,
        "height": 1254,
        "group": null
      },
      {
        "id": "59",
        "thumb": "/portfolio/supplements-amazon/thumb/59.webp",
        "view": "/portfolio/supplements-amazon/view/59.webp",
        "width": 1254,
        "height": 1254,
        "group": null
      },
      {
        "id": "71",
        "thumb": "/portfolio/supplements-amazon/thumb/71.webp",
        "view": "/portfolio/supplements-amazon/view/71.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "revise-4",
        "thumb": "/portfolio/supplements-amazon/thumb/revise-4.webp",
        "view": "/portfolio/supplements-amazon/view/revise-4.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "revised-60",
        "thumb": "/portfolio/supplements-amazon/thumb/revised-60.webp",
        "view": "/portfolio/supplements-amazon/view/revised-60.webp",
        "width": 1254,
        "height": 1254,
        "group": null
      }
    ],
    "documents": []
  },
  {
    "slug": "jewelry-content",
    "title": "Jewelry Content",
    "blurb": "Close-range jewellery imagery composed for catalogue and social placements.",
    "kind": "work",
    "count": 5,
    "cover": {
      "id": "22",
      "thumb": "/portfolio/jewelry-content/thumb/22.webp",
      "view": "/portfolio/jewelry-content/view/22.webp",
      "width": 1080,
      "height": 1080,
      "group": null
    },
    "images": [
      {
        "id": "22",
        "thumb": "/portfolio/jewelry-content/thumb/22.webp",
        "view": "/portfolio/jewelry-content/view/22.webp",
        "width": 1080,
        "height": 1080,
        "group": null
      },
      {
        "id": "23",
        "thumb": "/portfolio/jewelry-content/thumb/23.webp",
        "view": "/portfolio/jewelry-content/view/23.webp",
        "width": 1080,
        "height": 1080,
        "group": null
      },
      {
        "id": "24",
        "thumb": "/portfolio/jewelry-content/thumb/24.webp",
        "view": "/portfolio/jewelry-content/view/24.webp",
        "width": 1080,
        "height": 1080,
        "group": null
      },
      {
        "id": "25",
        "thumb": "/portfolio/jewelry-content/thumb/25.webp",
        "view": "/portfolio/jewelry-content/view/25.webp",
        "width": 1080,
        "height": 1080,
        "group": null
      },
      {
        "id": "26",
        "thumb": "/portfolio/jewelry-content/thumb/26.webp",
        "view": "/portfolio/jewelry-content/view/26.webp",
        "width": 1080,
        "height": 1080,
        "group": null
      }
    ],
    "documents": []
  },
  {
    "slug": "gym-supplement-content",
    "title": "Gym Supplement Content",
    "blurb": "Product-led creatives for fitness and supplement brands.",
    "kind": "work",
    "count": 5,
    "cover": {
      "id": "7",
      "thumb": "/portfolio/gym-supplement-content/thumb/7.webp",
      "view": "/portfolio/gym-supplement-content/view/7.webp",
      "width": 970,
      "height": 600,
      "group": null
    },
    "images": [
      {
        "id": "7",
        "thumb": "/portfolio/gym-supplement-content/thumb/7.webp",
        "view": "/portfolio/gym-supplement-content/view/7.webp",
        "width": 970,
        "height": 600,
        "group": null
      },
      {
        "id": "32",
        "thumb": "/portfolio/gym-supplement-content/thumb/32.webp",
        "view": "/portfolio/gym-supplement-content/view/32.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "35",
        "thumb": "/portfolio/gym-supplement-content/thumb/35.webp",
        "view": "/portfolio/gym-supplement-content/view/35.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "36",
        "thumb": "/portfolio/gym-supplement-content/thumb/36.webp",
        "view": "/portfolio/gym-supplement-content/view/36.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      },
      {
        "id": "42",
        "thumb": "/portfolio/gym-supplement-content/thumb/42.webp",
        "view": "/portfolio/gym-supplement-content/view/42.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      }
    ],
    "documents": []
  },
  {
    "slug": "banners",
    "title": "Banners",
    "blurb": "Wide-format banner layouts built for web headers and campaign placements.",
    "kind": "work",
    "count": 2,
    "cover": {
      "id": "1",
      "thumb": "/portfolio/banners/thumb/1.webp",
      "view": "/portfolio/banners/view/1.webp",
      "width": 1600,
      "height": 556,
      "group": null
    },
    "images": [
      {
        "id": "1",
        "thumb": "/portfolio/banners/thumb/1.webp",
        "view": "/portfolio/banners/view/1.webp",
        "width": 1600,
        "height": 556,
        "group": null
      },
      {
        "id": "2",
        "thumb": "/portfolio/banners/thumb/2.webp",
        "view": "/portfolio/banners/view/2.webp",
        "width": 1600,
        "height": 556,
        "group": null
      }
    ],
    "documents": []
  },
  {
    "slug": "dating-profiles",
    "title": "Dating Profiles",
    "blurb": "Portrait retouching and clean-up, shown as sample frames alongside the finished versions.",
    "kind": "work",
    "count": 6,
    "cover": {
      "id": "final1",
      "thumb": "/portfolio/dating-profiles/thumb/final1.webp",
      "view": "/portfolio/dating-profiles/view/final1.webp",
      "width": 1024,
      "height": 1024,
      "group": null
    },
    "images": [
      {
        "id": "final1",
        "thumb": "/portfolio/dating-profiles/thumb/final1.webp",
        "view": "/portfolio/dating-profiles/view/final1.webp",
        "width": 1024,
        "height": 1024,
        "group": null
      },
      {
        "id": "final2",
        "thumb": "/portfolio/dating-profiles/thumb/final2.webp",
        "view": "/portfolio/dating-profiles/view/final2.webp",
        "width": 1024,
        "height": 1024,
        "group": null
      },
      {
        "id": "final3",
        "thumb": "/portfolio/dating-profiles/thumb/final3.webp",
        "view": "/portfolio/dating-profiles/view/final3.webp",
        "width": 1024,
        "height": 1024,
        "group": null
      },
      {
        "id": "sample-1",
        "thumb": "/portfolio/dating-profiles/thumb/sample-1.webp",
        "view": "/portfolio/dating-profiles/view/sample-1.webp",
        "width": 1440,
        "height": 1799,
        "group": null
      },
      {
        "id": "sample-2",
        "thumb": "/portfolio/dating-profiles/thumb/sample-2.webp",
        "view": "/portfolio/dating-profiles/view/sample-2.webp",
        "width": 1600,
        "height": 2133,
        "group": null
      },
      {
        "id": "sample-3",
        "thumb": "/portfolio/dating-profiles/thumb/sample-3.webp",
        "view": "/portfolio/dating-profiles/view/sample-3.webp",
        "width": 1600,
        "height": 2133,
        "group": null
      }
    ],
    "documents": []
  },
  {
    "slug": "signages",
    "title": "Signages",
    "blurb": "Signage and large-format display concepts, including AI-generated backdrops.",
    "kind": "work",
    "count": 6,
    "cover": {
      "id": "15",
      "thumb": "/portfolio/signages/thumb/15.webp",
      "view": "/portfolio/signages/view/15.webp",
      "width": 1024,
      "height": 1024,
      "group": null
    },
    "images": [
      {
        "id": "15",
        "thumb": "/portfolio/signages/thumb/15.webp",
        "view": "/portfolio/signages/view/15.webp",
        "width": 1024,
        "height": 1024,
        "group": null
      },
      {
        "id": "18",
        "thumb": "/portfolio/signages/thumb/18.webp",
        "view": "/portfolio/signages/view/18.webp",
        "width": 1024,
        "height": 1024,
        "group": null
      },
      {
        "id": "21",
        "thumb": "/portfolio/signages/thumb/21.webp",
        "view": "/portfolio/signages/view/21.webp",
        "width": 1024,
        "height": 1024,
        "group": null
      },
      {
        "id": "magnific_generate-a-background-us_rlflwtrxtc",
        "thumb": "/portfolio/signages/thumb/magnific_generate-a-background-us_rlflwtrxtc.webp",
        "view": "/portfolio/signages/view/magnific_generate-a-background-us_rlflwtrxtc.webp",
        "width": 1024,
        "height": 1024,
        "group": null
      },
      {
        "id": "magnific_make-the-uploaded-image-t_xgomf7mjfw",
        "thumb": "/portfolio/signages/thumb/magnific_make-the-uploaded-image-t_xgomf7mjfw.webp",
        "view": "/portfolio/signages/view/magnific_make-the-uploaded-image-t_xgomf7mjfw.webp",
        "width": 1376,
        "height": 768,
        "group": null
      },
      {
        "id": "magnific_ubv3byfqld",
        "thumb": "/portfolio/signages/thumb/magnific_ubv3byfqld.webp",
        "view": "/portfolio/signages/view/magnific_ubv3byfqld.webp",
        "width": 1600,
        "height": 1600,
        "group": null
      }
    ],
    "documents": []
  },
  {
    "slug": "my-sample-process",
    "title": "My Sample Process",
    "blurb": "How a brief moves from reference and direction through to the delivered frame.",
    "kind": "process",
    "count": 3,
    "cover": {
      "id": "1",
      "thumb": "/portfolio/my-sample-process/thumb/1.webp",
      "view": "/portfolio/my-sample-process/view/1.webp",
      "width": 1200,
      "height": 630,
      "group": null
    },
    "images": [
      {
        "id": "1",
        "thumb": "/portfolio/my-sample-process/thumb/1.webp",
        "view": "/portfolio/my-sample-process/view/1.webp",
        "width": 1200,
        "height": 630,
        "group": null
      },
      {
        "id": "2",
        "thumb": "/portfolio/my-sample-process/thumb/2.webp",
        "view": "/portfolio/my-sample-process/view/2.webp",
        "width": 1200,
        "height": 630,
        "group": null
      },
      {
        "id": "3",
        "thumb": "/portfolio/my-sample-process/thumb/3.webp",
        "view": "/portfolio/my-sample-process/view/3.webp",
        "width": 1200,
        "height": 630,
        "group": null
      }
    ],
    "documents": []
  },
  {
    "slug": "certifications",
    "title": "Certifications",
    "blurb": "Completed programmes and credentials, viewable as the original certificates.",
    "kind": "credentials",
    "count": 5,
    "cover": null,
    "images": [],
    "documents": [
      {
        "id": "agile-project-management",
        "title": "Agile Project Management",
        "file": "/portfolio/certifications/doc/agile-project-management.pdf"
      },
      {
        "id": "data-analytics",
        "title": "Data Analytics",
        "file": "/portfolio/certifications/doc/data-analytics.pdf"
      },
      {
        "id": "design-prompts-for-everyday-tasks",
        "title": "Design Prompts For Everyday Tasks",
        "file": "/portfolio/certifications/doc/design-prompts-for-everyday-tasks.pdf"
      },
      {
        "id": "foundations-of-cybersecurity",
        "title": "Foundations Of Cybersecurity",
        "file": "/portfolio/certifications/doc/foundations-of-cybersecurity.pdf"
      },
      {
        "id": "prompt-engineering",
        "title": "Prompt Engineering",
        "file": "/portfolio/certifications/doc/prompt-engineering.pdf"
      }
    ]
  }
];

export const workCategories = portfolioCategories.filter((c) => c.kind === 'work');
export const processCategory = portfolioCategories.find((c) => c.kind === 'process') ?? null;
export const credentialsCategory = portfolioCategories.find((c) => c.kind === 'credentials') ?? null;
