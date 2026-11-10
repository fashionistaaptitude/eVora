# eVora · a little place to be

Private preview: https://evora-friendship-room.breathtakingginger.chatgpt.site

This iteration turns the Friendship Room into a connected environment. The persistent headboard contains the visitor profile and four destinations:
- Arrival: an open-air glass crossing with links into the other spaces.
- Friendship Room: a glass-roofed lounge above water, with a sofa, window seat and waterside seat.
- Sunroom: a bright greenhouse with a warm chair, glass table, cushion and breeze control.
- Garden: a pond, trees, stepping stones, bench and stone-ripple interaction.

Each destination has its own complete SVG panorama. Navigation uses the headboard, in-scene links, destination map, return links and browser history. Profile and presence persist while moving between spaces. A visitor may explore before creating a nickname.

Chat opens in a small Aero window inside the current destination. Shared messages persist in D1 and are separated by room. Shared presence records where a visitor is seated; other visitors see their companion in that space. The profile editor supports nickname, companion and mood. Ambient sound is optional and off by default.

The site remains owner-private. Grant access through Sites sharing before inviting friends.

## Source and local checks

source.zip contains the complete authored source, migrations and lockfile, without credentials, chat records, dependencies or build output.

Commands: npm install, npm run build, npm test. Run the build before the artifact tests. The Cloudflare Worker uses a D1 binding named DB. Preserve the existing Site identity in .openai/hosting.json and apply append-only Drizzle migrations through Sites publishing.

Five checks passed, including the complete journey through all four destinations, cookie-free joining, shared seats, profile continuity, room-specific chat, return navigation and browser Back, error handling, backend persistence and built scene assets. These include DOM interaction tests and real SQLite-backed API tests. Visual browser QA was unavailable in the managed environment.

The original blue-and-green Shopify theme remains in place and links to this experience.
