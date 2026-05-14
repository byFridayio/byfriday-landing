#!/usr/bin/env node
/**
 * Seed Sanity with the default content from the landing page.
 *
 * Usage:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxx NEXT_PUBLIC_SANITY_DATASET=production \
 *   SANITY_API_TOKEN=skXXX node scripts/seed.mjs
 *
 * Requires a Sanity write-token (Settings → API → Tokens → Add token → Editor).
 */
import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const docs = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    instagramUrl: 'https://instagram.com/byfriday',
    youtubeUrl: 'https://youtube.com/@byfriday',
    whatsappUrl: 'https://wa.me/442045771234',
    ghlWebhookUrl: 'https://hooks.gohighlevel.com/webhook/YOUR_WEBHOOK_ID',
    aiPhoneNumber: '+44 20 4577 1234',
    copyrightText: '© 2026 byFriday Ltd.',
    floatingCtaHeadline: "You don't pay for your first",
    floatingCtaAccent: '90 days',
    floatingCtaButton: 'Pricing',
  },
  {
    _id: 'hero',
    _type: 'hero',
    headline: 'Lead generation ad funnels powered by artificial intelligence',
    subheading:
      'Funnels powered by paid ads, landing pages, sales automations, reputation & AI employees. We build the system that turns scrolling strangers into qualified enquiries — predictably, repeatedly, without you chasing it.',
    guaranteeEyebrow: 'Our 90-day guarantee',
    guaranteeText: "You don't pay for new qualified leads for",
    guaranteeBold: '3 months',
    livePillText: 'Live · booking now',
    videoLabel: 'Watch · 90 seconds',
    heroVideoUrl: '/assets/hero-video.mp4',
  },
  {
    _id: 'socialProof',
    _type: 'socialProof',
    caseStudyStatNumber: 9,
    caseStudyStatSuffix: ' figures',
    caseStudyStatLabel: 'in sales attributed to byFriday',
    caseStudyQuote:
      '\u201CbyFriday built us a video consultation funnel that became the single biggest sales channel in our history. Nine figures in attributed revenue and counting.\u201D',
    caseStudyAuthor: 'Stephen',
    caseStudyRole: 'CEO, Quooker UK & Ireland',
    caseStudyVideoUrl:
      'https://player.vimeo.com/video/1148638773?background=1&autoplay=1&loop=1&muted=1&autopause=0&controls=0&title=0&byline=0&portrait=0',
    joesLabel: "Joe's Doors",
    joesStatNumber: 1600,
    joesStatLabel: 'qualified leads / month',
    joesAvgTicket: '£10,000+',
    joesChannel: 'Paid + form qualified',
    testimonialQuote:
      '\u201CThe team at byFriday rebuilt our entire lead funnel and it\u2019s already paying for itself in the first month. We doubled the calls into our sales line without spending a penny more on ads.\u201D',
    testimonialAuthor: 'Andrew Name',
    testimonialRole: "Managing Director · Joe's Doors",
    testimonialStars: 5,
  },
  {
    _id: 'funnelExplainer',
    _type: 'funnelExplainer',
    eyebrow: 'The funnel, explained',
    headline: 'What is a\nlead generation funnel?',
    lede: 'A lead generation funnel is the system that turns a stranger scrolling on their phone into a qualified enquiry sitting in your calendar — predictably, repeatedly, and without you chasing it.',
    bodyParagraph:
      "It's not a landing page. It's not an ad. It's not a piece of software. Those are components. The funnel is the whole machine: the ad that stops the scroll, the page that earns the click, the offer that earns the lead, and the follow-up that turns the lead into a booked call before your competitor gets to them.",
    boldParagraph:
      "Most businesses don't have a funnel. They have a phone number, a website, and hope.",
    steps: [
      { _key: 'step1', number: '01', title: 'The Ad', description: 'Stops the scroll. Creative is the targeting now.' },
      { _key: 'step2', number: '02', title: 'The Page', description: 'Earns the click. Fast, focused, conversion-tuned.' },
      { _key: 'step3', number: '03', title: 'The Offer', description: 'Earns the lead. Multi-step form qualifies them.' },
      { _key: 'step4', number: '04', title: 'The Follow-up', description: 'Books the call. Before your competitor gets to them.' },
    ],
  },
  {
    _id: 'whyFail',
    _type: 'whyFail',
    eyebrow: 'Why most funnels fail',
    headlineLine1: "It's almost never the ad.",
    headlineLine2: "It's almost never the page.",
    bodyLeft:
      "It's that the four pieces aren't built to work together. The ad promises one thing, the page sells another, the form filters out the buyers, and the follow-up is a single auto-reply that arrives an hour late. Each piece looks fine in isolation. The system loses money.",
    bodyLeftBold: 'The system loses money.',
    bodyRight:
      "A funnel built properly compounds. Every winning ad makes the page sharper. Every conversion teaches the form what to ask. Every closed deal feeds the follow-up sequence. After six months, your cost per booked job is half what it was on day one — and your competitors are still buying clicks.",
  },
  {
    _id: 'paidAds',
    _type: 'paidAds',
    eyebrow: 'Paid ads',
    headline: 'We advertise\neverywhere your buyers are.',
    searchEyebrow: 'Search advertising',
    searchAdBrand: 'byFriday',
    searchAdUrl: 'https://www.byfriday.com › pricing',
    searchAdHeadline: 'byFriday | AI Lead Generation Funnels for Services & High-Ticket',
    searchAdDescription:
      "Get qualified leads in your inbox while you sleep. Paid ads, landing pages & AI follow-up. You don't pay for new leads in your first 90 days.",
    searchBody1:
      "When someone searches an intentful term for your services, it's our job to put you in position one — with stand-out creative and tailored landing pages for every target keyword.",
    searchBody2:
      'Instant sales automation fires the moment a lead submits. You scale your business on the same ad spend you already have.',
    searchBullets: [
      'Per-keyword landing pages, not one site for all of them',
      'Instant follow-up automation under 60 seconds',
      'Same ad spend, multiples of the conversion rate',
    ],
    socialEyebrow: 'Social advertising',
    socialHeadline: 'Cold strangers to customers — in the andromeda era.',
    socialBody:
      "We shoot video and produce stills across concepts — the overlap of hook, offer and ICP. It's the only way to scale in 2026 and beyond: Meta now targets better than any human can. The creative is the targeting.",
  },
  {
    _id: 'landingPages',
    _type: 'landingPages',
    eyebrow: 'Smart landing pages',
    headline: 'Double your conversion rate.\nDouble your year.',
    body1: 'If you increase your conversion rate from 1% to 2%, you just doubled your revenue for the year. Tailor a page to each specific ad and you see that double again. Add a fast load and a multi-step qualifying form — another jump.',
    body2: "It's that simple.",
    body3: 'Beautifully designed. Built around conversion. Page-speed scored. Mobile-first. Connected to the rest of the system from day one.',
    conversionBars: [
      { _key: 'bar1', label: 'Generic site', percentage: 1.0 },
      { _key: 'bar2', label: 'Tailored page', percentage: 2.0 },
      { _key: 'bar3', label: '+ multi-step form', percentage: 3.4 },
      { _key: 'bar4', label: '+ instant follow-up', percentage: 5.0 },
    ],
    cardFooter: '5× more revenue, same spend.',
  },
  {
    _id: 'automation',
    _type: 'automation',
    eyebrow: 'Sales & reputation automation',
    headline: 'Every signal answered.\nEvery reply five-star.',
    body: 'Five connected automations that turn missed messages, sleepless follow-up and review chasing into systems that run while you sleep.',
    reviewsCaption: 'How to automate 5★ reviews — 48s',
    callCentreTitle: 'AI Call Centre',
    callCentreDescription:
      'A voice agent that answers, qualifies and books — in your brand voice, in your accent, 24/7.',
    callCentrePhone: '+44 20 4577 1234',
    callCentreHint: 'Call and pretend to be a customer — see how it handles you.',
    missedCallStat: 69,
    missedCallDescription: 'of businesses gain more customers with missed call text back.',
    missedCallMessages: [
      { _key: 'msg1', sender: 'them', text: "Hey! Sorry we missed your call. We'll have someone call you back shortly. In the meantime, if you want to know about our services and pricing — or schedule a call — I can do that here." },
      { _key: 'msg2', sender: 'me', text: "Hi. Yes please — I'd like to know about your pricing." },
      { _key: 'msg3', sender: 'them', text: "Sure thing. I've sent you a video on WhatsApp about our pricing model, plus a link to schedule a call with the team." },
      { _key: 'msg4', sender: 'me', text: 'Amazing! Speak soon.' },
    ],
    smsEmailTitle: 'SMS & Email Automation',
    smsEmailDescription:
      'Multi-channel follow-up sequences that adapt to opens, clicks and replies. No leads left cold.',
    aiChatTitle: 'AI Chat',
    aiChatDescription:
      "Friday answers every web visitor and DM. Books the meeting when the lead is hot, hands off when it's not.",
  },
  {
    _id: 'platform',
    _type: 'platform',
    eyebrow: 'The platform',
    headline: 'One inbox.\nEvery channel.',
    body: 'Manage every submission, every Instagram and Facebook DM, every WhatsApp — from one place. Friday handles the qualifying. You only step in when the lead is hot.',
    features: [
      'Web forms, SMS, email, Insta, FB Messenger, WhatsApp',
      'AI qualifies, scores and tags every conversation',
      'Hand-off rules — by source, value, response time',
      'Mobile + desktop, with team assignments and SLAs',
    ],
    inboxMessages: [
      { _key: 'inbox1', name: 'Alex Romero', channel: 'WhatsApp', tag: 'HOT', message: 'Hey — interested in the consultation funnel piece. Free Thursday?', time: 'just now' },
      { _key: 'inbox2', name: "Quote — Joe's Doors", channel: 'Web form', tag: '', message: 'Front door fitting in BN1 — budget £8–12k', time: '6m' },
      { _key: 'inbox3', name: 'Maya Patel', channel: 'Insta DM', tag: '', message: 'Saw the andromeda playbook — got time to chat next week?', time: '18m' },
    ],
  },
  {
    _id: 'howToWork',
    _type: 'howToWork',
    eyebrow: 'The process',
    headline: 'How to work with us',
    body: 'Six steps from \u201Csend me your pricing\u201D to qualified leads in your calendar. No surprises, no padding.',
    steps: [
      { _key: 'htw1', number: '01', title: 'See our pricing', description: 'See our pricing and decide if you would like to schedule a call.', cta: 'Request pricing', accent: false },
      { _key: 'htw2', number: '02', title: 'Meet the team', description: 'Meet the team and ask any questions you have.', accent: false },
      { _key: 'htw3', number: '03', title: 'Shoot the ads', description: 'We bring our video team to shoot your first ads and VSLs.', accent: false },
      { _key: 'htw4', number: '04', title: 'Build the system', description: 'We build the AI automation systems, landing pages and ad accounts.', accent: false },
      { _key: 'htw5', number: '05', title: 'Launch campaigns', description: 'We then launch your campaigns to drive qualified leads.', accent: false },
      { _key: 'htw6', number: '06', title: '90-day guarantee', description: "You don't pay for your qualified leads for the next 90 days.", accent: true },
    ],
  },
  {
    _id: 'pricingForm',
    _type: 'pricingForm',
    eyebrow: 'Pricing',
    headline: "Send me byFriday's pricing",
    subheading: "5 quick questions. We'll have tailored pricing to you within minutes.",
    stepLabels: ['Focus', 'Gap', 'Team', 'Details', 'Contact'],
    choiceSteps: [
      {
        _key: 'cs1',
        question: 'What describes what you do best?',
        hint: "Pick the one that lands closest. We'll tailor pricing to it.",
        dataKey: 'role',
        options: ['Sell services', 'Sell high-ticket products', 'A bit of both'],
      },
      {
        _key: 'cs2',
        question: "Where would you say you're weakest?",
        hint: "Honest answer beats the polished one — it's what we'll fix first.",
        dataKey: 'weakness',
        options: ['Automation & AI systems', 'Getting results from paid ads', 'High-converting funnels', 'All of the above'],
      },
      {
        _key: 'cs3',
        question: 'Ballpark, how many people work at your company?',
        hint: "We price by complexity, not seats. This sets expectations.",
        dataKey: 'size',
        options: ['1–10 people', '11–30', '31–100', '100–250', '250+'],
      },
    ],
    thankYouHeadline: 'Got it,',
    thankYouBody: 'Friday is putting together pricing for your team. Check your email within the hour for what we\u2019d recommend — plus a link to book a call where we\u2019ll show you our funnel live.',
    nextSteps: [
      { _key: 'ns1', number: '01', title: 'Pricing email lands', body: "In your inbox within the hour. With a 2-min Loom walking through what we'd build for you.", accent: false },
      { _key: 'ns2', number: '02', title: 'Book a sales call', body: "Link inside the email — pick a slot Tuesday or Thursday. We'll prep around your funnel.", accent: false },
      { _key: 'ns3', number: '03', title: 'See our funnel live', body: "On the call we'll show you our own funnel and its real numbers. Not slide-deck case studies.", accent: false },
      { _key: 'ns4', number: '04', title: 'Brief on Monday, live by Friday', body: "If it's a fit, we start building. (Yes, that's where the name comes from.)", accent: true },
    ],
  },
  {
    _id: 'footer',
    _type: 'footer',
    tagline: 'AI-powered lead generation funnels for services & high-ticket products.',
    linkColumns: [
      {
        _key: 'col1',
        title: 'Funnel',
        links: [
          { _key: 'l1', label: 'How it works', href: '#funnel' },
          { _key: 'l2', label: 'Why funnels fail', href: '#' },
          { _key: 'l3', label: 'Case studies', href: '#' },
        ],
      },
      {
        _key: 'col2',
        title: 'Capabilities',
        links: [
          { _key: 'l4', label: 'Paid ads', href: '#paid-ads' },
          { _key: 'l5', label: 'Landing pages', href: '#' },
          { _key: 'l6', label: 'Automation', href: '#automation' },
          { _key: 'l7', label: 'Platform', href: '#platform' },
        ],
      },
      {
        _key: 'col3',
        title: 'Company',
        links: [
          { _key: 'l8', label: 'About', href: '#' },
          { _key: 'l9', label: 'Careers', href: '#' },
          { _key: 'l10', label: 'Blog', href: '#' },
          { _key: 'l11', label: 'Contact', href: '#' },
        ],
      },
    ],
    bottomLeft: '© 2026 byFriday Ltd.',
    bottomRight: 'Made on a Tuesday. Shipped on a Friday.',
  },
];

async function seed() {
  console.log(`Seeding ${docs.length} documents to ${projectId}/${dataset}…`);
  const tx = client.transaction();
  for (const doc of docs) {
    tx.createOrReplace(doc);
  }
  await tx.commit();
  console.log('Done! All documents seeded.');
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
