export default {
  name: 'pricingForm',
  title: 'Pricing Form',
  type: 'document',
  fields: [
    { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'subheading', title: 'Subheading', type: 'string' },
    {
      name: 'stepLabels',
      title: 'Step Labels',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'choiceSteps',
      title: 'Choice Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'hint', title: 'Hint', type: 'string' },
          { name: 'dataKey', title: 'Data Key', type: 'string' },
          {
            name: 'options',
            title: 'Options',
            type: 'array',
            of: [{ type: 'string' }],
          },
        ],
      }],
    },
    // Thank you
    { name: 'thankYouHeadline', title: 'Thank You Headline Template', type: 'string' },
    { name: 'thankYouBody', title: 'Thank You Body Template', type: 'text', rows: 3 },
    {
      name: 'nextSteps',
      title: 'Next Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Number', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'body', title: 'Body', type: 'string' },
          { name: 'accent', title: 'Accent Style', type: 'boolean' },
        ],
      }],
    },
  ],
};
