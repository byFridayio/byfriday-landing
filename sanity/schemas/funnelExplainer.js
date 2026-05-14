export default {
  name: 'funnelExplainer',
  title: 'Funnel Explainer',
  type: 'document',
  fields: [
    { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
    { name: 'headline', title: 'Headline', type: 'text', rows: 2 },
    { name: 'lede', title: 'Lede Paragraph', type: 'text', rows: 3 },
    { name: 'bodyParagraph', title: 'Body Paragraph', type: 'text', rows: 4 },
    { name: 'boldParagraph', title: 'Bold Paragraph', type: 'text', rows: 2 },
    {
      name: 'steps',
      title: 'Funnel Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Step Number', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'string' },
          { name: 'backgroundImage', title: 'Background Image', type: 'image' },
        ],
      }],
    },
  ],
};
