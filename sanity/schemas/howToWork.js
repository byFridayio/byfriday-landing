export default {
  name: 'howToWork',
  title: 'How To Work With Us',
  type: 'document',
  fields: [
    { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'body', title: 'Body', type: 'string' },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Step Number', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'string' },
          { name: 'cta', title: 'CTA Text (optional)', type: 'string' },
          { name: 'accent', title: 'Accent/Dark Style', type: 'boolean' },
        ],
      }],
    },
  ],
};
