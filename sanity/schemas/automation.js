export default {
  name: 'automation',
  title: 'Automation',
  type: 'document',
  fields: [
    { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
    { name: 'headline', title: 'Headline', type: 'string' },
    { name: 'body', title: 'Body', type: 'text', rows: 3 },
    // Reviews tile
    { name: 'reviewsCaption', title: 'Reviews Tile Caption', type: 'string' },
    { name: 'reviewsImage', title: 'Reviews Tile Image', type: 'image' },
    // AI Call Centre
    { name: 'callCentreTitle', title: 'Call Centre Title', type: 'string' },
    { name: 'callCentreDescription', title: 'Call Centre Description', type: 'text', rows: 2 },
    { name: 'callCentrePhone', title: 'Call Centre Phone', type: 'string' },
    { name: 'callCentreHint', title: 'Call Centre Hint', type: 'string' },
    // Missed Call
    { name: 'missedCallStat', title: 'Missed Call Stat Number', type: 'number' },
    { name: 'missedCallDescription', title: 'Missed Call Description', type: 'string' },
    {
      name: 'missedCallMessages',
      title: 'Chat Messages',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'sender', title: 'Sender (business/customer)', type: 'string' },
          { name: 'text', title: 'Message Text', type: 'text', rows: 2 },
        ],
      }],
    },
    // SMS & Email
    { name: 'smsEmailTitle', title: 'SMS/Email Title', type: 'string' },
    { name: 'smsEmailDescription', title: 'SMS/Email Description', type: 'string' },
    // AI Chat
    { name: 'aiChatTitle', title: 'AI Chat Title', type: 'string' },
    { name: 'aiChatDescription', title: 'AI Chat Description', type: 'string' },
  ],
};
