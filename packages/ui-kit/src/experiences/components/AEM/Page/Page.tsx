import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { App, Header, Footer, SkeletonLoader } from '../../../../components'

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

  const link = linkRoot ?? <a />

  return (
    <App
      id={id}
      className={className}
      linkRoot={linkRoot}
      header={
        <Header
          logo={
            logoFile ? (
              <link.type {...link.props} href="/">
                <img src={logoFile} alt={siteName} />
              </link.type>
            ) : (
              <SkeletonLoader uniqueKey="header--logo" width={250} height={100}>
                <rect width="100%" height="100%" />
              </SkeletonLoader>
            )
          }
          variant="surface"
          transparent
          sticky
          style={{
            ['--header-text' as string]: 'var(--color-on-surface)',
          }}
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
