# Friendship Room

Published private preview: https://evora-friendship-room.breathtakingginger.chatgpt.site

The source.zip archive contains the complete app source and database migrations, with no messages, user records, credentials or dependency directory.

Features: blue-and-green Frutiger Aero interface, nickname and companion selection, lounge/sunroom/garden chat channels, shared persisted messages, live presence and typing indicators, mood selection, a wave button, optional message chimes and mobile layout.

Chat and presence poll the shared server every 2.5 seconds. Messages persist in D1. User input is rendered as text, room profiles are tied to the platform-authenticated visitor and do not require application cookies, write requests check origin and authenticated identity, and sending is rate limited. Signed-in visitors can join once you grant them access through the Site's sharing controls. The current preview is owner-private.

Validation: backend tests passed for two-visitor message exchange, persistent reads, room separation, presence, typing, session ownership, invalid input, rate limiting and leaving. Production publication succeeded, its DB tables exist, assets return HTTP 200 and anonymous chat reads return HTTP 401. DOM interaction tests also verify cookie-free joining, sending after joining, visible confirmation errors, close controls, and top-level back links. Managed browser QA was unavailable.

Local commands: npm install, npm test, npm run build. The deployment targets a Cloudflare Worker with a D1 binding named DB. The tracked .openai/hosting.json identifies the existing Site; preserve that identity for updates. Apply generated schema migrations through the Sites publishing workflow. Never use browser-local storage as shared chat persistence.
