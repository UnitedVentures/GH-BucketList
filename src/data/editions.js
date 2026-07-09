const img = (id, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

// Go Holidays WhatsApp business line
export const whatsapp = (message) =>
  `https://wa.me/94772211600?text=${encodeURIComponent(message)}`

export const featured = {
  edition: 'Nº 09',
  month: 'September 2026',
  place: 'South Africa',
  heroTitle: 'South Africa',
  country: 'Cape Town · Winelands · Safari',
  tagline:
    'September, when spring sets the Cape alight and the dry bush brings the Big Five into view.',
  description:
    'Seven spring days across the Cape: Table Mountain at golden hour, the winelands waking in green, and prime dry-season game drives deep in the bushveld.',
  image: img('photo-1580060839134-75a5edca2e99', 2400),
}

export const upcoming = [
  {
    edition: 'Nº 10',
    month: 'October 2026',
    place: 'Luxury Dambadiva by Rail',
    heroTitle: 'Luxury Dambadiva',
    country: 'India',
    tagline:
      'The sacred cities of the Buddha, by private rail — in October’s first cool, golden days.',
    description:
      'A private rail residence through the sacred geography of the Buddha — Lumbini, Bodh Gaya, Sarnath and Kushinagar — in the gentle cool that follows the monsoon.',
    image: img('photo-1564507592333-c60657eea523'),
  },
  {
    edition: 'Nº 11',
    month: 'November 2026',
    place: 'Dubai from Above',
    heroTitle: 'Dubai from Above',
    country: 'United Arab Emirates',
    tagline:
      'Drift over the dunes by hot air balloon, or sweep the skyline by helicopter — November’s desert air at its clearest.',
    description:
      'Dawn balloon flights over the dunes, a private helicopter sweep of the marina and the Palm, and the quiet luxury of the desert after dark.',
    image: img('photo-1523816572-a1a23d1a67b8'),
  },
  {
    edition: 'Nº 12',
    month: 'December 2026',
    place: 'Christmas Markets by River',
    country: 'Germany · Viva Cruises',
    tagline:
      'Glide along the Rhine as Germany’s market squares begin to glow — mulled wine, carols and centuries of December.',
    image: img('photo-1544212415-85fec3f52087'),
  },
  {
    edition: 'Nº 01',
    month: 'January 2027',
    place: 'Northern Lights',
    country: 'Norway',
    tagline:
      'Deep in the polar night, Norway’s skies dance at their brightest.',
    image: img('photo-1593378026483-2a1fd46a35bd'),
  },
  {
    edition: 'Nº 02',
    month: 'February 2027',
    place: 'Cherry Blossom Preview',
    country: 'Japan',
    tagline:
      'Catch the first blush of sakura — before the world knows spring has begun.',
    image: img('photo-1490806843957-31f4c9a91c65'),
  },
  {
    edition: 'Nº 03',
    month: 'March 2027',
    place: 'Jakarta International Jazz Festival',
    country: 'Indonesia',
    tagline:
      'Three nights, a hundred stages — the world’s grandest gathering of jazz.',
    image: img('photo-1415201364774-f6f0bb35f28f'),
  },
  {
    edition: 'Nº 04',
    month: 'April 2027',
    place: 'Swiss Alps & Tulips',
    country: 'Switzerland & The Netherlands',
    tagline:
      'Snow still on the peaks, tulips carpeting the lowlands — April holds both at once.',
    image: img('photo-1713439340151-6f1e7f6fb9c9'),
  },
  {
    edition: 'Nº 05',
    month: 'May 2027',
    place: 'Machu Picchu & Cusco',
    country: 'Peru',
    tagline:
      'The dry season dawns over the Sacred Valley — clear trails, quiet ruins.',
    image: img('photo-1587595431973-160d0d94add1'),
  },
  {
    edition: 'Nº 06',
    month: 'June 2027',
    place: 'Alaska Cruise & Montreal Jazz',
    country: 'USA & Canada',
    tagline:
      'Midnight sun on the glaciers, jazz on the summer streets of Montréal.',
    image: img('photo-1605978208410-c3deb0fab40d'),
  },
  {
    edition: 'Nº 07',
    month: 'July 2027',
    place: 'The Great Migration',
    country: 'Kenya',
    tagline:
      'Peak migration drama in the Serengeti — and a hot air balloon safari at sunrise over the Mara.',
    image: img('photo-1564101160531-4838e8a5f4e7'),
  },
  {
    edition: 'Nº 08',
    month: 'August 2027',
    place: 'Luxury Silk Road',
    country: 'Uzbekistan',
    tagline:
      'Samarkand’s turquoise domes in the long golden light of late summer.',
    image: img('photo-1664602078796-68ee76b3fc59'),
  },
]

// the hero carousel: the current tour plus the two months that follow
export const heroTours = [featured, upcoming[0], upcoming[1]]

export const bandImage = img('photo-1547471080-7cc2caa01a7e', 2400)
