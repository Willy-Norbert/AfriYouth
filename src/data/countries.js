// Countries where AfriYouth works (names must match the map data)
// and which programs run there (program slugs from programs.js).
const all = ['youth-research-fellowship', 'policy-innovation-lab', 'design-for-change-bootcamp',
  'venture-builder', 'futures-academy', 'impact-leaders']

export const activeCountries = {
  Rwanda: { hub: true, programs: all },
  Kenya: { programs: ['youth-research-fellowship', 'venture-builder', 'design-for-change-bootcamp'] },
  Uganda: { programs: ['design-for-change-bootcamp', 'impact-leaders'] },
  Tanzania: { programs: ['youth-research-fellowship'] },
  Nigeria: { programs: ['venture-builder', 'futures-academy', 'design-for-change-bootcamp'] },
  Ghana: { programs: ['policy-innovation-lab', 'futures-academy'] },
  Senegal: { programs: ['futures-academy'] },
  Ethiopia: { programs: ['youth-research-fellowship', 'impact-leaders'] },
  'South Africa': { programs: ['impact-leaders', 'venture-builder'] },
  Zambia: { programs: ['design-for-change-bootcamp'] },
}
