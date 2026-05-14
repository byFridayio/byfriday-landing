import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  studioHost: 'byfriday',
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i497990l',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
});
