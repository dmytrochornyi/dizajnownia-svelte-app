# X-Robots-Tag Implementation Guide

This document explains the comprehensive X-Robots-Tag implementation added to your Svelte project.

## Overview

X-Robots-Tag is an HTTP header that provides search engines with directives about how to crawl and index your pages. This implementation includes both HTTP headers and meta tags for maximum compatibility across different hosting environments.

## What's Been Added

### 1. Robots Headers Utility (`src/lib/utils/robots-headers.js`)

A comprehensive utility for managing X-Robots-Tag directives:

- **Default directives**: `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`
- **Service-specific directives**: Custom directives for each service page
- **Dynamic generation**: Functions to generate directives based on routes and options
- **Flexible options**: Support for noindex, noarchive, nosnippet, etc.

### 2. Layout Integration (`src/routes/+layout.js`)

Added HTTP headers function that sets:
- X-Robots-Tag header
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- Performance headers (X-DNS-Prefetch-Control)
- Cache control headers

### 3. Dynamic Meta Tags (`src/routes/+layout.svelte`)

Dynamic robots meta tags that update based on the current route using Svelte 5 runes.

### 4. Enhanced Base Template (`src/app.html`)

Updated the base HTML template with:
- Enhanced robots meta tag
- X-Robots-Tag meta tag for additional compatibility

### 5. Service Page Example (`src/routes/wizytowki/+page.svelte`)

Demonstrates how to implement X-Robots-Tag on individual service pages with:
- Service-specific robots directives
- Both robots and X-Robots-Tag meta tags

### 6. Hosting Configuration Files

#### Netlify/Vercel (`static/_headers`)
- Global X-Robots-Tag headers
- Service-specific headers
- Cache control for different file types

#### IIS (`static/web.config`)
- HTTP headers configuration
- URL rewriting for SPA
- Compression settings

#### Apache (`static/.htaccess`)
- Header directives
- URL rewriting
- Compression and caching

## Available Directives

### Standard Directives
- `index, follow` - Allow indexing and following links
- `noindex, nofollow` - Prevent indexing and following links
- `noarchive` - Prevent archiving in search results
- `nosnippet` - Prevent showing snippets in search results
- `noimageindex` - Prevent indexing images
- `notranslate` - Prevent translation

### Enhanced Directives (Google-specific)
- `max-snippet:-1` - Allow unlimited snippet length
- `max-image-preview:large` - Allow large image previews
- `max-video-preview:-1` - Allow unlimited video preview length

## Usage Examples

### Basic Usage

```javascript
import { getRobotsDirective } from '$lib/utils/robots-headers.js';

// Get directive for a specific route
const directive = getRobotsDirective('/wizytowki');
// Returns: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
```

### Service Page Implementation

```svelte
<script>
    import { getServiceRobotsDirective } from '$lib/utils/robots-headers.js';
    
    const robotsDirective = getServiceRobotsDirective('wizytowki');
</script>

<svelte:head>
    <meta name="robots" content={robotsDirective} />
    <meta name="X-Robots-Tag" content={robotsDirective} />
</svelte:head>
```

### Custom Options

```javascript
import { generateXRobotsTag } from '$lib/utils/robots-headers.js';

// Generate directive with custom options
const directive = generateXRobotsTag('/admin', {
    noindex: true,
    noarchive: true
});
// Returns: "noindex, follow, noarchive"
```

## Hosting Provider Setup

### Netlify
The `_headers` file is automatically recognized. No additional configuration needed.

### Vercel
The `_headers` file is automatically recognized. No additional configuration needed.

### Apache
The `.htaccess` file will be automatically used. Ensure mod_headers is enabled.

### IIS
The `web.config` file will be automatically used. No additional configuration needed.

### Other Static Hosts
Most static hosting providers support one of the above configurations. Check your provider's documentation for header configuration options.

## Testing Your Implementation

### 1. Check HTTP Headers
Use browser developer tools or online tools to verify headers:

```bash
curl -I https://yourdomain.com/wizytowki
```

Look for:
```
X-Robots-Tag: index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1
```

### 2. Check Meta Tags
Inspect the page source to verify meta tags:

```html
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<meta name="X-Robots-Tag" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
```

### 3. Google Search Console
Monitor your site in Google Search Console to see how Google interprets your directives.

## Customization

### Adding New Service Pages

1. Add the service to `ROBOTS_DIRECTIVES` in `robots-headers.js`:
```javascript
'new-service': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
```

2. Add the route to `_headers` file:
```
/new-service
  X-Robots-Tag: index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1
```

### Special Cases

For pages that should not be indexed:

```javascript
const directive = generateXRobotsTag('/admin', { noindex: true });
// Returns: "noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
```

For pages that should not be archived:

```javascript
const directive = generateXRobotsTag('/temporary', { noarchive: true });
// Returns: "index, follow, noarchive, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
```

## Best Practices

1. **Consistency**: Use the same directives across HTTP headers and meta tags
2. **Specificity**: Use service-specific directives when appropriate
3. **Testing**: Always test your directives in staging before production
4. **Monitoring**: Monitor search console for any issues
5. **Documentation**: Keep your directives documented and organized

## Troubleshooting

### Headers Not Showing
- Check if your hosting provider supports the configuration file you're using
- Verify the file is in the correct location (usually in the `static` or `public` directory)
- Check server logs for any configuration errors

### Meta Tags Not Updating
- Ensure you're using the correct Svelte 5 runes syntax (`$derived`)
- Check that the route is being correctly detected
- Verify the import paths are correct

### Search Engines Not Respecting Directives
- Allow time for search engines to recrawl your pages
- Check that both HTTP headers and meta tags are present
- Verify there are no conflicting directives elsewhere

## Additional Resources

- [Google's X-Robots-Tag Documentation](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag)
- [SvelteKit Headers Documentation](https://kit.svelte.dev/docs/load#output-headers)
- [Netlify Headers Documentation](https://docs.netlify.com/routing/headers/)
- [Apache mod_headers Documentation](https://httpd.apache.org/docs/current/mod/mod_headers.html)
