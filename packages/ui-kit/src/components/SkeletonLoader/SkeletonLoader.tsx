import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

export type SkeletonLoaderProps = IContentLoaderProps

export const SkeletonLoader = ({ ...props }) => {
  return (
    <ContentLoader
      backgroundColor="var(--color-skeleton)"
      foregroundColor={props.animate ? undefined : 'var(--color-skeleton)'}
      {...props}
    />
  )
}
