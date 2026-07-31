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
    title: 'Tromsø — Northern Lights, Huskies & the Arctic Sea',
    location: 'Tromsø · Norway',
    duration: '07 Nights / 08 Days',
    heroImage: img('photo-1593378026483-2a1fd46a35bd', 2400),
    overview:
      'Deep inside the Arctic Circle, Tromsø delivers a full week of Nordic winter at its most immersive — a guided Northern Lights safari beneath the polar sky, husky sledding across frozen wilderness, a snowmobile expedition to a remote camp, whale watching by high-speed catamaran, and an afternoon with a Sámi reindeer family.',
    facts: [
      { label: 'Duration', value: '07 Nights / 08 Days' },
      { label: 'Stay', value: 'Tromsø (7 nights) — Home Hotel Aurora or similar' },
      { label: 'Meal Plan', value: 'Half-board (breakfast & dinner) throughout' },
      { label: 'Validity', value: 'January 2027 (Fixed Departure)' },
    ],
    days: [
      {
        day: 'Day 01',
        title: 'Arrival in Tromsø',
        text: 'Upon arrival, a private transfer takes you to your accommodation, around 8 km away. Check in and settle in over dinner at the Home Hotel Aurora, overlooking Tromsø Harbour on the pedestrian street Sjøgata. Overnight in Tromsø.',
      },
      {
        day: 'Day 02',
        title: 'Northern Lights Safari',
        text: 'A free day to explore the city, before setting off at 7pm in a comfortable Mercedes Sprinter with your guide, who will explain the science, history and culture behind the aurora as you head toward the best local conditions. Change into thermal clothing, warm up with a hot drink and a light dinner by the fire, and watch the sky for the Northern Lights — 6 to 9 hours depending on weather, with a photo of the experience included. Overnight in Tromsø.',
        image: img('photo-1550656722-8099c82ab00c'),
        imageAlt: 'The aurora borealis over Tromsø, Norway',
      },
      {
        day: 'Day 03',
        title: 'Fjellheisen Cable Car',
        text: 'An electric shuttle connects Tromsø city centre to the Fjellheisen cable car, whisking you to the picturesque summit of Storsteinen mountain for breathtaking winter panoramas over the city and its fjords. The rest of the day is free. Overnight in Tromsø.',
      },
      {
        day: 'Day 04',
        title: 'Husky Sledding Excursion',
        text: 'Learn the art of mushing on a half-day dog sledding excursion, pulled across the snow by a team of athletic huskies and sharing your sled with a fellow traveller. Return to camp for a hot meal and a traditional Bidos reindeer stew by an open fire in a Sámi Gamme hut, finished with hot chocolate and cake. Overnight in Tromsø.',
        image: img('photo-1630997304867-729e29ff7bf4'),
        imageAlt: 'A team of huskies pulling a sled across the Arctic snow at dusk',
      },
      {
        day: 'Day 05',
        title: 'Snowmobile Expedition to Camp Tamok',
        text: 'A 90-minute drive into the remote Tamokdalen region brings you to Camp Tamok, where your guides kit you out in a thermal suit, boots, gloves and helmet before a full safety briefing. Navigate snowy trails through mountains, valleys and frozen lakes, sharing a snowmobile and swapping driver and passenger halfway through, before a hot meal and fireside stories in a traditional lavvu tent. Overnight in Tromsø.',
      },
      {
        day: 'Day 06',
        title: 'Whale Watching by High-Speed Catamaran',
        text: 'Board a modern, high-speed catamaran bound for the winter feeding grounds of humpback whales and orcas, which migrate to the cold waters off Tromsø each year from mid-October to the end of January. Enjoy sweeping views of the Lyngen Alps from the panoramic lounge as your guides share the region’s history and natural wonders. Overnight in Tromsø.',
        image: img('photo-1563306542-495d13c4c145'),
        imageAlt: 'A humpback whale diving near a whale-watching boat in Arctic waters',
      },
      {
        day: 'Day 07',
        title: 'Reindeer & Sámi Culture',
        text: 'A short drive to Lavangsdalen brings you to a Sámi family camp, where you’ll hear stories of their culture and history, feed the reindeer and try your hand at lassoing. Warm up with a light snack and browse authentic, handcrafted Sámi products — a wonderful souvenir of your trip. Overnight in Tromsø.',
        image: img('photo-1773516088797-7f269b2f6469'),
        imageAlt: 'A reindeer in the Arctic snow',
      },
      {
        day: 'Day 08',
        title: 'Departure',
        text: 'After breakfast, check out and transfer privately to the airport for your onward flight.',
      },
    ],
    inclusions: [
      '7 nights’ half-board accommodation at Home Hotel Aurora (or similar), overlooking Tromsø Harbour',
      'Northern Lights Safari with expert guide, hot drinks, snack and thermal clothing',
      'Fjellheisen shuttle and return cable car',
      'Husky sledding excursion with mushing instruction and a traditional hot meal',
      'Snowmobile expedition to Camp Tamok with full equipment and a hot meal in a lavvu tent',
      'High-speed catamaran whale watching safari',
      'Sámi reindeer camp experience with feeding, storytelling and photography',
    ],
    rates: {
      note: 'Message our concierge on WhatsApp for current rates, hotel options and availability for this departure.',
      rows: [],
    },
  },
  'portugal-spain': {
    edition: 'The October 2026 Edition',
    title: 'Porto, Lisbon & the Andalusian Cities',
    location: 'Porto · Lisbon · Seville · Granada · Portugal & Spain',
    duration: '11 Nights / 12 Days',
    heroImage: img('photo-1697096910974-dacdef90bf36', 2400),
    overview:
      'From the tiled riverside houses of Porto to the hilltop fortress of Granada’s Alhambra, this journey threads together Portugal and Andalusia’s most beautiful cities. Cruise the Douro and taste Port wine at its source, wander UNESCO-listed Coimbra, lose an evening to Lisbon’s Fado, and cross into Spain for flamenco in Seville and the Moorish splendour of the Alhambra.',
    facts: [
      { label: 'Duration', value: '11 Nights / 12 Days' },
      { label: 'Stay', value: 'Porto (2 nights) · Coimbra (1 night) · Lisbon (3 nights) · Seville (3 nights) · Granada (2 nights)' },
      { label: 'Meal Plan', value: 'Bed & Breakfast throughout, plus a Fado dinner in Lisbon and a flamenco tapas dinner in Seville' },
      { label: 'Validity', value: 'October 2026' },
    ],
    days: [
      {
        day: 'Day 01',
        title: 'Arrival in Porto — the Ribeira',
        text: 'Arrive in Porto and transfer to the Porto Ribeira Hotel for two nights. Depending on your arrival time, take in your first glimpse of the Ribeira, the UNESCO-listed historic district, strolling the Douro riverbanks and admiring the colourful facades and the famous Dom Luís I Bridge.',
      },
      {
        day: 'Day 02',
        title: 'Douro River Cruise & Port Wine Tasting',
        text: 'After breakfast, board a scenic three-hour cruise on the Douro, followed by a visit to a winery in Vila Nova de Gaia for a tasting of the famous Port wine.',
      },
      {
        day: 'Day 03',
        title: 'Coimbra — a UNESCO University City',
        text: 'Discover the city on a guided tour of the University of Coimbra, a UNESCO World Heritage Site, taking in the Joanina Library, the Chapel of São Miguel and the Royal Palace. See the Sé Nova and Sé Velha cathedrals, pass through the old fortified city’s Porta da Barbaca, and finish at the Church of Santa Cruz, with stories of Rua da Sofia and the Pátio da Inquisição along the way. Overnight in Coimbra.',
        image: img('photo-1697096910974-dacdef90bf36'),
        imageAlt: 'Colourful tiled facades in a Portuguese historic quarter',
      },
      {
        day: 'Day 04',
        title: 'Onward to Lisbon',
        text: 'Free time in Coimbra before departing by train to Lisbon. Transfer and check in to the Iberostar Selection Lisboa for three nights, then take some time to explore the city’s iconic neighbourhoods, from the narrow streets of Alfama to Praça do Comércio and the famous yellow trams.',
        image: img('photo-1585208798174-6cedd86e019a'),
        imageAlt: 'A classic yellow tram on the streets of Lisbon',
      },
      {
        day: 'Day 05',
        title: 'Exploring Lisbon',
        text: 'A three-hour guided city tour, with free time in the afternoon. In the evening, join a traditional Portuguese Fado dinner.',
      },
      {
        day: 'Day 06',
        title: 'Sintra & the Atlantic Coast',
        text: 'An excursion to Sintra to discover the spectacular Pena National Palace and the mysterious Quinta da Regaleira. The day continues to Cabo da Roca, the westernmost point of mainland Europe, before a stop in the elegant seaside resort of Cascais, returning to Lisbon in the evening.',
      },
      {
        day: 'Day 07',
        title: 'Lisbon to Seville',
        text: 'Fly to Seville and check in to Las Casas de la Judería for three nights. Explore the majestic Seville Cathedral, the Giralda, and the sumptuous Alcázar of Seville, with the evening concluding in a flamenco show and tapas dinner.',
      },
      {
        day: 'Day 08',
        title: 'Seville — the Guadalquivir & Barrio Santa Cruz',
        text: 'A day dedicated to one of Europe’s most enchanting cities. Begin on the banks of the Guadalquivir River at the Torre del Oro, a former Almohad stronghold, then stroll the whitewashed, flower-filled Barrio Santa Cruz. In the afternoon, explore the Parque de María Luisa and the Plaza de España, a masterpiece of Spanish Renaissance built for the 1929 Ibero-American Exposition, before an evening of tapas in a Sevillian taberna.',
        image: img('photo-1559386081-325882507af7'),
        imageAlt: 'The grand arcades of the Plaza de España in Seville',
      },
      {
        day: 'Day 09',
        title: 'Excursion to Córdoba',
        text: 'A day trip to Córdoba to discover the remarkable Mosque-Cathedral, the narrow streets of the historic quarter, and its famous flower-filled patios. Return to Seville at the end of the day.',
      },
      {
        day: 'Day 10',
        title: 'Seville to Granada',
        text: 'A train journey to Granada, then check in to the Sercotel Palacio de los Gamboa for two nights. Visit the unmissable Alhambra, a masterpiece of Nasrid architecture, and its magnificent gardens.',
      },
      {
        day: 'Day 11',
        title: 'Granada — the Albaicín',
        text: 'A free day to stroll the Albaicín district, admire the view from the San Nicolás viewpoint, or linger on the terraces of the historic centre.',
      },
      {
        day: 'Day 12',
        title: 'Departure',
        text: 'According to your flight schedule, transfer to the airport and depart with wonderful memories of this journey through Portugal and Andalusia.',
      },
    ],
    inclusions: [
      '11 nights’ accommodation across Porto, Coimbra, Lisbon, Seville & Granada, with daily breakfast',
      'Douro River cruise (3 hours) with Port wine tasting in Vila Nova de Gaia',
      'Guided walking tours of Coimbra, Lisbon and Seville',
      'Traditional Fado dinner in Lisbon, and a flamenco show with tapas dinner in Seville',
      'Full-day excursions to Sintra & Cascais, and to Córdoba',
      'Entrance to the Alhambra and its gardens in Granada',
      'Train travel between Coimbra–Lisbon and Seville–Granada, and a flight between Lisbon–Seville',
    ],
    rates: {
      note: 'Message our concierge on WhatsApp for current rates, hotel options and availability for this departure.',
      rows: [],
    },
  },
  'cape-town-jazz-safari': {
    edition: 'The March 2027 Edition',
    title: 'Cape Town International Jazz Festival & Safari',
    location: 'Cape Town · Aquila · South Africa',
    duration: '06 Nights / 07 Days',
    heroImage: img('photo-1675118222234-69660ad7cca8', 2400),
    overview:
      'Two nights of world-class jazz meet the very best of the Cape — Table Mountain, the Winelands, the Cape Peninsula and a private safari at Aquila — in one seven-day escape built around the Cape Town International Jazz Festival.',
    facts: [
      { label: 'Duration', value: '06 Nights / 07 Days' },
      { label: 'Stay', value: 'Cape Town (6 nights)' },
      { label: 'Hotel Options', value: '3★ Onomo Inn on the Square · 4★ Capetonian Hotel · 5★ Pullman Hotel (or similar)' },
      { label: 'Meal Plan', value: 'Bed & Breakfast, plus welcome drinks and lunch on the Aquila safari afternoon' },
    ],
    days: [
      {
        day: 'Day 01',
        title: 'Arrival in Cape Town',
        text: 'Arrive at Cape Town International Airport for a private transfer to your hotel, with the afternoon at leisure.',
      },
      {
        day: 'Day 02',
        title: 'Table Mountain & City Tour — Jazz Festival Night One',
        text: 'After a leisurely breakfast, embark on a Table Mountain and city tour: the aerial cable way (weather permitting), a Bo-Kaap walkabout, District Six Museum, Company’s Garden, the Houses of Parliament, a drive past the Grand Parade, and the Castle of Good Hope. Freshen up at the hotel before return transfers and tickets to the Cape Town International Jazz Festival.',
      },
      {
        day: 'Day 03',
        title: 'Cape Winelands — Jazz Festival Night Two',
        text: 'A full-day Winelands tour through Paarl, Franschhoek and Stellenbosch, with three wine tastings included. Freshen up at the hotel before return transfers and tickets to your second night at the Jazz Festival.',
      },
      {
        day: 'Day 04',
        title: 'Full-Day Cape Peninsula Tour',
        text: 'A full day exploring the Peninsula: the penguin colony at Boulders Beach, Cape Point, a return funicular ride, a photo stop at Camps Bay, Simon’s Town, and Chapman’s Peak (if open).',
        image: img('photo-1496497243327-9dccd845c35f'),
        imageAlt: 'African penguins at Boulders Beach',
      },
      {
        day: 'Day 05',
        title: 'Afternoon Safari at Aquila Private Game Reserve',
        text: 'A trip to Aquila Private Game Reserve for an afternoon safari — welcome drinks, lunch, and a game drive in an open safari vehicle — before departing back to Cape Town.',
        image: img('photo-1544211393-7fdc8fca9f4f'),
        imageAlt: 'A lion on the reserve',
      },
      {
        day: 'Day 06',
        title: 'Open Day',
        text: 'A free day for optional activities — Robben Island or shopping.',
      },
      {
        day: 'Day 07',
        title: 'Departure',
        text: 'A private transfer to Cape Town International Airport for your onward flight.',
      },
    ],
    inclusions: [
      'Accommodation as per program, including daily breakfast',
      'Luxury air-conditioned vehicle throughout the tour',
      'Cape Town International Jazz Festival tickets for 2 nights (subject to event schedule and availability)',
      'Cape Peninsula Tour entrance fees — Chapman’s Peak (if open), the funicular, and Cape Point',
      'Three wine tastings on the Winelands Tour',
      'Table Mountain cable way (weather permitting) and Castle of Good Hope entry',
      'Aquila safari — welcome drinks, lunch and an open-vehicle game drive',
    ],
    rates: {
      note: 'Message our concierge on WhatsApp for current rates, hotel options and availability for this departure.',
      rows: [],
    },
  },
  'cherry-blossom': {
    edition: 'The February 2027 Edition',
    title: 'Japan’s Earliest Spring & Finest Winter Journey',
    location: 'Okinawa · Tokyo · Hakone · Nagano · Sapporo · Japan',
    duration: '13 Nights / 14 Days',
    heroImage: img('photo-1490806843957-31f4c9a91c65', 2400),
    overview:
      'From Okinawa’s first cherry blossoms of the year to the Sapporo Snow Festival’s ice sculptures, this fourteen-day journey traces Japan at both of its most beautiful extremes. A private guide carries you from a beachfront resort in the south to Tokyo’s temples and sushi counters, a Hakone onsen beneath Mount Fuji, the wild snow monkeys of Nagano, and four nights in the heart of Hokkaido’s winter capital.',
    facts: [
      { label: 'Duration', value: '13 Nights / 14 Days' },
      { label: 'Stay', value: 'Okinawa (3 nights) · Tokyo (2 nights) · Hakone (1 night) · Nagano (2 nights) · Sapporo (4 nights)' },
      { label: 'Style', value: 'Private English-speaking guide and luxury ryokan throughout' },
      { label: 'Validity', value: 'February 2027' },
    ],
    days: [
      {
        day: 'Day 01',
        title: 'Arrival in Okinawa',
        text: 'Arrive at Naha Airport to a private English-speaking guide and transfer to a luxury beachfront resort, with an Okinawan premium welcome dinner featuring local seafood, Agu pork and Awamori pairings.',
      },
      {
        day: 'Day 02',
        title: 'Okinawa’s Cherry Blossoms',
        text: 'Walk among the island’s earliest-blooming Kanhi-zakura at Mt Yaedake, then continue to the Nakijin Castle Ruins, a UNESCO World Heritage Site where cherry blossoms meet centuries of Ryukyu history. Dinner at a fine-dining restaurant overlooking the ocean.',
      },
      {
        day: 'Day 03',
        title: 'Okinawan Culture & Island Luxury',
        text: 'Explore Shurijo Castle Park and its Ryukyu Kingdom history, then Okinawa World’s Gyokusendo Cave and a traditional Eisa performance. The day closes with a private sunset dinner by the sea.',
      },
      {
        day: 'Day 04',
        title: 'Okinawa to Tokyo',
        text: 'Check out and fly from Naha to Tokyo Haneda, checking in for two nights in the capital.',
      },
      {
        day: 'Day 05',
        title: 'Tokyo Heritage & Culinary Experience',
        text: 'Visit Meiji Shrine, wander Harajuku and Omotesando, and explore Asakusa’s Sensoji Temple and Nakamise Street, before an evening omakase sushi dinner.',
      },
      {
        day: 'Day 06',
        title: 'Tokyo to Hakone — Mount Fuji & Onsen',
        text: 'A private vehicle transfer to Hakone, taking in a Lake Ashi cruise and the Hakone Open-Air Museum en route. Check in to a luxury ryokan for a traditional kaiseki dinner.',
      },
      {
        day: 'Day 07',
        title: 'Hakone to Nagano — Journey to Snow Country',
        text: 'Depart Hakone for Nagano, visiting the historic Zenkoji Temple on arrival. Check in to a second luxury ryokan for another kaiseki dinner.',
      },
      {
        day: 'Day 08',
        title: 'Snow Monkeys of Jigokudani',
        text: 'One of Japan’s most iconic winter moments: a snow-covered forest walk through Jigokudani Monkey Park to watch wild Japanese macaques bathing in the hot springs, followed by a local sake brewery visit and an evening onsen.',
        image: img('photo-1621602071737-e267c09db65e'),
        imageAlt: 'A Japanese macaque (snow monkey) in Nagano',
      },
      {
        day: 'Day 09',
        title: 'Nagano to Sapporo',
        text: 'Transfer to the airport for a flight to Sapporo’s New Chitose Airport, checking in for four nights in Hokkaido’s capital.',
      },
      {
        day: 'Day 10',
        title: 'Sapporo Snow Festival',
        text: 'Sightseeing through the world-famous Snow Festival at Odori Park and the Susukino Ice Sculpture Area, a visit to the Hokkaido Museum, and an evening beneath the festival’s snow illuminations.',
      },
      {
        day: 'Day 11',
        title: 'Otaru’s Romantic Winter Canal',
        text: 'Depart Sapporo for the historic Otaru Canal, with a glass workshop and the Music Box Museum, before returning to Sapporo for a seafood dinner.',
      },
      {
        day: 'Day 12',
        title: 'Exclusive Hokkaido Experience',
        text: 'A choice of premium activities — a private snowmobile adventure, a horse sleigh experience, a day trip to the Niseko luxury resort, or a whisky distillery visit.',
      },
      {
        day: 'Day 13',
        title: 'Leisure Day & Farewell Dinner',
        text: 'A flexible day for shopping, spa, a private cooking class or a photography tour, closing with a farewell dinner of Hokkaido crab, seasonal seafood and premium Japanese beef.',
      },
      {
        day: 'Day 14',
        title: 'Departure',
        text: 'A private transfer to New Chitose Airport for your onward flight.',
      },
    ],
    inclusions: [
      'Private English-speaking guide throughout, with private transportation',
      'Luxury beachfront resort in Okinawa, 5★ hotels in Tokyo & Sapporo, and luxury ryokan stays in Hakone & Nagano',
      'Cherry blossom viewing at Mt Yaedake and the Nakijin Castle Ruins, Okinawa',
      'Snow Monkey Park (Jigokudani) and a Nagano sake brewery visit',
      'Sapporo Snow Festival, including the Susukino ice sculpture area and evening illuminations',
      'Kaiseki dinners at both ryokan stays, an omakase sushi dinner in Tokyo, and a Hokkaido crab farewell dinner',
      'Choice of a private snowmobile, horse sleigh, Niseko day trip or whisky distillery experience in Hokkaido',
    ],
    rates: {
      note: 'Message our concierge on WhatsApp for current rates, hotel options and availability for this departure.',
      rows: [],
    },
  },
  'dubai-from-above': {
    edition: 'The November 2026 Edition',
    title: 'Dubai from Above — City, Desert & Sea',
    location: 'Dubai · United Arab Emirates',
    duration: '05 Nights / 06 Days',
    heroImage: img('photo-1523816572-a1a23d1a67b8', 2400),
    overview:
      'Dubai at every altitude — a private city tour through old Bastakiya and the souqs, dinner aboard the largest mega-yacht on the marina, an interactive dive into the Museum of the Future, dune bashing and a Bedouin camp at sunset, and a helicopter ride over the skyline that gives this edition its name.',
    facts: [
      { label: 'Duration', value: '05 Nights / 06 Days' },
      { label: 'Highlights', value: 'City Tour · Yacht Dinner Cruise · Museum of the Future · Desert Safari · Helicopter Ride' },
      { label: 'Meal Plan', value: 'Daily breakfast, plus dinner on the yacht cruise and at the desert camp' },
      { label: 'Validity', value: 'November 2026' },
    ],
    days: [
      {
        day: 'Day 01',
        title: 'Arrival in Dubai',
        text: 'Arrive at Dubai International Airport, where an English-speaking driver meets you for a private transfer to your hotel. The rest of the day is free at leisure.',
      },
      {
        day: 'Day 02',
        title: 'Dubai City Tour & Yacht Dinner Cruise',
        text: 'A half-day private city tour through old Dubai — Zabeel Palace and the Dubai Frame (photo stops), one of the historic houses of Bastakiya, an abra ride across Dubai Creek, the Spice and Gold Souqs, and the Islamic Art Centre. In the evening, board the Lotus Royal Dinner Cruise — the largest mega-yacht in Dubai — for dinner, soft drinks and live entertainment on the water.',
        image: img('photo-1590264539175-39df72442833'),
        imageAlt: 'Dubai Marina skyline reflected in the water at night',
      },
      {
        day: 'Day 03',
        title: 'Museum of the Future & Desert Safari',
        text: 'Visit the Museum of the Future, an interactive, hands-on look at tomorrow unlike any other museum. In the afternoon, head into the dunes on a private-jeep desert safari — dune bashing, sandboarding, a camel ride and henna painting — ending at a Deluxe Desert Camp for a live-BBQ buffet, Tanoura and fire shows and belly dancing under the stars.',
        image: img('photo-1569670380585-19bb0feec807'),
        imageAlt: 'A 4x4 dune bashing through the Dubai desert at sunset',
      },
      {
        day: 'Day 04',
        title: 'Helicopter Ride',
        text: 'A free morning at your own pace, before an afternoon iconic helicopter tour over the Dubai skyline (approximately 12 minutes, shared basis — private and extended flights available on request).',
      },
      {
        day: 'Day 05',
        title: 'Free Day',
        text: 'A day at leisure to explore Dubai at your own pace.',
      },
      {
        day: 'Day 06',
        title: 'Departure',
        text: 'Check out from your hotel as per standard checkout timings, and transfer privately to Dubai International Airport for your onward flight.',
      },
    ],
    inclusions: [
      'Private airport and touring transfers throughout',
      'Half-day private Dubai City Tour — Zabeel Palace, Dubai Frame, Bastakiya, an abra ride across Dubai Creek, the Spice & Gold Souqs and the Islamic Art Centre',
      'Lotus Royal Dinner Cruise — Dubai’s largest mega-yacht, with dinner, soft drinks and live entertainment',
      'Museum of the Future entrance ticket',
      'Private-jeep Desert Safari — dune bashing, sandboarding, camel ride, henna painting, Tanoura and fire shows, and a live-BBQ buffet dinner',
      '12-minute iconic Helicopter Tour over the Dubai skyline (sharing basis)',
    ],
    rates: {
      note: 'Message our concierge on WhatsApp for current rates, hotel options and availability for this departure.',
      rows: [],
    },
  },
  'christmas-markets': {
    edition: 'The December 2026 Edition',
    title: 'Christmas Markets of Dresden, Prague, Bratislava & Vienna',
    location: 'Dresden · Prague · Bratislava · Vienna',
    duration: '10 Nights / 11 Days',
    heroImage: img('photo-1544212415-85fec3f52087', 2400),
    overview:
      'Four countries and four of Europe’s most beloved Christmas markets in one festive journey — Germany’s oldest market in Dresden, the fairy-tale squares of Prague, a food-focused evening in Bratislava, and Vienna’s grand finale beneath the Rathaus and Schönbrunn Palace.',
    facts: [
      { label: 'Duration', value: '10 Nights / 11 Days' },
      { label: 'Route', value: 'Dresden (2 nights) · Prague (3 nights) · Bratislava (1 night) · Vienna (4 nights)' },
      { label: 'Meal Plan', value: 'Daily breakfast throughout' },
      { label: 'Travel', value: 'First-class train travel between each city' },
      { label: 'Validity', value: 'December 2026' },
    ],
    days: [
      {
        day: 'Day 01',
        title: 'Arrival in Dresden',
        text: 'Arrive in Dresden and transfer privately to your hotel for check-in. Relax the rest of the evening. Overnight in Dresden.',
      },
      {
        day: 'Day 02',
        title: 'Dresden’s Old Town & the Striezelmarkt',
        text: 'A small-group guided walking tour through Dresden’s historic Old Town, taking in the Frauenkirche, Neumarkt, the Fürstenzug, Dresden Castle, the Zwinger and the Semperoper. In the evening, explore the Striezelmarkt — Germany’s oldest Christmas market — for traditional festive stalls, handcrafted gifts and seasonal treats. Overnight in Dresden.',
      },
      {
        day: 'Day 03',
        title: 'Onward to Prague',
        text: 'Check out and travel by first-class train to Prague (approx. 2h 15m). Check in to your hotel, then spend the evening at leisure exploring the Old Town Square and Wenceslas Square Christmas markets. Overnight in Prague.',
      },
      {
        day: 'Day 04',
        title: 'Prague — Old Town, Jewish Quarter & Charles Bridge',
        text: 'A guided tour through Wenceslas Square, the Old Town Hall’s Astronomical Clock, the Church of Our Lady before Týn, the Powder Tower, the Jewish Quarter and the Old-New Synagogue, finishing on the iconic Charles Bridge. Overnight in Prague.',
        image: img('photo-1650099077872-9b384deb8fe3'),
        imageAlt: 'A Christmas tree before the Church of Our Lady before Týn, Prague',
      },
      {
        day: 'Day 05',
        title: 'Prague’s Christmas Markets with Locals',
        text: 'A small-group tour through some of Prague’s most enchanting Christmas markets, sampling seasonal treats and handcrafted gifts as you soak up the city’s festive traditions. Overnight in Prague.',
      },
      {
        day: 'Day 06',
        title: 'Onward to Bratislava',
        text: 'Check out and travel by first-class train to Bratislava (approx. 4h 25m). After check-in, a guided walk past St Martin’s Cathedral, the Old Town Hall and Bratislava Castle, followed by a Christmas Market Food Tour at Hviezdoslavovo námestie, sampling traditional Slovak specialities. Overnight in Bratislava.',
      },
      {
        day: 'Day 07',
        title: 'Onward to Vienna',
        text: 'Check out and travel by first-class train to Vienna (approx. 56 minutes). Check in to your hotel and relax the rest of the evening. Overnight in Vienna.',
      },
      {
        day: 'Day 08',
        title: 'Vienna City Centre',
        text: 'A guided walking tour of Vienna’s highlights — the Hofburg, Heldenplatz, the Spanish Riding School, the State Opera and Stephansdom — followed by an evening at the Vienna Christmas World at Rathausplatz and the Maria-Theresien-Platz Christmas Village. Overnight in Vienna.',
      },
      {
        day: 'Day 09',
        title: 'Schönbrunn Palace & Christmas Market',
        text: 'A guided tour of Schönbrunn Palace and its gardens with skip-the-line access, followed by the Schönbrunn Christmas Market in the palace courtyard — decorated stalls, traditional Austrian handicrafts, seasonal treats and mulled wine beneath the palace facade. Overnight in Vienna.',
      },
      {
        day: 'Day 10',
        title: 'Vienna at Leisure',
        text: 'A free day to explore more of Vienna’s markets at your own pace — the famous Rathausplatz, the Maria-Theresien-Platz Christmas Village, or the more intimate, artisan Spittelberg Christmas Market. Overnight in Vienna.',
      },
      {
        day: 'Day 11',
        title: 'Departure',
        text: 'After breakfast, check out and transfer privately to Vienna Airport for your onward flight.',
      },
    ],
    inclusions: [
      '10 nights’ 4★ accommodation with daily breakfast (Dresden, Prague, Bratislava & Vienna)',
      'First-class train travel between all four cities',
      'Guided walking tours of Dresden, Prague (Old Town, Jewish Quarter & Charles Bridge) and Vienna',
      'Small-group Christmas market tour in Prague, and a Christmas Market Food Tour in Bratislava',
      'Schönbrunn Palace guided tour with skip-the-line access',
      'Entry to the Striezelmarkt, Old Town Square, Hviezdoslav Square, Rathausplatz and Schönbrunn Christmas markets',
    ],
    rates: {
      note: 'Message our concierge on WhatsApp for current rates, hotel options and availability for this departure.',
      rows: [],
    },
  },
}
