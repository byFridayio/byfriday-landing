import { client } from './sanity.js';

const LANDING_PAGE_QUERY = `{
  "settings": *[_type == "siteSettings"][0],
  "hero": *[_type == "hero"][0],
  "socialProof": *[_type == "socialProof"][0],
  "funnelExplainer": *[_type == "funnelExplainer"][0],
  "whyFail": *[_type == "whyFail"][0],
  "paidAds": *[_type == "paidAds"][0],
  "landingPages": *[_type == "landingPages"][0],
  "automation": *[_type == "automation"][0],
  "platform": *[_type == "platform"][0],
  "howToWork": *[_type == "howToWork"][0],
  "pricingForm": *[_type == "pricingForm"][0],
  "footer": *[_type == "footer"][0]
}`;

export async function getLandingPageData() {
  if (!client) return null;
  return client.fetch(LANDING_PAGE_QUERY);
}
