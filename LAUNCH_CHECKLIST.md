# Launch Checklist

## Pre-Launch (Before Deploy)

### Assets
- [ ] Create icon-192.png (192x192 pixels)
- [ ] Create icon-512.png (512x512 pixels)
- [ ] Record demo GIF (30 seconds max)
- [ ] Take screenshots of best fractals
- [ ] Optional: Create og-image.png for social sharing

### Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test on iPhone
- [ ] Test on Android
- [ ] Test intro sequence (all 3 clicks)
- [ ] Test skip button
- [ ] Test all sliders
- [ ] Test color pickers
- [ ] Test share button
- [ ] Test shared URL loads correctly
- [ ] Verify no console errors
- [ ] Check performance (should be smooth)
- [ ] Test PWA install (Add to Home Screen)

### Code Quality
- [ ] Run `npm run build` successfully
- [ ] No TypeScript errors
- [ ] No broken imports
- [ ] Clean console (no warnings)
- [ ] Clear localStorage before testing

## Deploy Day

### Deployment
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `vercel --prod`
- [ ] Verify production URL works
- [ ] Test production on mobile
- [ ] Test share URLs work on production

### Post-Deploy Verification
- [ ] Homepage loads < 2 seconds
- [ ] Intro plays correctly
- [ ] Sliders work smoothly
- [ ] Share button copies URL
- [ ] Shared URLs preserve state
- [ ] Mobile is usable
- [ ] PWA manifest loads (check Network tab)
- [ ] No 404s (check Console)

## Launch Day

### Content Preparation
- [ ] Draft tweet (see template below)
- [ ] Prepare HackerNews title & description
- [ ] Write Reddit post
- [ ] Create Discord/Slack messages
- [ ] GIF uploaded and ready

### Tweet Template
```
i built a tool that makes fractals

accidentally learned more about recursion in 10 minutes 
than i did in CS classes

try it: [your-url]

[attach GIF]
```

### Launch Sequence
- [ ] Tweet at optimal time (Tue-Thu, 9-11am PT)
- [ ] Post on HackerNews (title: "Interactive Fractal Generator")
- [ ] Post on r/programming
- [ ] Share in 3+ Discord servers
- [ ] Share in 2+ Slack communities
- [ ] DM 5 dev friends to try it

### Monitoring (First 24 Hours)
- [ ] Check Vercel analytics
- [ ] Monitor Twitter replies
- [ ] Watch HN comments
- [ ] Check Reddit responses
- [ ] Respond to questions quickly
- [ ] Fix critical bugs ASAP
- [ ] Log feature requests (don't build yet)

## Week 1 Post-Launch

### Daily Tasks
- [ ] Check analytics
- [ ] Respond to feedback
- [ ] Fix critical bugs only
- [ ] Document feature requests
- [ ] Thank people who share it

### Data Collection
- [ ] Track unique visitors
- [ ] Count share button clicks
- [ ] Note most common params
- [ ] List bug reports
- [ ] Collect feature requests
- [ ] Identify traffic sources

### Success Metrics (Week 1)
- [ ] 100+ unique visitors
- [ ] 10+ shares
- [ ] 0 critical bugs
- [ ] Mobile works
- [ ] Sustained interest (not just spike)

## Week 2 Assessment

### Review Questions
- [ ] How many visitors total?
- [ ] How many came back?
- [ ] What's bounce rate?
- [ ] Which params are popular?
- [ ] What features requested most?
- [ ] Any performance issues?
- [ ] Mobile usage vs desktop?

### Decision Points
- [ ] If >1000 visitors → Build Phase 2
- [ ] If 100-1000 visitors → Keep promoting
- [ ] If <100 visitors → Analyze why, iterate
- [ ] If critical bugs → Fix before features

### Phase 2 Readiness
Move to Phase 2 only if:
- [ ] 1000+ unique visitors
- [ ] 50+ share clicks
- [ ] Clear demand for gallery
- [ ] Performance is solid
- [ ] No critical bugs

## Don't Do Before Week 2

- [ ] DON'T add new features
- [ ] DON'T refactor working code
- [ ] DON'T change design drastically
- [ ] DON'T add complexity
- [ ] DON'T ignore feedback

Focus on: promote, respond, fix bugs.

## Emergency Procedures

### If Site Goes Down
1. Check Vercel status
2. Check build logs
3. Revert to last working version
4. Fix offline, redeploy

### If Critical Bug Found
1. Acknowledge publicly
2. Fix within 24 hours
3. Deploy fix
4. Update thread

### If Negative Feedback
1. Stay professional
2. Fix actual issues
3. Ignore trolls
4. Learn from valid criticism

### If Launch Flops
1. Don't panic
2. Analyze why (traffic, UX, timing?)
3. Iterate or pivot
4. Try different channels

## Success Indicators

### Green Flags (Keep Going)
- Steady traffic growth
- People sharing organically
- Feature requests appear
- Positive sentiment
- Dev tweets about it

### Yellow Flags (Investigate)
- Traffic declining
- High bounce rate
- No shares after day 1
- Confusion in comments
- Performance complaints

### Red Flags (Major Issues)
- Zero traffic after week 1
- Constant crashes
- Universally negative feedback
- No one understands it
- Can't compete

## Phase 2 Preparation

### Only Start Phase 2 If
- [ ] Week 1 metrics hit
- [ ] Clear feature pattern emerges
- [ ] You have time to maintain it
- [ ] Users are asking for more

### Phase 2 Features (Priority Order)
1. Gallery (last 100 creations)
2. View counter
3. Second fractal type
4. Mobile optimization
5. Direct Twitter share

Build in this order based on demand.

## Resources

- **README.md** - Project overview
- **DEPLOY.md** - Deployment guide
- **NEXT_STEPS.md** - Action items
- **TROUBLESHOOTING.md** - Fix issues
- **PROJECT_SUMMARY.md** - Quick reference

## Final Pre-Launch Check

Right before you deploy, verify:

```bash
# 1. Clean build
npm run build

# 2. No errors in terminal
# Should end with "✓ Compiled successfully"

# 3. Test production build locally
npm start

# 4. Open http://localhost:3000
# Try everything one more time

# 5. If all good, deploy
vercel --prod
```

## Launch Day Timeline

**Morning (9am PT)**
- [ ] Final verification on production
- [ ] Tweet goes live
- [ ] Post on HN
- [ ] Post on Reddit

**Midday (12pm PT)**
- [ ] Check analytics
- [ ] Respond to comments
- [ ] Fix any urgent bugs

**Evening (6pm PT)**
- [ ] Review first-day metrics
- [ ] Thank early users
- [ ] Plan tomorrow's promotion

**Night (10pm PT)**
- [ ] Final check
- [ ] Document learnings
- [ ] Rest (you earned it)

## Week 1 Daily Routine

**Each Morning:**
1. Check analytics (5 min)
2. Respond to feedback (15 min)
3. Fix critical bugs if any (as needed)

**Each Evening:**
1. Promote in new channel (30 min)
2. Document feature requests (10 min)
3. Review what worked (10 min)

**Don't spend more than 1-2 hours/day** on this during Week 1.

Let it grow organically. Focus on quality responses, not new features.

## Success Definition

### Minimum Viable Success
- 100 visitors in Week 1
- 10 people share it
- 0 critical bugs
- You learned something

### Good Success
- 1000 visitors in Week 1
- 50 shares
- HN/Reddit upvotes
- Clear interest

### Great Success
- 5000+ visitors
- Trending on Twitter
- Front page HN
- Feature requests
- Media coverage

Any of these is a win. Launch to learn.

## Remember

- **Ship fast** - Done > Perfect
- **Iterate quickly** - Based on real feedback
- **Stay focused** - One feature at a time
- **Be proud** - You built something

Now go launch it. 🚀

---

**Current Status**: Ready to Deploy
**Time to Launch**: 1-2 days
**Next Action**: Create icons, test, deploy, tweet
