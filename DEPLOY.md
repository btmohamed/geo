# Quick Deployment Guide

## Local Testing

```bash
cd fractal-lab
npm install
npm run dev
```

Test on: http://localhost:3000

## Deploy to Vercel (Recommended)

### First Time Setup
```bash
npm i -g vercel
vercel login
```

### Deploy
```bash
npm run build  # Test build locally first
vercel --prod
```

Your URL will be: `fractal-lab.vercel.app` (or custom domain)

### Environment Setup
No environment variables needed for Phase 1.

## Pre-Launch Testing

### Desktop
1. Open in Chrome/Firefox/Safari
2. Test all sliders
3. Click share, verify URL copies
4. Reload with shared URL, verify params load
5. Check intro sequence (clear localStorage to retry)

### Mobile
1. Open on iPhone/Android
2. Test touch controls
3. Try PWA install (Add to Home Screen)
4. Verify performance is smooth

### Performance Check
1. Open DevTools
2. Check FPS (should be 60)
3. Test with depth=15, verify no lag
4. Mobile: test on mid-range device

## Launch Checklist

- [ ] Deployed to production
- [ ] Custom domain (optional but recommended)
- [ ] Tested on 3+ devices
- [ ] Screenshot/GIF ready for tweet
- [ ] Tweet drafted
- [ ] Posted on Twitter
- [ ] Posted on r/programming
- [ ] Posted on HackerNews
- [ ] Shared in Discord/Slack

## Tweet Template

```
i built a tool that makes fractals

accidentally learned more about recursion in 10 minutes 
than i did in CS classes

try it: https://fractal-lab.vercel.app

[attach GIF of slider morphing tree]
```

**Best time to post**: Tuesday-Thursday, 9-11am PT

## Monitoring Post-Launch

### Day 1-3
- Watch for bug reports
- Monitor performance issues
- Respond to feedback quickly

### Week 1
- Track share URL patterns
- Note which params people use most
- Collect feature requests

### Week 2
- Decide on Phase 2 priorities based on data
- Plan gallery implementation

## Quick Fixes If Needed

### If site is slow:
- Reduce default depth to 8
- Add render throttling
- Check Vercel analytics

### If shares don't work:
- Verify clipboard API (needs HTTPS)
- Check URL encoding logic
- Test on different browsers

### If mobile is janky:
- Reduce canvas resolution
- Limit max depth on mobile
- Add touch optimization

## Success Metrics

### Week 1 Goals
- 1000+ unique visitors
- 100+ shares
- 50+ upvotes on HN or Reddit
- 10+ dev tweets about it

### Week 2 Goals
- Sustained traffic (not just launch spike)
- People sharing without prompting
- Feature requests appearing
- Potential contributors

## Next Steps After Launch

See README.md for Phase 2-4 plans.

Focus: iterate based on actual user behavior, not assumptions.
