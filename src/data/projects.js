import InteractivePricingComponent from '../projects/InteractivePricingComponent'

const withBase = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const projects = [
  {
    id: 'winter-sale-banner',
    title: 'Winter Sale Banner',
    subtitle: 'Cinesamples - Email Marketing',
    category: 'email',
    cardSize: 'wide',
    thumbnail: withBase('assets/thumbnails/winter-sale.svg'),
    content: {
      type: 'iframe',
      src: withBase('projects/winter-sale/index.html'),
    },
    description:
      'A responsive email banner concept built with lightweight HTML/CSS blocks that mirror email client constraints. The preview is loaded in an iframe so breakpoint checks match real rendering behavior.',
    tags: ['email', 'html', 'marketing'],
    supportsResponsivePreview: true,
  },
  {
    id: 'interactive-pricing-component',
    title: 'Interactive Pricing Component',
    subtitle: 'React UI Component',
    category: 'component',
    cardSize: 'standard',
    thumbnail: withBase('assets/thumbnails/pricing-component.svg'),
    content: {
      type: 'component',
      component: InteractivePricingComponent,
    },
    description:
      'A reusable pricing module for landing pages with monthly/yearly toggles and seat count adjustments. Useful for A/B testing value messaging in product and campaign pages.',
    tags: ['react', 'component', 'ui'],
    supportsResponsivePreview: true,
  },
  {
    id: 'sample-library-manager',
    title: 'Sample Library Manager',
    subtitle: 'Standalone Tool',
    category: 'tool',
    cardSize: 'large',
    thumbnail: withBase('assets/thumbnails/sample-manager.svg'),
    content: {
      type: 'external-link',
      url: 'https://example.com',
    },
    description:
      'A utility concept for organizing sample libraries by source, key, and mood tags. This card demonstrates external-link handling with a launch action instead of embedded interactive content.',
    tags: ['tool', 'productivity', 'workflow'],
    supportsResponsivePreview: false,
  },
  {
    id: 'landing-page-hero',
    title: 'Landing Page Hero Section',
    subtitle: 'Web Campaign Surface',
    category: 'web',
    cardSize: 'tall',
    thumbnail: withBase('assets/thumbnails/landing-hero.svg'),
    content: {
      type: 'iframe',
      src: withBase('projects/landing-hero/index.html'),
    },
    description:
      'A responsive hero section prototype with direct CTA hierarchy and tight spacing tuned for music product launches. The iframe preview makes it easy to validate breakpoints before implementation.',
    tags: ['web', 'responsive', 'campaign'],
    supportsResponsivePreview: true,
  },
]

export default projects
