import { getPermalink } from './utils/permalinks';

export const GITHUB = 'https://github.com/agentmeter-dev/agentmeter';
export const SPONSOR = 'https://github.com/sponsors/rhuss';
export const PRIVACY_README = `${GITHUB}#security-and-privacy`;

export const headerData = {
  links: [
    { text: 'Features', href: getPermalink('/#features') },
    { text: 'Privacy', href: getPermalink('/#privacy') },
    { text: 'Compare', href: getPermalink('/#compare') },
  ],
  actions: [
    { text: 'GitHub', href: GITHUB, target: '_blank', icon: 'tabler:brand-github' },
    { text: 'Sponsor', href: SPONSOR, target: '_blank', icon: 'tabler:heart' },
  ],
};

export const footerData = {
  links: [
    {
      title: 'AgentMeter',
      links: [
        { text: 'Features', href: getPermalink('/#features') },
        { text: 'Privacy', href: getPermalink('/#privacy') },
        { text: 'Compare', href: getPermalink('/#compare') },
      ],
    },
    {
      title: 'Project',
      links: [
        { text: 'GitHub', href: GITHUB },
        { text: 'Releases', href: `${GITHUB}/releases` },
        { text: 'Issues', href: `${GITHUB}/issues` },
        { text: 'Sponsor', href: SPONSOR },
      ],
    },
  ],
  secondaryLinks: [{ text: 'License (Apache 2.0)', href: `${GITHUB}/blob/main/LICENSE` }],
  socialLinks: [{ ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: GITHUB }],
  footNote: `
    Usage at a glance. Nothing more.
  `,
};
