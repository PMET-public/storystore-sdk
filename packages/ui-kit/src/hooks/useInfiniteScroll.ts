import { RefObject, useEffect } from 'react'
import { useScroll } from './useScroll'
import { useResize } from './useResize'
import { useMeasure } from './useMeasure'

type useInfiniteScrollOptions = {
  disabled?: boolean
  delay?: number
  threshold?: number
  contentRef: RefObject<HTMLElement>
  scrollContainerRef?: RefObject<Element>
}
export const useInfiniteScroll = (
  onLoadMore: CallableFunction,
  { disabled, delay, contentRef, scrollContainerRef: container, threshold = 0 }: useInfiniteScrollOptions
) => {
  const { height: contentHeight } = useMeasure(contentRef)

  const { scrollY } = useScroll({ disabled, container, delay })

  const { height: viewportHeight } = useResize()

  useEffect(() => {
    if (disabled || !contentHeight || !scrollY || !viewportHeight) return

    if (scrollY + viewportHeight >= contentHeight - threshold) {
      onLoadMore()
    }
  }, [scrollY, viewportHeight, contentHeight, disabled, threshold, onLoadMore])
}
