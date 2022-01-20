// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import {
  withMappable,
  AllowedComponentsContainer,
  AllowedComponentsProperties,
} from '@adobe/aem-react-editable-components'
import { classes, getBreakpointValues } from '@storystore/ui-kit/dist/lib'
import { FunctionComponent } from 'react'

// Styles
import style from './AEMContainer.module.css'

const site = process.env.NEXT_PUBLIC_AEM_SITE

// The sling:resourceType for which this Core Component is registered with in AEM
export const RESOURCE_TYPE = `${site}/components/container`

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
export const AEMContainerConfig = {
  emptyLabel: 'Layout Container', // The component placeholder in AEM SPA Editor
  isEmpty: (props: any) => props.cqItemsOrder?.length === 0, // The function to determine if this component has been authored
  resourceType: RESOURCE_TYPE, // The sling:resourceType this SPA component is mapped to
}

export type ContainerProps = AllowedComponentsProperties

const Container: FunctionComponent<ContainerProps> = ({ ...props }) => {
  // Rows Grid
  const rowsGrid = !!props.appliedCssClassNames?.match(/\b(container--rows-grid)\b/i)

  // Carousel
  const carousel = !!props.appliedCssClassNames?.match(/\b(container--carousel-list)\b/i)
  const show = getBreakpointValues({ sm: 1, md: 2, lg: 3 })
  const carouselStyle = carousel && {
    ['--carousel-show-sm' as string]: show.sm ? `calc(100% / ${show.sm} - var(--spacing-lg))` : 'max-content',
    ['--carousel-show-md' as string]: show.md ? `calc(100% / ${show.md} - var(--spacing-lg))` : 'max-content',
    ['--carousel-show-lg' as string]: show.lg ? `calc(100% / ${show.lg} - var(--spacing-lg))` : 'max-content',
    ['--carousel-show-xl' as string]: show.xl ? `calc(100% / ${show.xl} - var(--spacing-lg))` : 'max-content',
  }

  return (
    <div
      className={classes([style.root, [style.carousel, carousel], [style.rowsGrid, rowsGrid]])}
      style={{ ...carouselStyle }}
    >
      <AllowedComponentsContainer {...props} />
    </div>
  )
}

// withMappable allows the component to be hardcoded into the SPA; <AEMContainerGrid .../>
export const AEMContainer = withMappable(Container, AEMContainerConfig)
