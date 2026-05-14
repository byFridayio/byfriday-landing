import { getLandingPageData } from '../lib/queries';
import LandingPage from '../components/LandingPage';

// Revalidate every 60s (ISR) — also revalidated on-demand via webhook
export const revalidate = 60;

export default async function Home() {
  let data = null;
  try {
    data = await getLandingPageData();
  } catch (e) {
    // Sanity not configured yet — render with defaults
  }
  return <LandingPage data={data} />;
}
