// AfriYouth's products & services (from "About AfriYouth Innovation Labs", Sept 2026).
// `labs` are the six core labs; `supporting` are the two supporting services.
// `pillar` links each one to a strategic division in pillars.js.
export const labs = [
  { slug: 'venture-lab', icon: 'Rocket', title: 'Youth Innovation & Venture Lab', pillar: 'innovation',
    text: 'Builds on our original incubation idea: we take young innovators from a first idea to an investor-ready venture.',
    includes: ['Idea discovery', 'Human-Centered Design', 'Design thinking', 'Business-model development',
      'Prototype development', 'Market validation', 'Incubation', 'Acceleration', 'Pitch preparation',
      'Investor readiness', 'Impact measurement'],
    product: 'AfriYouth Innovation Accelerator', model: ['Incubation', 'Acceleration', 'Demo Day'] },
  { slug: 'research-lab', icon: 'Search', title: 'Research & Evidence Lab', pillar: 'research',
    text: 'We generate evidence on Africa’s emerging socio-economic challenges.',
    includes: ['Applied policy research', 'Socio-economic research', 'Youth research and surveys',
      'Baseline and endline studies', 'Impact assessments', 'Programme evaluations',
      'Institutional and stakeholder analysis', 'Political-economy analysis', 'Research reports',
      'Policy briefs', 'Evidence synthesis'],
    product: 'AfriYouth Evidence Reports (company / organisation evidence reports)' },
  { slug: 'policy-lab', icon: 'Landmark', title: 'Policy & Governance Lab', pillar: 'policy',
    text: 'We translate research into actionable policies and institutional reforms.',
    includes: ['Policy analysis and design', 'Policy review', 'Regulatory analysis', 'Policy briefs',
      'Governance diagnostics', 'Public-sector innovation', 'Stakeholder mapping',
      'Policy dialogue facilitation', 'Policy implementation support'],
    product: 'AfriYouth Policy Solutions Series', note: 'Our most important intellectual product.' },
  { slug: 'policy-innovation-challenge', icon: 'Lightbulb', title: 'Policy Innovation Challenge', pillar: 'policy',
    text: 'Our most unique product. Instead of asking young people what business they would like to start, we ask: what is one of Africa’s most pressing problems, and what evidence-based solution can you design?',
    includes: ['Youth employment', 'Education', 'Digital transformation', 'AI (Artificial Intelligence)',
      'Agriculture', 'Climate', 'Health', 'Entrepreneurship', 'Urban development', 'Regional integration'],
    includesLabel: 'Potential themes',
    product: 'Policy Innovation Demo Day',
    model: ['Research', 'Diagnosis', 'Policy proposal', 'Prototype', 'Policy pitch'] },
  { slug: 'futures-lab', icon: 'Telescope', title: 'Strategic Foresight & Futures Lab', pillar: 'foresight',
    text: 'What strongly sets AfriYouth apart from conventional innovation hubs: we help institutions plan for the futures ahead.',
    includes: ['Scenario planning', 'Horizon scanning', 'PESTLE / STEEPV analysis', 'Future-of-work studies',
      'Emerging technology analysis', 'Strategic foresight', '2030 / 2040 / 2050 scenarios'],
    product: 'Africa 2050 Futures Series', note: 'For example: “Africa’s Youth Workforce in 2050: Four Possible Futures”.' },
  { slug: 'career-academy', icon: 'GraduationCap', title: 'Career & Professional Development Academy', pillar: 'leadership',
    text: 'A practical career-readiness and workforce-transition platform: Education → Employability → Employment → Career progression.',
    includes: ['CV customization', 'Cover letter customization', 'LinkedIn optimization', 'Portfolio development',
      'Job searching strategies', 'Understanding job descriptions', 'Application customization',
      'Applicant Tracking Systems (ATS)', 'Networking for employment', 'Interview readiness & professional etiquette'],
    product: 'Employability Bootcamp · University Employability Programme · Professional Development Academy' },
]

export const supporting = [
  { slug: 'impact-learning', icon: 'ChartLine', title: 'Impact & Learning Services', pillar: 'leadership',
    text: 'Many organisations implement projects but struggle to show whether they actually work. We help them prove and improve their impact.',
    includes: ['Theory of Change', 'Logical frameworks', 'M&E systems', 'KPIs', 'Baseline studies',
      'Outcome measurement', 'Impact measurement & evaluation', 'Learning reports', 'Impact storytelling'],
    product: 'AfriYouth Impact Dashboard' },
  { slug: 'funding-readiness', icon: 'Handshake', title: 'Funding & Investment Readiness', pillar: 'innovation',
    text: 'Resource mobilization and investment readiness: a cross-cutting service that connects good ideas to the money and partners they need.',
    includes: ['Grant opportunity intelligence', 'Grant strategy', 'Proposal development', 'Donor mapping',
      'Investor readiness', 'Pitch deck development', 'Business case development', 'Financial modelling',
      'Partnership development', 'Due-diligence preparation'],
  },
]

// Everything in one list (used by the menu)
export const services = [...labs, ...supporting]

// Flagship product: the Evidence-to-Impact Accelerator — research, incubation and training combined.
export const acceleratorStages = [
  ['Discover', 'Identify the problem through community research.'],
  ['Diagnose', 'Understand root causes using systems and political-economy analysis.'],
  ['Research', 'Generate and analyse evidence.'],
  ['Design', 'Develop a human-centered solution.'],
  ['Prototype', 'Build and test the solution.'],
  ['Policy', 'Develop policy recommendations and business cases.'],
  ['Finance', 'Connect the solution to funders, investors and partners.'],
  ['Implement', 'Pilot the solution.'],
  ['Measure', 'Evaluate outcomes and impact.'],
  ['Scale', 'Scale what works.'],
]

// What makes AfriYouth unique: five capabilities, connected
export const capabilities = ['Research', 'Policy', 'Human-Centered Design', 'Entrepreneurship', 'Foresight']
