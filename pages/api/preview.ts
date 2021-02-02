import StoryblokClient from '@lib/storyblok'
import { NextApiRequest, NextApiResponse } from "next";

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  // Check the secret and next parameters
  // TODO: Set this to protect you preview routes!
  /* if (
    req.query.secret !== process.env.MY_SECRET_TOKEN ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  } */

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Set cookie to None, so it can be read in the Storyblok iframe
  const cookies = res.getHeader('Set-Cookie')
  if(cookies instanceof Array) {
    res.setHeader('Set-Cookie', cookies?.map((cookie: string) => cookie.replace('SameSite=Lax', 'SameSite=None')))
 }

  // Redirect to the entry location
  let slug = req.query.slug

  // Handle home slug 
  if(slug === 'home') {
      slug = ''
  }

  // Redirect to the path from entry
  res.redirect(`/${slug}`)
}