import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Verify the webhook secret (you should set this in Prismic and your environment variables)
  const secret = process.env.PRISMIC_WEBHOOK_SECRET
  if (event.headers.get('prismic-webhook-secret') !== secret) {
    console.log('error:',event.headers.get('prismic-webhook-secret'))
    return { status: 403, body: 'Invalid secret' }
  }

  // Logic to clear the cache
  // This will depend on how you've implemented caching in your Nuxt 3 app
  // For example, if you're using Nitro's built-in caching:
  await Promise.all([
    clearNuxtData(),
    clearNuxtDataCache()
  ])

  // You might also want to regenerate any static pages here
  // This is an example and may need to be adjusted based on your setup
  await $fetch('/api/revalidate')

  return { status: 200, body: 'Cache cleared successfully' }
})