import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { App, Header, Footer } from '../../../../components'

const resourceType = 'storystore/components/remotepage'

const config = {
  isEmpty: () => false,
  resourceType,
}

const PageComponent = ({ componentProperties, className, style, children, linkRoot }) => {
  const {
    id,
    logoFile,
    siteName,
    colorBody,
    colorOnBody,
    colorSurface,
    colorOnSurface,
    colorPrimary,
    colorOnPrimary,
    colorSecondary,
    colorOnSecondary,
    colorAccent,
    colorOnAccent,
  }: any = componentProperties

  return (
    <App
      id={id}
      className={className}
      linkRoot={linkRoot}
      header={
        <Header
          logo={<img src={logoFile || '/__assets/wknd/logo.svg'} alt={siteName} />}
          transparent
          sticky
          style={{ ['--header-text' as string]: 'var(--color-on-surface)' }}
        />
      }
      footer={<Footer />}
      style={{
        ['--color-body']: colorBody,
        ['--color-on-body']: colorOnBody,
        ['--color-surface']: colorSurface,
        ['--color-on-surface']: colorOnSurface,
        ['--color-primary']: colorPrimary,
        ['--color-on-primary']: colorOnPrimary,
        ['--color-secondary']: colorSecondary,
        ['--color-on-secondary']: colorOnSecondary,
        ['--color-accent']: colorAccent,
        ['--color-on-accent']: colorOnAccent,
        ...style,
      }}
    >
      {children}
    </App>
  )
}

MapTo<any>(resourceType)(PageComponent, config)

export const AEMPage = withMappable<any>(PageComponent, config)
