import './globals.css';
import Script from 'next/script';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'byFriday — Smart lead generation for services & high-ticket products',
  description:
    "AI-powered lead generation funnels. Paid ads, landing pages, sales automations & AI employees. You don't pay for new leads for 90 days.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
