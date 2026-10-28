// Feature cards and the small things (brainstorm 18, page structure 4 and 5).
// Bodies may hold inline <code> for the bar's symbols; everything else is text.

export interface Feature {
  title: string;
  body: string;
  stem: string;
  alt: string;
}

export const featureRows: { label: string; features: Feature[] }[] = [
  {
    label: 'Usage & limits',
    features: [
      {
        title: 'Usage at a glance',
        body: 'Every plan limit with its reset time, live from the provider, and an orange pace note when you are running ahead. Expand an account to see tokens by model, project and harness.',
        stem: 'glance',
        alt: 'The dropdown with plan limits and their reset times, a pace note, and one account’s details expanded',
      },
      {
        title: 'Budgets you define',
        body: 'Pay-per-token spend on Vertex, the OpenAI API or a company gateway, against your own weekly or monthly budget. One budget can span several accounts and harnesses, for a unified view of what you are spending.',
        stem: 'budget',
        alt: 'A company budget with 430 of 500 dollars spent this month and an orange pace note',
      },
    ],
  },
  {
    label: 'Accounts',
    features: [
      {
        title: 'Same provider, more than once',
        body: 'Run two Claude Max subscriptions next to each other by pointing each one at its own directory. Both show on the same screen.',
        stem: 'same-provider',
        alt: 'Two Claude Max accounts side by side, each with its own limits and reset times',
      },
      {
        title: 'Three agents, one view',
        body: 'Claude Code, Codex and OpenCode. An account stands for who pays, so Vertex spend from Claude Code and OpenCode lands in one budget.',
        stem: 'harnesses',
        alt: 'The details table by harness: Claude Code, Codex and OpenCode',
      },
    ],
  },
  {
    label: 'Control',
    features: [
      {
        title: 'Price lists you manage',
        body: 'A built-in price table, one-click imports from LiteLLM, CSV import and export, and your own overrides. Every import shows a preview first.',
        stem: 'prices',
        alt: 'The import preview of OpenAI prices from LiteLLM: 1 new, 1 changed and 2 unchanged models, with the old and new prices of gpt-5.6',
      },
      {
        title: 'Your bar, your way',
        body: 'Pick the entries and their order with a live preview. Show levels as colored text, as a pill, or not at all.',
        stem: 'menubar-settings',
        alt: 'The live preview of the bar with the levels as orange and red pills, and the level color set to Pill',
      },
    ],
  },
];

export const smallThings: { title: string; body: string; icon: string }[] = [
  {
    title: 'Notifications',
    body: 'A banner when usage crosses your thresholds, 80% and 100% by default.',
    icon: 'tabler:bell',
  },
  {
    title: 'Shared budgets',
    body: 'Put several accounts under one budget, like a monthly limit your company sets.',
    icon: 'tabler:building',
  },
  {
    title: 'Works offline',
    body: 'The last good values survive a restart and a missing network, marked <code>~</code> when they may be out of date.',
    icon: 'tabler:wifi-off',
  },
  {
    title: 'Adaptive refresh',
    body: 'Refreshes less while you are away, in Low Power Mode or when the Mac runs hot, and right away when you open the menu.',
    icon: 'tabler:battery-eco',
  },
  {
    title: 'Verified updates',
    body: 'One click installs a new release after checking its checksum, signature and notarization. Homebrew installs are recognized.',
    icon: 'tabler:shield-check',
  },
  {
    title: 'Sign-in alerts',
    body: 'A notification when an agent’s sign-in stops working.',
    icon: 'tabler:key',
  },
];
