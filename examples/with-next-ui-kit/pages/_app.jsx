import { UIProvider } from '@storystore/ui-kit/theme'

const MyApp = ({ Component, pageProps }) => {
  return (
    <UIProvider>
      <Component {...pageProps} />
    </UIProvider>
  )
}

export default MyApp
