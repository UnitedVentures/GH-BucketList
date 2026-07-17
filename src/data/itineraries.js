const img = (id, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

/**
 * Full itineraries, keyed by destination slug. Destinations without an
 * entry here get the "available soon" page.
 */
export const itineraries = {
  'south-africa': {
    edition: 'The September 2026 Edition · Nº 09',
    title: 'Cape Town, Winelands & Big Five Safari',
    location: 'Cape Town · Aquila · South Africa',
    duration: '06 Nights / 07 Days',
    heroImage: img('photo-1580060839134-75a5edca2e99', 2400),
    overview:
      'Experience the best of Cape Town’s culture, scenery and wine country, combined with thrilling safari adventures at Aquila Game Reserve. From the iconic Table Mountain and Cape Point to world-class vineyards and unforgettable Big Five encounters, this journey blends urban charm, natural beauty and wildlife exploration in one unforgettable trip.',
    facts: [
      { label: 'Duration', value: '06 Nights / 07 Days' },
      { label: 'Stay', value: 'Cape Town (4 nights) · Aquila Private Game Reserve (2 nights)' },
      { label: 'Meal Plan', value: 'Bed & Breakfast in Cape Town · Full Board at Aquila' },
      { label: 'Validity', value: '16 January – 30 September 2026' },
    ],
    days: [
      {
        day: 'Day 01',
        title: 'Arrival in Cape Town — Day at Leisure',
        text: 'Arrive at Cape Town International Airport and proceed to your hotel. After check-in, enjoy the rest of the day at leisure to relax or explore the nearby surroundings at your own pace.',
      },
      {
        day: 'Day 02',
        title: 'Cape Town City Tour & Table Mountain Cable Ride',
        text: 'Post breakfast, embark on a cultural city tour of the vibrant Mother City. Highlights include the Table Mountain Cable Car (weather permitting), a scenic drive via Clifton & Sea Point, visits to Green Market Square and District Six, a peaceful walk through the Company Gardens, and panoramic views of the Parliament, City Hall, Castle of Good Hope and Slave Lodge.',
        image: img('photo-1599070158776-9e331c420309'),
        imageAlt: 'The Cape coastline, mountains meeting the sea',
      },
      {
        day: 'Day 03',
        title: 'Full-Day Cape Peninsula Tour',
        text: 'Start your day at 9:00 AM for an unforgettable journey to where the two oceans meet. The tour includes a 30-minute glass-bottom boat ride to Seal Island at Hout Bay (weather permitting), a visit to the Cape Point Nature Reserve and the Cape of Good Hope, an optional funicular ride to the upper lighthouse, the Penguin Colony at Boulders Beach, and a drive along Chapman’s Peak (if open).',
        image: img('photo-1496497243327-9dccd845c35f'),
        imageAlt: 'African penguins at Boulders Beach',
      },
      {
        day: 'Day 04',
        title: 'Cape Winelands — Franschhoek, Paarl & Stellenbosch',
        text: 'Enjoy a journey through world-class vineyards, scenic valleys and historic wine estates. In Paarl, taste bold Chenin Blanc, Shiraz and Cabernet Sauvignon in cosy settings. In Stellenbosch, experience wine & cheese pairings, guided tastings and elegant vineyard views. In Franschhoek, explore South Africa’s gourmet capital with its French-influenced charm.',
        image: img('photo-1489676138048-ba1786a7f026'),
        imageAlt: 'Vineyards in the Cape Winelands',
      },
      {
        day: 'Day 05',
        title: 'Afternoon Safari at Aquila Game Reserve',
        text: 'After lunch, depart Cape Town for the Aquila Game Reserve. On arrival, enjoy a welcome drink before setting off on a guided two-hour safari drive in an open vehicle. Spot the Big Five, along with antelope species, zebras, giraffes and over 170 bird species, and learn about the conservation efforts of the reserve.',
        image: img('photo-1544211393-7fdc8fca9f4f'),
        imageAlt: 'A lion on the reserve',
      },
      {
        day: 'Day 06',
        title: 'Full-Day Safari at Aquila Game Reserve',
        text: 'Spend an immersive day connecting with South Africa’s wildlife and natural beauty. Enjoy an eight-hour guided game drive across diverse terrains with opportunities to see the Big Five, hippos, crocodiles and exotic birds. Relish lunch at the reserve’s restaurant, take time to relax by the pool or enjoy a nature walk.',
      },
      {
        day: 'Day 07',
        title: 'Departure — Cape Town International Airport',
        text: 'After breakfast, check out from your hotel and transfer to Cape Town International Airport for your onward flight, carrying unforgettable memories of the Cape.',
      },
    ],
    inclusions: [
      '4 nights’ accommodation in Cape Town with breakfast',
      '2 nights at Aquila Private Game Reserve, with its luxurious African hospitality',
      'Return airport transfers, and return transfers to and from Aquila',
      'Private touring with a dedicated guide (8 hours per touring day)',
      'City tour including Table Mountain, with entries for Seal Island, Cape Point, the funicular, Boulders Beach and three wine tastings',
      'Two shared game drives at Aquila, home of the Big Five',
    ],
    rates: {
      note: 'Per person on twin/double sharing basis, in USD. Hotels, rooms and rates are subject to availability; rates are not valid on blackout dates and peak periods.',
      rows: [
        { tier: '3★ · Onomo Inn on the Square or similar', twin: '$1,273', single: '$2,346' },
        { tier: '4★ · The Rockefeller or similar', twin: '$1,318', single: '$2,410' },
        { tier: '5★ · Hyatt Regency or similar', twin: '$1,407', single: '$2,494' },
      ],
    },
    alternative: {
      eyebrow: 'Prefer Deeper Wilderness?',
      title: 'The Kruger Alternative',
      text: 'An immersive luxury safari in Kruger National Park — three nights at the celebrated Kruger Shalati Lodge on full board with drinks, two daily game drives in open safari vehicles with an experienced ranger, and return transfers from Skukuza Airport. Big Five sightings, and an African wilderness experience like no other.',
      detail: '03 Nights / 04 Days · from $1,905 per person · valid 01 April – 30 June 2026',
      image: img('photo-1681829496174-e9b03398a0a9'),
      imageAlt: 'An elephant crossing the road in Kruger National Park',
    },
  },
}
