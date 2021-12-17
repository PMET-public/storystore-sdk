import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { createContext } from 'react'

const resourceType = 'storystore/components/remotepage'

const config = {
  isEmpty: () => false,
  resourceType,
}

export const PageContext = createContext({
  logoFile: null,
  siteName: null,
  colorBody: null,
  colorOnBody: null,
  colorSurface: null,
  colorOnSurface: null,
  colorPrimary: null,
  colorOnPrimary: null,
  colorSecondary: null,
  colorOnSecondary: null,
})

const PageComponent = ({ componentProperties, className, style, children }) => {
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
  }: any = componentProperties

  return (
    <PageContext.Provider
      value={{
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
      }}
    >
      <div
        id={id}
        key={`AEMPage-${id ?? 'Root'}`}
        className={className}
        style={{
          ['--color-body']: colorBody,
          ['--color-on-body']: colorOnBody,
          ['--color-surface']: colorSurface,
          ['--color-on-surface']: colorOnSurface,
          ['--color-primary']: colorPrimary,
          ['--color-on-primary']: colorOnPrimary,
          ['--color-secondary']: colorSecondary,
          ['--color-on-secondary']: colorOnSecondary,
          ...style,
        }}
      >
        {children}
      </div>
    </PageContext.Provider>
  )
}

MapTo<any>(resourceType)(PageComponent, config)

export const AEMPage = withMappable<any>(PageComponent, config)
