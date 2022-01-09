import { createElement } from 'react'
import { withMappable, MapTo } from '@adobe/aem-react-editable-components'
import { Banner as BannerRoot, BannerSkeleton, Heading, Link, Button } from '../../../../components'

const resourceType = 'storystore/components/banner'

const config = {
  //   isEmpty: ({ height }) => !height,
  isEmtpy: () => false,
  resourceType,
}

const Banner = ({
  id,
  className,
  style,
  itemPath,
  cqPath,
  heading,
  headingType = 'h2',
  fontSize,
  fontSizeTablet,
  fontSizeDesktop,
  src: backgroundSrc,
  backgroundColor,
  backgroundImageLazy,
  textColor,
  bannerLink,
  buttonLabel,
  buttonVariant,
  buttonTransparent,
  align,
  valign,
  height = '400px',
  heightTablet,
  heightDesktop,
  screen,
  contained,
  alt = '',
  loading = !cqPath,
}) => {
  if (loading)
    return (
      <BannerSkeleton
        uniqueKey={`banner-skeleton--${itemPath}`}
        height={{ sm: height, md: heightTablet, lg: heightDesktop }}
        animate={loading}
      />
    )

  const type = createElement(headingType)

  return (
    <BannerRoot
      id={id}
      className={className}
      root={!buttonLabel && bannerLink ? <Link href={bannerLink} /> : <div />}
      style={style}
      backgroundImage={
        backgroundSrc && <img src={backgroundSrc} loading={backgroundImageLazy ? 'lazy' : 'eager'} alt={alt} />
      }
      backgroundColor={backgroundColor || 'var(--color-surface)'}
      textColor={textColor}
      align={align}
      vAlign={valign}
      height={{ sm: height, md: heightTablet, lg: heightDesktop }}
      screen={screen}
      contained={contained}
      heading={
        heading && (
          <Heading root={type} size={{ sm: fontSize, md: fontSizeTablet, lg: fontSizeDesktop }}>
            {heading}
          </Heading>
        )
      }
      button={
        buttonLabel && (
          <Button
            root={bannerLink ? <Link href={bannerLink} /> : <button />}
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

MapTo<any>(resourceType)(Banner, config)

export const AEMBanner = withMappable<any>(Banner, config)
