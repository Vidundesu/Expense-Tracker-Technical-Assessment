import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // Must be 200.html for Hostinger
      precompress: false,
      strict: false // Important for SPA behavior
    }),
    prerender: {
      entries: ['*'],
      handleMissingId: 'warn' // Helps debug missing routes
    }
  }
};