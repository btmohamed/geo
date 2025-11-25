# Quick Reference Card

## Common Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Test production build locally
npm start

# Deploy to Vercel
vercel --prod

# Clean everything
rm -rf node_modules .next && npm install
```

## File Locations

```
Code:
  app/page.tsx           - Main app logic
  components/            - UI components
  lib/fractals.ts        - Tree algorithm
  lib/store.ts           - State management

Docs:
  HANDOFF.md            - Start here
  LAUNCH_CHECKLIST.md   - Step-by-step
  TROUBLESHOOTING.md    - Fix issues
  DEPLOY.md             - Deployment
```

## URLs

```
Local:     http://localhost:3000
Prod:      [your-vercel-url]
Docs:      /mnt/user-data/outputs/
```

## Key State Values

```typescript
angle: 5-60        (branch angle in degrees)
scaleFactor: 0.5-0.9  (size reduction per iteration)
depth: 5-15        (recursion depth)
color: #RRGGBB     (start color)
colorEnd: #RRGGBB  (end color)
```

## URL Format

```
?a=25.0&s=0.70&d=10&c=39FF14&c2=FF4500
```

## Design System

```css
Colors:
  --bg-primary: #050505      (deep black)
  --accent: #39FF14          (electric lime)
  --highlight: #FF4500       (orange)

Fonts:
  Headings: JetBrains Mono
  Body: Geist Sans

Effects:
  Glow: 0 0 20px rgba(57, 255, 20, 0.6)
  Scanlines: 4px repeating gradient
```

## Component Tree

```
page.tsx
├── Intro (if showIntro)
└── Main App
    ├── Header (title)
    ├── FractalCanvas
    ├── Controls (sliders)
    └── ShareButton
```

## State Flow

```
User drags slider
  → Store updates (Zustand)
    → Canvas subscribes
      → Renders new fractal
        → Smooth 60fps
```

## Launch Tweet

```
i built a tool that makes fractals

accidentally learned more about recursion 
in 10 minutes than i did in CS classes

try it: [url]

[attach GIF]
```

Post: Tue-Thu, 9-11am PT

## Week 1 Metrics

```
Minimum:  100 visitors, 10 shares
Good:     1000 visitors, 50 shares  
Great:    5000+ visitors, trending
```

## Common Issues

```
Intro won't show:
  Clear localStorage in DevTools

Share won't copy:
  Needs HTTPS (works on localhost + production)

Canvas blank:
  Check console, verify canvas ref

Build fails:
  npm run build to see errors
```

## Emergency Commands

```bash
# Hard reset
rm -rf node_modules .next
npm install
npm run dev

# Clear caches
Cmd+Shift+R (hard refresh)
Clear Application → Storage → Clear

# Revert deploy
vercel rollback
```

## Phase Triggers

```
Phase 2:
  ✓ 1000+ visitors
  ✓ 50+ shares
  ✓ Clear demand
  ✓ Performance solid

Phase 3:
  ✓ Phase 2 complete
  ✓ Sustained growth
  ✓ Feature requests
```

## Don't Do List

```
❌ Add features before feedback
❌ Refactor working code
❌ Ignore user feedback
❌ Overcomplicate
❌ Build backend too soon
```

## Do List

```
✅ Ship fast
✅ Test thoroughly
✅ Respond to feedback
✅ Fix bugs quickly
✅ Document learnings
```

## Success Checklist

```
Pre-launch:
  □ Icons created
  □ Tested on 3+ browsers
  □ Mobile works
  □ Build succeeds
  □ GIF recorded

Launch:
  □ Deployed to Vercel
  □ Production tested
  □ Tweet posted
  □ HN posted
  □ Monitoring analytics

Post-launch:
  □ Respond to feedback
  □ Fix critical bugs
  □ Document requests
  □ Track metrics
```

## Key Files to Edit

```
Fractal algorithm:
  lib/fractals.ts

Control ranges:
  components/Controls.tsx

Intro text:
  components/Intro.tsx

Colors/design:
  app/globals.css

Metadata:
  app/layout.tsx
```

## Testing Shortcuts

```
Test intro:
  Clear localStorage → Reload

Test share:
  Click share → Paste URL → Verify params

Test mobile:
  Chrome DevTools → Toggle device

Test performance:
  DevTools → Performance → Record
```

## Contact Points

```
Next.js:    https://nextjs.org/docs
Vercel:     https://vercel.com/docs
Canvas:     https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
Zustand:    https://github.com/pmndrs/zustand
```

## Reminder

```
The code works.
The design is good.
The UX is smooth.

Stop reading docs.
Start deploying.
```

---

Print this. Keep it handy. Reference daily.
