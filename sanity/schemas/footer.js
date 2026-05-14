export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    { name: 'tagline', title: 'Tagline', type: 'string' },
    {
      name: 'linkColumns',
      title: 'Link Columns',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Column Title', type: 'string' },
          {
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'URL', type: 'string' },
              ],
            }],
          },
        ],
      }],
    },
    { name: 'bottomLeft', title: 'Bottom Left Text', type: 'string' },
    { name: 'bottomRight', title: 'Bottom Right Text', type: 'string' },
  ],
};
