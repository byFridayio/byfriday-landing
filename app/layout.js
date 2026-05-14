import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'byFriday — Smart lead generation for services & high-ticket products',
  description:
    "AI-powered lead generation funnels. Paid ads, landing pages, sales automations & AI employees. You don't pay for new leads for 90 days.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
