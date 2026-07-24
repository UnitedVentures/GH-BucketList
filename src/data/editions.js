const img = (id, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

// Go Holidays WhatsApp business line
export const whatsapp = (message) =>
  `https://wa.me/94772211600?text=${encodeURIComponent(message)}`

export const featured = {
  edition: 'Nº 09',
  slug: 'south-africa',
  month: 'September 2026',
  place: 'South Africa',
  country: 'Cape Town · Winelands · Safari',
  image: img('photo-1580060839134-75a5edca2e99', 2400),
}

export const upcoming = [
  {
    edition: 'Nº 10',
    slug: 'dambadiva-by-rail',
    month: 'October 2026',
    place: 'Luxury Dambadiva by Rail',
    country: 'India',
    image: img('photo-1564507592333-c60657eea523'),
  },
  {
    edition: 'Nº 11',
    slug: 'dubai-from-above',
    month: 'November 2026',
    place: 'Dubai from Above',
    country: 'United Arab Emirates',
    image: img('photo-1523816572-a1a23d1a67b8'),
  },
  {
    edition: 'Nº 12',
    slug: 'christmas-markets',
    month: 'December 2026',
    place: 'Christmas Markets by River',
    country: 'Germany · Viva Cruises',
    image: img('photo-1544212415-85fec3f52087'),
  },
  {
    edition: 'Nº 01',
    slug: 'northern-lights',
    month: 'January 2027',
    place: 'Northern Lights',
    country: 'Norway',
    image: img('photo-1593378026483-2a1fd46a35bd'),
  },
  {
    edition: 'Nº 02',
    slug: 'cherry-blossom',
    month: 'February 2027',
    place: 'Cherry Blossom Preview',
    country: 'Japan',
    image: img('photo-1490806843957-31f4c9a91c65'),
  },
  {
    edition: 'Nº 03',
    slug: 'jakarta-jazz',
    month: 'March 2027',
    place: 'Jakarta International Jazz Festival',
    country: 'Indonesia',
    image: img('photo-1415201364774-f6f0bb35f28f'),
  },
  {
    edition: 'Nº 04',
    slug: 'alps-and-tulips',
    month: 'April 2027',
    place: 'Swiss Alps & Tulips',
    country: 'Switzerland & The Netherlands',
    image: img('photo-1713439340151-6f1e7f6fb9c9'),
  },
  {
    edition: 'Nº 05',
    slug: 'machu-picchu',
    month: 'May 2027',
    place: 'Machu Picchu & Cusco',
    country: 'Peru',
    image: img('photo-1587595431973-160d0d94add1'),
  },
  {
    edition: 'Nº 06',
    slug: 'alaska-montreal',
    month: 'June 2027',
    place: 'Alaska Cruise & Montreal Jazz',
    country: 'USA & Canada',
    image: img('photo-1605978208410-c3deb0fab40d'),
  },
  {
    edition: 'Nº 07',
    slug: 'great-migration',
    month: 'July 2027',
    place: 'The Great Migration',
    country: 'Kenya',
    image: img('photo-1564101160531-4838e8a5f4e7'),
  },
  {
    edition: 'Nº 08',
    slug: 'silk-road',
    month: 'August 2027',
    place: 'Luxury Silk Road',
    country: 'Uzbekistan',
    image: img('photo-1664602078796-68ee76b3fc59'),
  },
]

export const bandImage = img('photo-1547471080-7cc2caa01a7e', 2400)
