const siteUrl = 'https://aussieai.shop';
const businessName = 'Aussie AI';
const description = 'Melbourne-based AI agents and automation for Australian small businesses.';

export const seo = {
  siteUrl,
  businessName,
  description,
  ogImage: `${siteUrl}/og-image.png`,
};

export function canonicalPath(path: string) {
  if (path === '/') return siteUrl;
  return `${siteUrl}${path}`;
}

export function breadcrumbSchema(items: Array<[string, string]>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: canonicalPath(path),
    })),
  };
}

export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: businessName,
    url: siteUrl,
    image: seo.ogImage,
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      addressCountry: 'AU',
    },
    areaServed: [
      { '@type': 'City', name: 'Melbourne' },
      { '@type': 'Country', name: 'Australia' },
    ],
    knowsAbout: [
      'AI agents',
      'workflow automation',
      'AI receptionist',
      'missed call text back',
      'CRM automation',
      'small business automation',
    ],
    makesOffer: {
      '@type': 'Offer',
      name: 'Free AI automation audit',
      url: canonicalPath('/contact'),
      availability: 'https://schema.org/InStock',
      areaServed: 'AU',
      description: 'A practical workflow audit for Australian small businesses considering AI agents and automation.',
    },
  };
}

export function faqSchema(faqs: string[][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  audience?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    provider: {
      '@type': 'ProfessionalService',
      name: businessName,
      url: siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    audience: input.audience ? {
      '@type': 'BusinessAudience',
      audienceType: input.audience,
    } : undefined,
    url: canonicalPath(input.path),
    offers: {
      '@type': 'Offer',
      url: canonicalPath('/contact'),
      availability: 'https://schema.org/InStock',
      description: 'Book a free AI audit before choosing a build scope.',
    },
  };
}
