import { NextPage } from 'next'
import { Block, UIKitSettings, useUIKitSettings, toast } from '@storystore/ui-kit/components'
import { cookies } from '@storystore/toolbox'
import { trackEvent } from '../lib/tracker'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'

const SettingsPage: NextPage<any> = ({}) => {
  const settings = useUIKitSettings(JSON.parse(cookies.get('STORYSTORE_SETTINGS') || '{}'))

  const apolloClient = useApolloClient()

  const router = useRouter()

  return (
    <Block contained style={{ height: '100%', alignItems: 'center' }}>
      <UIKitSettings
        {...settings}
        onSubmit={async (values: any) => {
          settings.onSubmit(values)

          cookies.set('STORYSTORE_SETTINGS', JSON.stringify(values), 30)

          await apolloClient.resetStore()

          toast('Your updates have been saved.', {
            hideProgressBar: true,
            closeOnClick: true,
            autoClose: false,
            theme: 'light',
            type: 'success',
          })

          router.reload()

          /** Track changed variables */
          trackEvent({
            category: 'AEM Environment',
            action: 'Changed',
            label: values.AEM_HOST,
          })
        }}
        onReset={async () => {
          settings.onReset()

          cookies.remove('STORYSTORE_SETTINGS')

          await apolloClient.resetStore()

          router.reload()

          toast('Your updates have been saved.', {
            hideProgressBar: true,
            closeOnClick: true,
            theme: 'light',
            type: 'success',
          })

          /** Track reset variables */
          trackEvent({
            category: 'AEM Environment',
            action: 'Reset',
          })
        }}
      />
    </Block>
  )
}

export default SettingsPage
