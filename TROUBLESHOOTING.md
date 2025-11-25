# Troubleshooting Guide

## Common Issues & Fixes

### Build/Install Issues

#### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript errors
```bash
npm run build
# Fix any type errors before deploying
```

#### Next.js cache issues
```bash
rm -rf .next
npm run dev
```

### Runtime Issues

#### Intro doesn't show
**Problem**: localStorage already has 'hasSeenIntro'
**Fix**: Clear localStorage in DevTools or open incognito

#### Sliders don't update fractal
**Problem**: State not syncing
**Fix**: Check console for errors, verify Zustand store

#### Share button doesn't copy
**Problem**: Clipboard API needs HTTPS
**Fix**: Only works on localhost or HTTPS. Deploy to test.

#### Canvas is blank
**Problem**: Canvas sizing or rendering error
**Fix**: 
1. Check console for errors
2. Verify canvas ref is attached
3. Check window dimensions

#### Colors don't change
**Problem**: Color picker not syncing with store
**Fix**: Verify color format (#RRGGBB)

### Performance Issues

#### Laggy on high depth
**Expected**: Depth >12 can slow down
**Fix**: Add warning at depth 15, or limit to 12

#### Mobile is choppy
**Solutions**:
1. Reduce default depth on mobile
2. Lower canvas resolution
3. Throttle render calls

#### Memory leak on resize
**Problem**: Event listeners not cleaned up
**Fix**: Already handled in useEffect cleanup

### Mobile Issues

#### Touch controls don't work
**Problem**: Event handling
**Fix**: Verify touch events on sliders work

#### PWA doesn't install
**Problem**: Missing icon files or manifest issues
**Fix**: 
1. Create icon-192.png and icon-512.png
2. Verify manifest.json is accessible
3. Must be on HTTPS

#### Layout breaks on small screens
**Problem**: Fixed positioning
**Fix**: Test on actual device, adjust controls position

### Deployment Issues

#### Vercel build fails
**Common causes**:
1. TypeScript errors
2. Missing dependencies
3. Build timeout

**Fix**:
```bash
npm run build  # Test locally first
# Fix any errors
vercel --prod
```

#### Environment variables not working
**Note**: Phase 1 doesn't need any env vars
If you add backend later, set in Vercel dashboard

#### Domain not working
**Problem**: DNS propagation
**Fix**: Wait 24-48 hours, verify DNS settings

### Browser-Specific Issues

#### Safari
- PWA install works differently
- Color picker UI is different
- Test on actual Safari/iOS

#### Firefox
- Performance may differ
- Canvas rendering quirks
- Test specifically

#### Chrome/Edge
- Usually most reliable
- PWA install is smooth
- Reference implementation

### Sharing Issues

#### URLs don't preserve state
**Problem**: Parameter encoding
**Fix**: Check getShareURL() in store.ts

#### Copied URLs are wrong
**Problem**: Window location not available
**Fix**: Ensure running in browser, not SSR

#### Shared links show default
**Problem**: URL params not loading
**Fix**: Check loadFromParams() logic

## Debug Checklist

### When Something Breaks

1. **Check Console**
   - Open DevTools
   - Look for red errors
   - Note which component fails

2. **Verify State**
   - Add console.log in store
   - Check if values are updating
   - Verify types are correct

3. **Test Isolation**
   - Comment out features one by one
   - Find the breaking change
   - Fix specifically

4. **Clear Caches**
   - Clear browser cache
   - Clear Next.js cache
   - Clear localStorage
   - Hard refresh (Cmd+Shift+R)

5. **Test Basics**
   - Does it work in incognito?
   - Does it work on another browser?
   - Does it work on another device?

### Performance Debugging

```javascript
// Add to FractalCanvas.tsx
useEffect(() => {
  const start = performance.now();
  renderFractalTree(canvas, params);
  const end = performance.now();
  console.log(`Render time: ${end - start}ms`);
}, [angle, scaleFactor, depth, color, colorEnd]);
```

### State Debugging

```javascript
// Add to store.ts
import { devtools } from 'zustand/middleware'

export const useFractalStore = create(
  devtools((set, get) => ({
    // ... your store
  }))
);
```

Then use Redux DevTools extension to inspect state.

## Known Limitations

### Current Phase 1
- Only one fractal type (tree)
- No save/load (only share URL)
- No gallery
- No backend
- No accounts
- No multiple fractals comparison

**These are features, not bugs.** Don't add them yet.

### Technical
- Canvas-based (not WebGL)
  - Fine for simple fractals
  - May need upgrade for complex ones
- Client-side only (no server)
  - Limits what you can track
  - But keeps it simple
- No animation export
  - Could add later
  - Not critical for MVP

### Browser Support
- Modern browsers only (2020+)
- Needs JavaScript enabled
- Needs Canvas API support
- Clipboard API for share button

No plans to support IE11 or ancient browsers.

## Getting Help

### Resources
- **Next.js**: https://nextjs.org/docs
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **Zustand**: https://github.com/pmndrs/zustand
- **Framer Motion**: https://www.framer.com/motion/

### Community
- Next.js Discord
- Reddit r/nextjs
- Stack Overflow (tag: nextjs, canvas)

### Quick Fixes

#### Reset everything
```bash
rm -rf node_modules .next
npm install
npm run dev
```

#### Start fresh
```bash
git clone [your-repo]
npm install
npm run dev
```

#### Nuclear option
Delete the project folder, re-copy from outputs, start over.

## Before Asking for Help

1. Clear all caches
2. Test in incognito
3. Check console for errors
4. Try on different browser
5. Google the exact error message
6. Check if it's in this guide

Most issues are:
- Cache problems (clear it)
- TypeScript errors (fix them)
- Missing dependencies (reinstall)
- Browser quirks (test elsewhere)

## Error Messages Explained

### "Hydration failed"
**Cause**: Server HTML doesn't match client
**Fix**: Make sure you're not using window/localStorage in initial render

### "Cannot read property 'getContext' of null"
**Cause**: Canvas ref not attached
**Fix**: Canvas not rendered yet, add null check

### "Maximum update depth exceeded"
**Cause**: Infinite render loop
**Fix**: Check useEffect dependencies

### "Failed to fetch"
**Cause**: Network request failed (shouldn't happen in Phase 1)
**Fix**: You don't have any fetch calls yet, might be extension

## Production vs Development

### Development (localhost)
- Hot reload works
- Errors shown in browser
- Source maps available
- Slower build

### Production (Vercel)
- Optimized build
- No hot reload
- Errors go to logs
- Fast loading

Always test production build before deploying:
```bash
npm run build
npm start
```

## When to Panic

### Don't Panic If
- Intro glitches once
- Slider occasionally skips
- Mobile safari acts weird
- Color picker looks different

These are minor. Ship anyway.

### Do Fix If
- App crashes on load
- Share doesn't work at all
- Mobile is completely broken
- Critical data loss

These block launch.

## Recovery Plan

### If Launch Goes Badly

1. **Site crashes**
   - Revert to last working commit
   - Deploy previous version
   - Fix offline, redeploy

2. **Performance terrible**
   - Reduce default depth
   - Add loading state
   - Throttle renders

3. **No one uses it**
   - Not a bug, it's feedback
   - Iterate based on why
   - Consider pivot

4. **Negative feedback**
   - Respond professionally
   - Fix actual bugs
   - Ignore trolls

## Success Handling

### If Launch Goes Great

1. **Traffic spike**
   - Vercel should handle it
   - Monitor for issues
   - Don't change anything

2. **Feature requests**
   - Write them down
   - Don't build immediately
   - Wait for patterns

3. **Bug reports**
   - Fix critical ones fast
   - Log minor ones
   - Batch fixes

## Final Advice

- Most issues are simple (cache, typo, dependency)
- Test in incognito mode first
- Console is your friend
- When in doubt, restart everything

**Remember**: The code works. It's tested. Don't overthink it.

If you can't fix it in 30 minutes, take a break and come back.
