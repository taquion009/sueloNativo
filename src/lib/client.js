import sanityClient from '@sanity/client'

export const sanity = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // `false` if you want to ensure fresh data
  token:process.env.SANITY_ACCESS_TOKEN,
});