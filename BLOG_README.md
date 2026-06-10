# Blog System for Dizajnownia

This document describes the blog system implemented for the Dizajnownia website using mdsvex.

## Features

### ✅ Implemented Features

1. **Markdown Support with mdsvex**
   - Full markdown support with frontmatter
   - Syntax highlighting for code blocks
   - GitHub Flavored Markdown (GFM) support
   - Automatic slug generation

2. **Blog Listing Page (`/blog`)**
   - Responsive grid layout
   - Pagination (6 posts per page)
   - Search functionality
   - Category and tag filtering
   - Featured posts highlighting

3. **Individual Blog Posts (`/blog/[slug]`)**
   - Full markdown content rendering
   - SEO optimization with structured data
   - Social media sharing buttons
   - Related posts section
   - Reading time estimation

4. **Blog Sidebar**
   - Search functionality
   - Category navigation with post counts
   - Popular tags with post counts
   - Featured posts preview
   - Newsletter signup form

5. **SEO & Performance**
   - Complete SEO meta tags
   - Open Graph and Twitter Card support
   - Schema.org structured data
   - Canonical URLs
   - Optimized images with lazy loading

6. **Navigation Integration**
   - Blog link added to main navigation
   - Breadcrumb navigation
   - Consistent design with existing site

## File Structure

```
src/
├── routes/
│   └── blog/
│       ├── +layout.svelte          # Blog layout with sidebar
│       ├── +page.svelte            # Blog listing page
│       ├── [slug]/
│       │   └── +page.svelte        # Individual blog post page
│       └── jak-stworzyc-skuteczne-logo.md  # Sample markdown post
├── lib/
│   ├── components/
│   │   ├── BlogCard.svelte         # Blog post preview card
│   │   ├── BlogSidebar.svelte      # Blog sidebar with filters
│   │   └── Pagination.svelte       # Pagination component
│   └── utils/
│       └── blog.js                 # Blog utility functions
└── svelte.config.js                # mdsvex configuration
```

## Configuration

### mdsvex Setup

The blog uses mdsvex for markdown processing with the following configuration:

```javascript
// svelte.config.js
import { mdsvex } from 'mdsvex';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      rehypePlugins: [rehypeHighlight, rehypeSlug],
      remarkPlugins: [remarkGfm]
    })
  ]
};
```

### Dependencies

```json
{
  "devDependencies": {
    "mdsvex": "^0.12.6",
    "rehype-highlight": "^7.0.0",
    "rehype-slug": "^6.0.0",
    "remark-gfm": "^4.0.0"
  }
}
```

## Creating Blog Posts

### Markdown File Structure

Create new blog posts as `.md` files in the `src/routes/blog/` directory:

```markdown
---
title: "Your Blog Post Title"
excerpt: "A brief description of the post content"
date: "2024-01-15"
author: "Dizajnownia"
category: "Category Name"
tags: ["tag1", "tag2", "tag3"]
image: "/img/your-image.webp"
readTime: "5 min"
featured: true
---

# Your Blog Post Content

Your markdown content here...

## Code Examples

```javascript
// Syntax highlighting supported
const example = "Hello World";
console.log(example);
```

## Tables

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |

## Lists

- Item 1
- Item 2
- Item 3
```

### Frontmatter Fields

- **title**: Post title (required)
- **excerpt**: Brief description for previews (required)
- **date**: Publication date in YYYY-MM-DD format (required)
- **author**: Author name (required)
- **category**: Post category (required)
- **tags**: Array of tags (required)
- **image**: Featured image path (required)
- **readTime**: Estimated reading time (required)
- **featured**: Boolean for featured posts (optional)

## Blog Data Management

### Current Implementation

The blog currently uses a static data structure in `src/lib/utils/blog.js`. In a production environment, you might want to:

1. **Use a CMS** (Strapi, Contentful, etc.)
2. **Implement dynamic markdown loading**
3. **Add a database** for post management
4. **Create an admin interface**

### Adding New Posts

To add new posts to the current system:

1. Create a new markdown file in `src/routes/blog/`
2. Add the post data to the `blogPosts` array in `src/lib/utils/blog.js`
3. Ensure the slug matches the filename

## Styling

The blog uses Tailwind CSS classes and follows the existing design patterns:

- **Color Scheme**: Blue and gray palette matching the main site
- **Typography**: Quicksand font family
- **Components**: Consistent with existing components
- **Responsive**: Mobile-first design approach

## SEO Features

### Meta Tags

- Title and description
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Author and publication date

### Structured Data

Schema.org markup for:
- BlogPosting
- Organization
- BreadcrumbList
- WebPage

### Performance

- Lazy loading images
- Optimized image formats (WebP)
- Minimal JavaScript
- Static generation

## Future Enhancements

### Potential Improvements

1. **Content Management**
   - Admin panel for post management
   - Rich text editor
   - Image upload functionality

2. **User Features**
   - Comments system
   - User accounts
   - Bookmarking posts

3. **Advanced Features**
   - RSS feed
   - Email newsletter integration
   - Social media auto-posting
   - Analytics integration

4. **Performance**
   - Image optimization pipeline
   - CDN integration
   - Caching strategies

## Usage Examples

### Adding a New Blog Post

1. Create `src/routes/blog/my-new-post.md`:
```markdown
---
title: "My New Blog Post"
excerpt: "This is a brief description of my post"
date: "2024-01-20"
author: "Dizajnownia"
category: "Design Tips"
tags: ["design", "tips", "tutorial"]
image: "/img/my-post-image.webp"
readTime: "10 min"
featured: false
---

# My New Blog Post

Content here...
```

2. Add to `src/lib/utils/blog.js`:
```javascript
{
    slug: 'my-new-post',
    title: 'My New Blog Post',
    excerpt: 'This is a brief description of my post',
    content: '',
    date: '2024-01-20',
    author: 'Dizajnownia',
    category: 'Design Tips',
    tags: ['design', 'tips', 'tutorial'],
    image: '/img/my-post-image.webp',
    readTime: '10 min',
    featured: false
}
```

### Customizing the Design

The blog components can be customized by modifying:

- `src/lib/components/BlogCard.svelte` - Post preview cards
- `src/lib/components/BlogSidebar.svelte` - Sidebar layout
- `src/routes/blog/+page.svelte` - Main blog page
- `src/routes/blog/[slug]/+page.svelte` - Individual post pages

## Troubleshooting

### Common Issues

1. **mdsvex not working**
   - Ensure all dependencies are installed
   - Check svelte.config.js configuration
   - Restart the development server

2. **Images not loading**
   - Verify image paths are correct
   - Ensure images are in the static directory
   - Check file permissions

3. **SEO tags not appearing**
   - Verify svelte:head sections are correct
   - Check for JavaScript errors
   - Ensure proper meta tag syntax

## Support

For questions or issues with the blog system, refer to:

- [mdsvex Documentation](https://mdsvex.com/)
- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

*This blog system is designed to be easily extensible and maintainable while providing a great user experience for both readers and content creators.*
