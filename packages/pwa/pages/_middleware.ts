import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { auth, cookies } from '@storystore/toolbox'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  /** Get ENV variables defined by user (if any) */
  const cookie = cookies.getCookieValueFromString(req.headers.get('cookie'), 'STORYSTORE_SETTINGS')
  const settings = JSON.parse(cookie)

  const AEM_HOST = settings?.AEM_HOST ?? process.env.AEM_HOST
  const AEM_AUTH = settings?.AEM_AUTH ?? process.env.AEM_AUTH

  if (AEM_AUTH) {
    req.headers.set('Authorization', auth.getBasicAuthenticationHeader(AEM_AUTH.split(':')))
  }

  const res = NextResponse.next()

  /** Allow remore requests from the AEM Host */
  res.headers.set('Access-Control-Allow-Origin', AEM_HOST)
  res.headers.set('Access-Control-Allow-Methods', AEM_HOST)
  res.headers.set('Access-Control-Allow-Headers', AEM_HOST)
  return res
}
