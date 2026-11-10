export const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

// Whole days from today until a date (negative if it has passed)
export const daysLeft = (d) => Math.ceil((new Date(d) - new Date()) / 86400000)
