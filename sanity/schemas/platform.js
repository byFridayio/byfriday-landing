export default {
  name: 'platform',
  title: 'Platform',
  type: 'document',
  fields: [
    { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'body', title: 'Body', type: 'text', rows: 3 },
    {
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'inboxMessages',
      title: 'Inbox Messages',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'channel', title: 'Channel', type: 'string' },
          { name: 'tag', title: 'Tag (e.g. HOT)', type: 'string' },
          { name: 'message', title: 'Message', type: 'string' },
          { name: 'time', title: 'Time', type: 'string' },
        ],
      }],
    },
  ],
};
