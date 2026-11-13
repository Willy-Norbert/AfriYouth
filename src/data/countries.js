// Countries where AfriYouth works (names must match the map data)
// and which programs run there (program slugs from programs.js).
// Placeholder list — replace with AfriYouth's real countries.
const all = ['evidence-to-impact-accelerator', 'innovation-accelerator', 'policy-innovation-challenge',
  'employability-bootcamp', 'university-employability-programme', 'professional-development-academy']

export const activeCountries = {
  Rwanda: { hub: true, programs: all },
  Kenya: { programs: ['innovation-accelerator', 'policy-innovation-challenge', 'employability-bootcamp'] },
  Uganda: { programs: ['university-employability-programme', 'employability-bootcamp'] },
  Tanzania: { programs: ['policy-innovation-challenge'] },
  Nigeria: { programs: ['innovation-accelerator', 'professional-development-academy', 'policy-innovation-challenge'] },
  Ghana: { programs: ['policy-innovation-challenge', 'evidence-to-impact-accelerator'] },
  Senegal: { programs: ['professional-development-academy'] },
  Ethiopia: { programs: ['evidence-to-impact-accelerator', 'university-employability-programme'] },
  'South Africa': { programs: ['innovation-accelerator', 'professional-development-academy'] },
  Zambia: { programs: ['employability-bootcamp'] },
}
