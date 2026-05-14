export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'logoWordmark', title: 'Logo (Wordmark)', type: 'image' },
    { name: 'logoFooter', title: 'Logo (Footer)', type: 'image' },
    { name: 'logoSecondary', title: 'Logo (Secondary)', type: 'image' },
    { name: 'instagramUrl', title: 'Instagram URL', type: 'url' },
    { name: 'youtubeUrl', title: 'YouTube URL', type: 'url' },
    { name: 'whatsappUrl', title: 'WhatsApp URL', type: 'url' },
    { name: 'ghlWebhookUrl', title: 'Go High Level Webhook URL', type: 'url' },
    { name: 'aiPhoneNumber', title: 'AI Call Centre Phone Number', type: 'string' },
    { name: 'copyrightText', title: 'Copyright Text', type: 'string' },
    { name: 'floatingCtaHeadline', title: 'Floating CTA Headline', type: 'string' },
    { name: 'floatingCtaAccent', title: 'Floating CTA Accent Text', type: 'string' },
    { name: 'floatingCtaButton', title: 'Floating CTA Button Text', type: 'string' },
  ],
};
