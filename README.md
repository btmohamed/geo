# Fractal Lab

Create beautiful fractals through interactive math. Built for virality on Twitter.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What You Have (Phase 1 MVP)

### Features ✅
- **Intro sequence**: Interactive dot plotting that teaches coordinates
- **Fractal tree rendering**: Real-time canvas drawing with smooth performance
- **3 core controls**: Angle, scale, depth
- **Color gradient**: Start/end color picker
- **Share functionality**: URL encoding, clipboard copy
- **PWA ready**: Manifest configured, works on mobile

### Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Zustand (state management)
- Framer Motion (animations)
- Canvas API (rendering)
- Tailwind CSS

### Design System
- **Color**: Electric lime (#39FF14) on deep black (#050505)
- **Typography**: JetBrains Mono + Geist Sans
- **Aesthetic**: Terminal/oscilloscope with scanlines
- **Motion**: Staggered reveals, smooth transitions
- **Performance**: 60fps target

## File Structure

```
fractal-lab/
├── app/
│   ├── globals.css       # Design system, CSS variables
│   ├── layout.tsx         # Metadata, PWA config
│   └── page.tsx           # Main app logic
├── components/
│   ├── FractalCanvas.tsx  # Canvas rendering
│   ├── Controls.tsx       # Slider UI
│   ├── ShareButton.tsx    # Copy URL functionality
│   └── Intro.tsx          # Onboarding sequence
├── lib/
│   ├── fractals.ts        # Tree algorithm
│   ├── store.ts           # Zustand state
│   └── utils.ts           # Helpers
└── public/
    └── manifest.json      # PWA config
```

## Phase 1 Checklist (Week 1-2)

- [x] Project setup
- [x] Canvas rendering pipeline
- [x] Branching tree algorithm
- [x] Real-time slider controls
- [x] Color gradient system
- [x] URL parameter encoding
- [x] Share/copy functionality
- [x] Intro sequence
- [x] PWA manifest
- [ ] **Deploy to Vercel**
- [ ] **Test on mobile**
- [ ] **Launch tweet**

## Deployment

```bash
# Deploy to Vercel
npm run build
vercel --prod
```

### Pre-launch Checklist
1. Test on iPhone/Android
2. Verify share URLs work
3. Check performance (should be 60fps)
4. Test intro skip functionality
5. Verify PWA install prompt

## Launch Strategy

### Initial Tweet Template
```
i built a tool that makes fractals

accidentally learned more about recursion in 10 minutes 
than i did in CS classes

try it: [your-url]
```

**Include**: 
- GIF/video of slider drag → tree morphing
- Post Tuesday-Thursday, 9-11am PT

### Additional Platforms
- r/programming
- HackerNews (title: "Interactive Fractal Generator")
- Your Discord/Slack communities

## Phase 2 (Week 3) - After Launch

### Features to Add
- [ ] Gallery (last 100 shared creations)
- [ ] View counter on shares
- [ ] Second fractal type (spiral or Sierpinski)
- [ ] Mobile touch optimization
- [ ] Direct Twitter share button

## Phase 3 (Week 4-5) - Educational Depth

### Features to Add
- [ ] "What's happening" panel (collapsible)
- [ ] 2 more fractal types
- [ ] Advanced mode (grid, FPS counter)
- [ ] Preset buttons (golden ratio, Fibonacci, etc)

## Phase 4 (Week 6+) - Community

### Features to Add
- [ ] Featured creations
- [ ] Fork/remix functionality
- [ ] Weekly challenges
- [ ] Code export (JavaScript)
- [ ] Math deep dive tutorials

## Critical Success Factors

### Performance
- Load time < 1 second
- 60fps on mid-range hardware
- Instant interactivity

### User Experience
- First "wow" under 30 seconds
- Shareable result immediately
- No friction in flow

### Design Quality
- Distinctive aesthetic (not AI slop)
- Smooth animations
- Professional polish

## Known Issues / TODO

1. Need actual icon files (icon-192.png, icon-512.png)
2. Add service worker for offline support
3. Optimize canvas for retina displays
4. Add keyboard shortcuts (R to reset, etc)
5. Consider WebGL for complex fractals

## Performance Notes

Current implementation uses Canvas API for simplicity and speed to ship. If you add more complex fractals or higher iteration counts, consider:

- Throttling render calls
- Using requestAnimationFrame
- Switching to WebGL for GPU acceleration
- Web Workers for heavy computation

## Design Philosophy

### Writing Style (from write.txt)
- Simple language, short sentences
- Direct and concise
- No AI clichés ("dive into", "unleash")
- Natural tone, honest
- Focus on clarity

### Visual Style (from looks.md)
- Avoid generic fonts (Inter, Roboto)
- Commit to bold aesthetic
- Use animations for high-impact moments
- Create atmospheric backgrounds
- Distinctive, context-specific design

## Contributing

This is a solo project but feedback welcome. The goal is viral growth through dev → educator pipeline.

## License

MIT

---

**Next immediate action**: Deploy and tweet. Everything else is iteration based on feedback.
