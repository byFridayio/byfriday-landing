export default {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    { name: 'headline', title: 'Headline', type: 'text', rows: 2 },
    { name: 'subheading', title: 'Subheading', type: 'text', rows: 4 },
    { name: 'guaranteeEyebrow', title: 'Guarantee Eyebrow', type: 'string' },
    { name: 'guaranteeText', title: 'Guarantee Text', type: 'string' },
    { name: 'guaranteeBold', title: 'Guarantee Bold Part', type: 'string' },
    { name: 'livePillText', title: 'Live Pill Text', type: 'string' },
    { name: 'videoLabel', title: 'Video Label', type: 'string' },
    { name: 'heroImage', title: 'Hero Image / Video Poster', type: 'image' },
    { name: 'heroVideoUrl', title: 'Hero Video URL', type: 'string' },
  ],
};
