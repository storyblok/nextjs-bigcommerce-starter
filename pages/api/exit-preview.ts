
import { NextApiRequest, NextApiResponse } from "next";

export default async function exit(_: NextApiRequest, res: NextApiResponse) {
    // Exit the current user from "Preview Mode". This function accepts no args.
    res.clearPreviewData()

     // set the cookies to None
     const cookies = res.getHeader('Set-Cookie')
     if(cookies instanceof Array) {
        res.setHeader('Set-Cookie', cookies?.map((cookie: string) => cookie.replace('SameSite=Lax', 'SameSite=None')))
     }
 
    // Redirect the user back to the index page.
    res.redirect('/')
}