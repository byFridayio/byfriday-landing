import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const isSanityConfigured = projectId && /^[a-z0-9-]+$/.test(projectId);

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source) {
  if (!source || !builder) return null;
  return builder.image(source);
}
