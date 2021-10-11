import { createElement } from 'react'
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { Banner, BannerSkeleton, Heading, Link, Button } from '../../../../components'

const resourceType = 'storystore/components/banner'

const config = {
  isEmpty: ({ height }) => !height,
  resourceType,
}

const BannerComponent = ({
  componentProperties,
  className,
  style,
  itemPath,
  cqPath,
  loading = !cqPath,
  cqType,
  loaded = !!cqType,
}) => {
  const {
    title,
    titleType = 'h2',
    fontSize,
    fontSizeTablet,
    fontSizeDesktop,
    backgroundFileReference,
    backgroundColor,
    textColor,
    buttonLink,
    buttonLabel,
    buttonVariant,
    buttonTransparent,
    align,
    valign,
    height,
    heightTablet,
    heightDesktop,
    screen,
    contained,
  } = componentProperties

  if (loading || !loaded)
    return (
      <BannerSkeleton
        uniqueKey={`banner-skeleton--${itemPath}`}
        height={{ sm: height, md: heightTablet, lg: heightDesktop }}
        animate={loading}
      />
    )

  const type = createElement(titleType)

  return (
    <Banner
      className={className}
      style={style}
      backgroundImage={backgroundFileReference && <img src={backgroundFileReference} alt="" />}
      backgroundColor={backgroundColor}
      textColor={textColor}
      align={align}
      vAlign={valign}
      height={{ sm: height, md: heightTablet, lg: heightDesktop }}
      screen={screen}
      contained={contained}
      heading={
        title && (
          <Heading root={type} size={{ sm: fontSize, md: fontSizeTablet, lg: fontSizeDesktop }}>
            {title}
          </Heading>
        )
      }
      button={
        buttonLabel && (
          <Button
            root={buttonLink ? <Link href={buttonLink} /> : <button />}
            variant={buttonVariant}
            transparent={buttonTransparent}
          >
            {buttonLabel}
          </Button>
        )
      }
    />
  )
}

MapTo<any>(resourceType)(BannerComponent, config)

export const AEMBanner = withMappable<any>(BannerComponent, config)
