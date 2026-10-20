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
    label: 'Limits',
    features: [
      {
        title: 'Plan limits',
        body: 'Claude Pro and Max, and Codex on a ChatGPT plan: every window with its reset time, live from the provider, so other machines count too. Click a window to show it in the menu bar.',
        stem: 'plan-limits',
        alt: 'A Claude Max section with 5-hour, 7-day and Fable limits and their reset times, the 5-hour window marked as the one shown in the menu bar',
      },
      {
        title: 'Pace',
        body: 'A tick on each bar marks even use. When you run ahead, an orange note says by how much and when you run out before the reset. <code>↑</code> marks an entry that burns fast.',
        stem: 'pace',
        alt: 'A 7-day limit at 70% with its tick and an orange note: 20% ahead, burning fast, runs out in 1d 12h',
      },
      {
        title: 'Alerts and colors',
        body: 'Orange near the limit, red past it, and a notification when usage crosses your thresholds, 80% and 100% by default.',
        stem: 'alert',
        alt: 'A notification that a budget crossed 80%',
      },
    ],
  },
  {
    label: 'Budgets',
    features: [
      {
        title: 'Budgets you set',
        body: 'Pay-per-token spend on Vertex or the OpenAI API, against your own weekly or monthly budget.',
        stem: 'budget',
        alt: 'A company budget with 430 of 500 dollars spent this month and an orange pace note',
      },
      {
        title: 'Shared budgets',
        body: 'Several accounts under one budget, like a monthly limit your company sets.',
        stem: 'groups',
        alt: 'Settings, Groups tab, with a shared monthly company budget',
      },
      {
        title: 'Price lists you control',
        body: 'A built-in price table, one-click imports from LiteLLM, CSV import and export, and your own overrides. Every import shows a preview first.',
        stem: 'prices',
        alt: 'Settings, Prices tab, with the Import menu',
      },
    ],
  },
  {
    label: 'Your setup',
    features: [
      {
        title: 'Details on demand',
        body: 'Tokens per model, project and harness, with a per-day trend, folded away until you need them.',
        stem: 'details',
        alt: 'The details table with tokens per model and the per-day row with its sum',
      },
      {
        title: 'Your bar, your way',
        body: 'Pick the entries and their order with a live preview. Show levels as colored text, as a pill, or not at all.',
        stem: 'menubar-settings',
        alt: 'Settings, Menu Bar tab, with the live preview of the bar',
      },
      {
        title: 'Three agents, one view',
        body: 'Claude Code, Codex and OpenCode. An account stands for who pays, so Vertex spend from Claude Code and OpenCode lands in one budget.',
        stem: 'harnesses',
        alt: 'The details table by harness: Claude Code, Codex and OpenCode',
      },
    ],
  },
];

export const smallThings: { title: string; body: string; icon: string }[] = [
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
  {
    title: 'One JSON file',
    body: 'Settings write a plain configuration file that you can edit by hand.',
    icon: 'tabler:file-code',
  },
];
