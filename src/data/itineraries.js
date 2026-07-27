const img = (id, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

/**
 * Full itineraries, keyed by destination slug. Destinations without an
 * entry here get the "available soon" page.
 */
export const itineraries = {
  'south-africa': {
    edition: 'The September 2026 Edition',
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
  'northern-lights': {
    edition: 'The January 2027 Edition',
    title: 'Oslo, Bergen & the Northern Lights of Tromsø',
    location: 'Oslo · Bergen · Tromsø · Norway',
    duration: '07 Nights / 08 Days',
    heroImage: img('photo-1593378026483-2a1fd46a35bd', 2400),
    overview:
      'From the fjord-side charm of Oslo and the timber wharves of Bergen to three nights beneath the Arctic sky in Tromsø, this journey traces Norway at its most atmospheric. Wander historic old towns, cruise through the dramatic Mostraumen fjord, and chase the Northern Lights on a guided evening safari — before feeding reindeer and learning Sámi traditions on the edge of the Arctic Circle.',
    facts: [
      { label: 'Duration', value: '07 Nights / 08 Days' },
      { label: 'Stay', value: 'Oslo (2 nights) · Bergen (2 nights) · Tromsø (3 nights)' },
      { label: 'Meal Plan', value: 'Bed & Breakfast throughout' },
      { label: 'Domestic Flights', value: 'Oslo–Bergen and Bergen–Tromsø arranged independently (not included)' },
      { label: 'Validity', value: 'January 2027 (Fixed Departure)' },
    ],
    days: [
      {
        day: 'Day 01',
        title: 'Arrival in Oslo',
        text: 'Arrive in Oslo and transfer to your hotel for check-in. Spend the rest of the evening at leisure, settling in ahead of the days to come. Overnight in Oslo.',
      },
      {
        day: 'Day 02',
        title: 'Oslo City Tour — Palaces, Fjords & the Opera House',
        text: 'After breakfast, join a guided walking tour through central Oslo. Highlights include the Tiger Sculpture, the striking Oslo Opera House, Akershus Castle and Fortress, Oslo Cathedral, Karl Johans Gate, Aker Brygge, the Norwegian Parliament and the Royal Palace. The afternoon is at leisure for shopping or exploring the city at your own pace. Overnight in Oslo.',
        image: img('photo-1518517611416-da57df49b8d3'),
        imageAlt: 'The Oslo Opera House on the fjord',
      },
      {
        day: 'Day 03',
        title: 'Onward to Bergen — the Hanseatic Wharf',
        text: 'Check out and transfer to the airport for your flight to Bergen (arranged independently). On arrival, check in to your hotel before joining a guided walking tour of the city, taking in Byparken, the Fish Market, St. Mary’s Church, Bergenhus Fortress, the Bryggen Hanseatic Wharf, the Hanseatic Museum and the Ole Bull Fountain. Overnight in Bergen.',
        image: img('photo-1574931635935-049c8814c881'),
        imageAlt: 'The colourful Hanseatic wharf houses of Bryggen, Bergen',
      },
      {
        day: 'Day 04',
        title: 'Mostraumen Fjord Cruise',
        text: 'After breakfast, board a scenic 3.5-hour cruise through the Mostraumen fjord, with English audio guiding you past western Norway’s dramatic mountains, narrow fjords, waterfalls and picturesque villages. Return to your hotel at leisure. Overnight in Bergen.',
        image: img('photo-1705512604302-3dc9d171832c'),
        imageAlt: 'A cruise boat on a Norwegian fjord',
      },
      {
        day: 'Day 05',
        title: 'Arrival in Tromsø & Northern Lights Safari',
        text: 'Check out and transfer to the airport for your flight to Tromsø (arranged independently). After checking in, spend the evening on a Northern Lights safari with an expert guide and professional photographer, complete with winter suits, a bonfire, hot drinks and the iconic reindeer sausage. Overnight in Tromsø.',
        image: img('photo-1550656722-8099c82ab00c'),
        imageAlt: 'The aurora borealis over Tromsø, Norway',
      },
      {
        day: 'Day 06',
        title: 'Reindeer Sledding & Sámi Culture',
        text: 'After breakfast, visit a Sámi camp for a guided experience that includes feeding Arctic reindeer, storytelling by Sámi hosts and professional photography of the day. The rest of the day is at leisure. Overnight in Tromsø.',
        image: img('photo-1773516088797-7f269b2f6469'),
        imageAlt: 'A reindeer in the Arctic snow',
      },
      {
        day: 'Day 07',
        title: 'Tromsø Walking Tour — Sámi History & Mythology',
        text: 'Join a guided walking tour through Tromsø, weaving in Sámi history, culture and mythology as told by a Sámi cultural bearer. Return to your hotel at leisure. Overnight in Tromsø.',
      },
      {
        day: 'Day 08',
        title: 'Departure',
        text: 'After breakfast, check out and transfer to the airport for your onward flight from Oslo.',
      },
    ],
    inclusions: [
      '7 nights’ 4★ accommodation with daily breakfast (Oslo, Bergen & Tromsø)',
      'Return airport transfers in Oslo, Bergen and Tromsø',
      'Central Oslo guided walking tour (2 hours)',
      'Bergen guided walking tour (2 hours)',
      'Mostraumen Fjord Cruise with English audio guide (3.5 hours)',
      'Northern Lights Safari with expert guide, professional photographer and winter suits',
      'Reindeer Sledding, Feeding & Sámi Culture Experience with photography',
      'Tromsø Walking Tour with Sámi History & Mythology',
    ],
    rates: {
      note: 'Message our concierge on WhatsApp for current rates, hotel options and availability for this departure.',
      rows: [],
    },
  },
}
