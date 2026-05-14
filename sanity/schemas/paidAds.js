export default {
  name: 'paidAds',
  title: 'Paid Ads',
  type: 'document',
  fields: [
    { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
    { name: 'headline', title: 'Headline', type: 'string' },
    {
      name: 'platformLogos',
      title: 'Ad Platform Logos',
      type: 'array',
      of: [{ type: 'image', fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }] }],
    },
    // Search card
    { name: 'searchEyebrow', title: 'Search Card Eyebrow', type: 'string' },
    { name: 'searchAdBrand', title: 'Search Ad Brand', type: 'string' },
    { name: 'searchAdUrl', title: 'Search Ad URL', type: 'string' },
    { name: 'searchAdHeadline', title: 'Search Ad Headline', type: 'string' },
    { name: 'searchAdDescription', title: 'Search Ad Description', type: 'text', rows: 2 },
    { name: 'searchBody1', title: 'Search Body Paragraph 1', type: 'text', rows: 3 },
    { name: 'searchBody2', title: 'Search Body Paragraph 2', type: 'text', rows: 2 },
    {
      name: 'searchBullets',
      title: 'Search Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    },
    // Social card
    { name: 'socialEyebrow', title: 'Social Card Eyebrow', type: 'string' },
    { name: 'socialHeadline', title: 'Social Card Headline', type: 'string' },
    { name: 'socialBody', title: 'Social Card Body', type: 'text', rows: 3 },
  ],
};
