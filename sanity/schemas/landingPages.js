export default {
  name: 'landingPages',
  title: 'Landing Pages',
  type: 'document',
  fields: [
    { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'body1', title: 'Body Paragraph 1', type: 'text', rows: 3 },
    { name: 'body2', title: 'Body Paragraph 2', type: 'string' },
    { name: 'body3', title: 'Body Paragraph 3', type: 'text', rows: 2 },
    {
      name: 'conversionBars',
      title: 'Conversion Rate Bars',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'percentage', title: 'Percentage', type: 'number' },
        ],
      }],
    },
    { name: 'cardFooter', title: 'Card Footer Text', type: 'string' },
  ],
};
