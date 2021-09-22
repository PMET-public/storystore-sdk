/**
 * Required by AEM SPA Editor
 */
import { NextApiRequest, NextApiResponse } from 'next'
import { DOMParser } from 'xmldom'
import { URL } from 'url'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path = '' } = req.query

  const uri = new URL(path.toString(), NEXT_PUBLIC_URL).href

  await fetch(uri)
    .then(t => t.text())
    .then(t => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(t, 'text/html')
      const data = doc.getElementById('__NEXT_DATA__').textContent
      res.status(200).json(data)
    })
}
