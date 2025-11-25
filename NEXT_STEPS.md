# Your Next Actions (Phase 1)

## Immediate (Today)

### 1. Create Icon Files
You need two files for PWA:
- `public/icon-192.png` (192x192)
- `public/icon-512.png` (512x512)

**Quick option**: Use a fractal tree screenshot, crop to square, resize.

**Better option**: Design a simple logo
- Electric lime (#39FF14) fractal tree on black
- Minimal, recognizable at small sizes
- Use Figma or export from canvas

### 2. Test Locally
```bash
npm install
npm run dev
```

Test checklist:
- [ ] Intro plays (click 3 times)
- [ ] Can skip intro
- [ ] All sliders work smoothly
- [ ] Colors change in real-time
- [ ] Share button copies URL
- [ ] Shared URL loads with params
- [ ] No console errors

### 3. Fix Any Issues
Common problems to check:
- Font loading (Geist Sans may need fallback)
- Canvas sizing on your screen
- Mobile responsiveness
- Performance on your machine

## This Week

### Day 1-2: Polish & Test
- Create icons
- Test on multiple browsers
- Test on phone (use your local IP)
- Verify PWA install works
- Record screen for GIF

### Day 3-4: Deploy
- Build production version
- Deploy to Vercel
- Test production URL
- Verify share links work
- Get 3 friends to test

### Day 5-6: Launch Content
- Create GIF (30sec max)
- Draft tweet (see DEPLOY.md)
- Prepare HN post
- Write Reddit post
- Screenshot best fractals

### Day 7: Launch
- Tweet at optimal time
- Post on HN
- Post on r/programming
- Share in communities
- Monitor responses

## Week 2: Gather Feedback

### Watch For
- Bug reports
- Performance complaints
- Feature requests
- Share URL failures
- Mobile issues

### Quick Wins to Add
Based on early feedback, prioritize:
- Gallery (if people are sharing a lot)
- Mobile optimization (if mobile traffic is high)
- More fractals (if people exhaust the tree)
- Export options (if devs ask for code)

## Code Quality Tasks (Optional)

### If You Have Time
- [ ] Add error boundaries
- [ ] Add loading states
- [ ] Add keyboard shortcuts
- [ ] Optimize canvas for retina
- [ ] Add service worker
- [ ] Add analytics (optional)
- [ ] Add meta image for social

### Technical Debt to Consider
- Canvas re-renders on every param change (could throttle)
- No Web Workers (fine for now)
- No WebGL (only needed if you add complex fractals)
- No server (don't need it yet)

## Don't Build Yet

### Resist Adding These Now
- Gallery (need backend or external service)
- Accounts/login (not needed yet)
- Multiple fractal types (one is enough to validate)
- Advanced math explanations (wait for feedback)
- Code editor (too complex for MVP)

Ship first. Iterate based on real usage.

## Success Signals

### Green Lights (Add Features)
- Consistent daily traffic after launch
- People sharing without prompting
- Feature requests from multiple users
- Someone blogs about it

### Yellow Lights (Fix Issues)
- Bounce rate >70%
- No shares after first day
- Performance complaints
- Mobile doesn't work

### Red Lights (Pivot)
- No one uses it after week 1
- Can't get past 100 visitors
- Fundamental UX problems
- People confused by UI

## Phase 2 Trigger

Move to Phase 2 (gallery, more fractals) when:
1. 1000+ unique visitors
2. 50+ share URL clicks
3. Sustained interest (not just launch spike)
4. Clear feature requests emerging

Until then: promote, gather feedback, fix bugs.

## Questions to Ask Yourself

After launch, weekly check:
- Are people actually using this?
- What are they making?
- Where are they sharing it?
- What features keep getting requested?
- Is performance acceptable?
- What's the biggest friction point?

Answer these before building Phase 2.

## Resources

- README.md - Full project overview
- DEPLOY.md - Deployment guide
- write.txt - Writing style guide
- looks.md - Visual design principles

## Getting Help

If you get stuck:
- Next.js docs: https://nextjs.org/docs
- Vercel deployment: https://vercel.com/docs
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- Framer Motion: https://www.framer.com/motion/

## Accountability

Set a launch date and stick to it. Done is better than perfect.

Target: Launch within 7 days from now.

No new features before launch. Just test, deploy, tweet.
