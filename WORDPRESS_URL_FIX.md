# 🔧 WordPress URL Query Parameter Fix

## Problem Description

Your SvelteKit site was showing SEO warnings about canonical tags on URLs with WordPress-style query parameters:
- `https://dizajnownia.pl/?p=2242`
- `https://dizajnownia.pl/?p=2809`
- `https://dizajnownia.pl/?p=1676`

These URLs were being served with your homepage content due to the SPA fallback configuration, causing canonical tag mismatches.

## Root Cause

1. **SPA Fallback**: Your SvelteKit app uses `fallback: 'index.html'` which serves the homepage for all unknown routes
2. **Legacy URLs**: Search engines were finding old WordPress URLs from previous site versions
3. **Canonical Mismatch**: These URLs served homepage content but had incorrect canonical tags
4. **Static Hosting**: Using `@sveltejs/adapter-static` means server-side hooks don't work

## Implemented Solution

### 1. **HTTP Headers (`static/_headers`)**
Added specific headers to block indexing of WordPress-style query parameters:
```http
/?p=*
  X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0
```

### 2. **Server Redirects (`.htaccess`)**
Added comprehensive 301 redirects to send WordPress-style URLs to the homepage:
```apache
# Redirect WordPress-style query parameters to homepage (301 permanent redirect)
RewriteCond %{QUERY_STRING} ^p=([0-9]+)(&.*)?$
RewriteRule ^$ /? [R=301,L]

# Handle WordPress permalink structures that might have been cached
RewriteCond %{QUERY_STRING} ^p=([0-9]+)$
RewriteRule ^.*$ /? [R=301,L]
```

### 3. **Robots.txt Blocking**
Added explicit disallow rules:
```txt
Disallow: /?p=*
Disallow: /?page_id=*
Disallow: /?post_id=*
Disallow: /?id=*
```

### 4. **Dynamic Meta Tags (`src/routes/+layout.svelte`)**
Updated layout to detect WordPress parameters and set appropriate meta tags:
- `noindex, nofollow` for WordPress URLs
- Canonical URL always points to homepage for these URLs
- Enhanced detection for various WordPress parameter patterns

## Benefits

✅ **SEO Cleanup**: Search engines will stop indexing these legacy URLs
✅ **Proper Redirects**: 301 redirects help transfer any remaining SEO value
✅ **Canonical Consistency**: No more canonical tag mismatches
✅ **Future-Proof**: Handles various WordPress parameter formats
✅ **Static Compatible**: Works with `@sveltejs/adapter-static`

## Testing

After deployment, test these URLs:
- `https://dizajnownia.pl/?p=2242` → Should redirect to homepage
- `https://dizajnownia.pl/?page_id=123` → Should redirect to homepage
- `https://dizajnownia.pl/?p=123&other=param` → Should redirect to homepage
- Check that search engines receive proper `noindex` signals

## Monitoring

Monitor your search console for:
- Decrease in indexed WordPress-style URLs
- Proper canonical tag handling
- 301 redirect status codes

## Files Modified

- `static/_headers` - Added noindex headers
- `static/.htaccess` - Added comprehensive redirect rules
- `static/robots.txt` - Added disallow rules
- `src/routes/+layout.svelte` - Updated meta tag logic with enhanced detection

## Important Notes

⚠️ **Static Hosting**: Since you're using `@sveltejs/adapter-static`, server-side hooks don't work. The solution relies on:
- `.htaccess` redirects (Apache)
- HTTP headers for SEO control
- Client-side meta tag detection

⚠️ **Hosting Compatibility**: The `.htaccess` rules work with Apache servers. If using Nginx or other servers, equivalent redirect rules need to be configured.
