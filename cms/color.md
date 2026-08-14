:root {
  /* ---- Brand base ---- */
  --brand-royal-purple: #6702BA;
  --brand-dark-blue: #1C0B75;
  --brand-butter-yellow: #FFFABD;

  /* Brand gradient (Royal Purple -> Dark Blue, per brand manual pg.5) */
  --brand-gradient: linear-gradient(135deg, var(--brand-royal-purple) 0%, var(--brand-dark-blue) 100%);

  /* Purple ramp (derived, for tints/hover/active — oklch mixed toward white/black) */
  --purple-50:  #F6EDFC;
  --purple-100: #EAD8F8;
  --purple-200: #D4B0F2;
  --purple-300: #B87DE8;
  --purple-400: #9A4DDB;
  --purple-500: #6702BA;
  --purple-600: #5A02A3;
  --purple-700: #4A0286;
  --purple-800: #3A0169;
  --purple-900: #2B014E;

  /* Indigo ramp (Dark Blue secondary) */
  --indigo-50:  #ECEAFA;
  --indigo-100: #D3CDF3;
  --indigo-500: #1C0B75;
  --indigo-600: #180964;
  --indigo-700: #130752;
  --indigo-900: #0B0430;

  /* Neutrals — cool gray, slight purple undertone to stay warm with brand */
  --gray-0:   #FFFFFF;
  --gray-25:  #FBFAFD;
  --gray-50:  #F5F3F9;
  --gray-100: #ECE9F3;
  --gray-200: #DEDAE8;
  --gray-300: #C6C1D6;
  --gray-400: #A29BBB;
  --gray-500: #7C7496;
  --gray-600: #5D5674;
  --gray-700: #443F58;
  --gray-800: #2C2840;
  --gray-900: #1A172A;
  --gray-950: #100E1C;

  /* Semantic status colors — enterprise GRC needs precise, unambiguous risk color */
  --red-50:  #FDECEC;
  --red-400: #E5484D;
  --red-500: #D3242B;
  --red-600: #AF1A21;
  --red-700: #8A1319;

  --amber-50:  #FFF7E0;
  --amber-400: #F5A623;
  --amber-500: #DB8B0B;
  --amber-600: #B36F04;

  --yellow-brand-50: #FFFDF0;
  --yellow-brand-400: var(--brand-butter-yellow);

  --green-50:  #E9F9EF;
  --green-400: #34C777;
  --green-500: #1A9E58;
  --green-600: #0F7E44;

  --blue-50:  #EAF2FE;
  --blue-400: #4B8CF0;
  --blue-500: #2568DB;
  --blue-600: #1C51B0;

  /* ---- Semantic aliases ---- */
  --color-brand-primary: var(--brand-royal-purple);
  --color-brand-secondary: var(--brand-dark-blue);
  --color-brand-accent: var(--brand-butter-yellow);

  --surface-page: var(--gray-25);
  --surface-card: var(--gray-0);
  --surface-sunken: var(--gray-50);
  --surface-inverse: var(--indigo-900);
  --surface-overlay: rgba(16, 14, 28, 0.56);
  --surface-brand-wash: var(--purple-50);

  --border-subtle: var(--gray-200);
  --border-default: var(--gray-300);
  --border-strong: var(--gray-400);
  --border-focus: var(--brand-royal-purple);

  --text-primary: var(--gray-900);
  --text-secondary: var(--gray-600);
  --text-tertiary: var(--gray-500);
  --text-disabled: var(--gray-400);
  --text-inverse: var(--gray-0);
  --text-brand: var(--brand-royal-purple);
  --text-link: var(--brand-royal-purple);
  --text-link-hover: var(--indigo-500);

  --action-primary: var(--brand-royal-purple);
  --action-primary-hover: var(--purple-600);
  --action-primary-active: var(--purple-700);
  --action-secondary: var(--gray-0);
  --action-secondary-hover: var(--gray-50);
  --action-secondary-border: var(--border-default);

  --status-critical-bg: var(--red-50);
  --status-critical-fg: var(--red-600);
  --status-critical-border: #F5C6C7;
  --status-high-bg: var(--amber-50);
  --status-high-fg: var(--amber-600);
  --status-high-border: #F4DBA6;
  --status-medium-bg: var(--yellow-brand-50);
  --status-medium-fg: #8A7D1E;
  --status-medium-border: #EFE6A0;
  --status-low-bg: var(--blue-50);
  --status-low-fg: var(--blue-600);
  --status-low-border: #C4D8F7;
  --status-success-bg: var(--green-50);
  --status-success-fg: var(--green-600);
  --status-success-border: #B9E9CB;
  --status-neutral-bg: var(--gray-100);
  --status-neutral-fg: var(--gray-600);
  --status-neutral-border: var(--gray-200);

  --focus-ring: 0 0 0 3px rgba(103, 2, 186, 0.28);
  --link-visited: var(--indigo-500);
}
