# Fractal Lab Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (Client)                        │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    Next.js App                         │ │
│  │                                                         │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │ │
│  │  │  Intro   │  │  Canvas  │  │ Controls │            │ │
│  │  │Component │  │Component │  │Component │            │ │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘            │ │
│  │       │             │             │                    │ │
│  │       └─────────────┴─────────────┘                   │ │
│  │                     │                                  │ │
│  │              ┌──────▼───────┐                         │ │
│  │              │ Zustand Store │                        │ │
│  │              │ (State Mgmt)  │                        │ │
│  │              └──────┬────────┘                        │ │
│  │                     │                                  │ │
│  │         ┌───────────┼───────────┐                    │ │
│  │         │           │           │                     │ │
│  │    ┌────▼────┐ ┌───▼────┐ ┌───▼────┐               │ │
│  │    │ Canvas  │ │ Local  │ │  URL   │               │ │
│  │    │   API   │ │Storage │ │ Params │               │ │
│  │    └─────────┘ └────────┘ └────────┘               │ │
│  │                                                       │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App (page.tsx)
│
├─ Intro Component (conditional)
│  ├─ Click handlers
│  ├─ Point plotting
│  ├─ Line drawing
│  └─ localStorage check
│
└─ Main App (after intro)
   │
   ├─ Header
   │  └─ Title + tagline
   │
   ├─ FractalCanvas
   │  ├─ Canvas element
   │  ├─ Resize handler
   │  └─ Render loop
   │
   ├─ Controls
   │  ├─ Angle slider
   │  ├─ Scale slider
   │  ├─ Depth slider
   │  └─ Color pickers
   │
   └─ ShareButton
      ├─ URL encoder
      └─ Clipboard API
```

## Data Flow

```
User Action
    │
    ▼
Component Event Handler
    │
    ▼
Zustand Store Update
    │
    ├──────────────────┐
    │                  │
    ▼                  ▼
Canvas Rerender    URL Update
    │                  │
    ▼                  ▼
New Fractal       Share Link
```

## State Management

```
┌─────────────────────────┐
│   Zustand Store         │
├─────────────────────────┤
│ angle: number           │
│ scaleFactor: number     │
│ depth: number           │
│ color: string           │
│ colorEnd: string        │
│ showIntro: boolean      │
├─────────────────────────┤
│ setAngle()              │
│ setScaleFactor()        │
│ setDepth()              │
│ setColor()              │
│ setColorEnd()           │
│ completeIntro()         │
│ loadFromParams()        │
│ getShareURL()           │
└─────────────────────────┘
         │
         │ Subscribe
         │
    ┌────┴────┬────────────┬───────────┐
    │         │            │           │
    ▼         ▼            ▼           ▼
Canvas    Controls    ShareButton   Intro
```

## Rendering Pipeline

```
State Change
    │
    ▼
useEffect Trigger
    │
    ▼
renderFractalTree()
    │
    ├─ Clear canvas
    │
    ├─ Calculate start position
    │
    ├─ Call drawFractalTree()
    │  │
    │  ├─ Draw line
    │  │
    │  ├─ Calculate branches
    │  │
    │  ├─ Recursive call (left)
    │  │
    │  └─ Recursive call (right)
    │
    └─ Complete render
        │
        ▼
    Display to user (60fps)
```

## URL Encoding

```
User clicks "Share"
    │
    ▼
getShareURL()
    │
    ├─ Read current state
    │
    ├─ Create URLSearchParams
    │  │
    │  ├─ a = angle
    │  ├─ s = scaleFactor
    │  ├─ d = depth
    │  ├─ c = color (no #)
    │  └─ c2 = colorEnd (no #)
    │
    ├─ Build full URL
    │
    └─ Copy to clipboard
        │
        ▼
User shares → Other user loads
    │
    ▼
loadFromParams()
    │
    ├─ Parse URL params
    │
    ├─ Update store
    │
    └─ Skip intro
        │
        ▼
Exact fractal loads
```

## Intro Sequence

```
User lands
    │
    ▼
Check localStorage
    │
    ├─ Has 'hasSeenIntro'?
    │  │
    │  ├─ Yes → Skip intro
    │  │
    │  └─ No → Show intro
    │     │
    │     ├─ Show dot
    │     │
    │     ├─ Wait for click
    │     │
    │     ├─ Plot point
    │     │
    │     ├─ Wait for 2 more
    │     │
    │     ├─ Draw lines
    │     │
    │     ├─ Show message
    │     │
    │     ├─ Set localStorage
    │     │
    │     └─ Advance to app
    │
    ▼
Main app loads
```

## File Dependencies

```
page.tsx
  │
  ├─→ Intro.tsx
  │     └─→ framer-motion
  │
  ├─→ FractalCanvas.tsx
  │     ├─→ store.ts
  │     └─→ fractals.ts
  │
  ├─→ Controls.tsx
  │     ├─→ store.ts
  │     └─→ framer-motion
  │
  ├─→ ShareButton.tsx
  │     ├─→ store.ts
  │     └─→ framer-motion
  │
  └─→ store.ts
        └─→ zustand

fractals.ts
  └─→ Canvas API

globals.css
  └─→ Tailwind

layout.tsx
  ├─→ globals.css
  └─→ manifest.json
```

## Performance Flow

```
Frame (16.67ms for 60fps)
    │
    ├─ State update (~0.1ms)
    │
    ├─ Canvas clear (~0.5ms)
    │
    ├─ Fractal render (~10-15ms)
    │  │
    │  ├─ Depth 5:  ~1ms
    │  ├─ Depth 10: ~10ms
    │  └─ Depth 15: ~50ms (may drop frames)
    │
    └─ Browser paint (~1ms)

Target: Stay under 16ms for 60fps
Actual: Usually 10-12ms (good)
```

## Deployment Architecture

```
Developer
    │
    ├─ npm run build
    │     │
    │     ├─ TypeScript compile
    │     ├─ Next.js optimize
    │     └─ Bundle assets
    │
    ├─ vercel --prod
    │
    ▼
Vercel Edge Network
    │
    ├─ CDN (static assets)
    ├─ Edge Functions (SSR)
    └─ Analytics
        │
        ▼
    User's Browser
        │
        ├─ HTML loads
        ├─ JS hydrates
        ├─ React renders
        └─ Canvas draws
```

## User Journey

```
Discovery
    │
    ├─ Twitter
    ├─ HackerNews
    └─ Reddit
        │
        ▼
    Landing
        │
        ├─ See intro or shared fractal
        │
        ▼
    Interaction
        │
        ├─ Drag sliders
        ├─ Change colors
        └─ Create fractal
            │
            ▼
        Share
            │
            ├─ Click share button
            ├─ URL copied
            └─ Post on social
                │
                ▼
            Viral Loop
                │
                └─ New users discover
```

## Security Model

```
Browser Sandbox
    │
    ├─ No server requests
    ├─ No user data stored (except localStorage)
    ├─ No authentication
    ├─ No database
    └─ Pure client-side
        │
        ▼
    Safe by default
```

## Future Architecture (Phase 2+)

```
Current (Phase 1)
    Client Only

Phase 2
    Client + Gallery API
    │
    └─ Store shared fractals

Phase 3
    Client + API + Database
    │
    ├─ User accounts
    ├─ Saved fractals
    └─ Comments/likes

Phase 4
    Full Platform
    │
    ├─ Multiple fractal types
    ├─ Community features
    ├─ Educational content
    └─ Code export
```

## Technology Decisions

```
Why Next.js?
    ├─ Fast development
    ├─ Great performance
    ├─ Easy deployment
    └─ Good DX

Why Canvas API?
    ├─ Fast enough
    ├─ Simple
    └─ Can upgrade to WebGL later

Why Zustand?
    ├─ Minimal boilerplate
    ├─ Fast
    └─ Easy to understand

Why No Backend?
    ├─ Faster to ship
    ├─ Lower cost
    └─ Simpler to maintain
```

---

This architecture supports:
- Fast initial load
- Smooth interactions
- Easy sharing
- Simple deployment
- Future expansion
