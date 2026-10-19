// Comparison facts, checked against each project's README and docs on the
// date below (brainstorm 18, page structure 7). Recheck before changing any
// cell. "Not stated" means the docs do not say; it is not a claim either way.

export interface ComparisonRow {
  label: string;
  values: (boolean | string)[];
}

export const comparison: { checked: string; columns: string[]; rows: ComparisonRow[] } = {
  checked: '2026-10-16',
  columns: ['AgentTacho', 'CodexBar', 'Claude Usage Tracker', 'ClaudeBar', 'ccusage'],
  rows: [
    {
      label: 'Form',
      values: ['Menu bar app', 'Menu bar app, widgets, CLI', 'Menu bar app, statusline', 'Menu bar app', 'CLI'],
    },
    {
      label: 'Agents and providers',
      values: [
        'Claude Code, Codex, OpenCode',
        '104 providers',
        'Claude, Codex',
        '28 providers, plus extensions',
        '18 agent CLIs',
      ],
    },
    {
      label: 'Dollar budgets you set',
      values: ['Any pay-per-token account', 'Bedrock, monthly', false, 'Bedrock daily, Claude API monthly', false],
    },
    {
      label: 'One budget shared across accounts',
      values: [true, false, false, false, false],
    },
    {
      label: 'No browser cookies',
      values: [true, 'Optional', 'Optional (session key)', 'Optional', true],
    },
    {
      label: 'No telemetry',
      values: [true, 'Not stated', false, 'Not stated', 'Not stated'],
    },
    {
      label: 'Everything in one view',
      values: [true, 'One item per provider, or merged', 'One profile, or all', 'Up to three providers', 'None'],
    },
  ],
};
