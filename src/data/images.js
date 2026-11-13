// All photos in one place.
// Files in public/images/ are AfriYouth brand photography (from the brand guidelines).
// The rest are free-to-use Unsplash photos — replace them with AfriYouth's own
// (put files in /public/images and use "/images/name.webp").
const u = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

export const images = {
  // Brand photography
  hero: '/images/startup-celebration.webp',
  celebration: '/images/startup-celebration.webp',
  vrLearning: '/images/vr-learning.webp',
  fieldEngineers: '/images/field-engineers.webp',
  vrDesk: '/images/vr-desk.webp',
  electronics: '/images/electronics.webp',
  soldering: '/images/soldering.webp',

  // Unsplash (placeholders)
  team: u('1620479589423-0abc990883cb'),
  workshop: u('1758270705518-b61b40527e76'),
  laptopGroup: u('1655720357872-ce227e4164ba'),
  benchLaptops: u('1655720348590-c739c860beed'),
  coding: u('1531482615713-2afd69097998'),
  meeting: u('1573497701240-345a300b8d36'),
  lecture: u('1758270705067-0d7edee57af0'),
  founder: u('1573497019418-b400bb3ab074', 800),
  graduate: u('1594750852563-5ed8e0421d40', 800),
  writing: u('1507537297725-24a1c029d3ca', 800),
  portrait1: u('1573496527892-904f897eb744', 300),
  portrait2: u('1614023342667-6f060e9d1e04', 300),
  portrait3: u('1573497160825-0d94a2724d40', 300),
}
