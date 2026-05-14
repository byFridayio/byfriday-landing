export default {
  name: 'whyFail',
  title: 'Why Funnels Fail',
  type: 'document',
  fields: [
    { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
    { name: 'headlineLine1', title: 'Headline Line 1', type: 'string' },
    { name: 'headlineLine2', title: 'Headline Line 2 (muted)', type: 'string' },
    { name: 'bodyLeft', title: 'Body Left Column', type: 'text', rows: 5 },
    { name: 'bodyLeftBold', title: 'Bold sentence in left column', type: 'string' },
    { name: 'bodyRight', title: 'Body Right Column', type: 'text', rows: 5 },
  ],
};
