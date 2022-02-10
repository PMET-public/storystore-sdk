import { FunctionComponent, isValidElement, HTMLAttributes, ReactElement } from 'react'
import { BreakpointValues, classes, merge, Size } from '../../lib'

// Styles
import style from './Text.module.css'

export type TextProps = HTMLAttributes<HTMLElement> & {
  root?: ReactElement
  size?: BreakpointValues<Size>
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
  leading?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'
}

export const Text: FunctionComponent<TextProps> = ({
  root = <div />,
  size = 'md',
  weight = 'normal',
  leading = 'normal',
  className,
  ...props
}) => {
  return (
    <root.type
      {...merge(props, root.props)}
      className={classes([style.root, root.props.className, className])}
      style={{
        ...root.props.style,
        ...props.style,
        ['--size']: `var(--font-${size})`,
        ['--weight']: `var(--font-${weight})`,
        ['--leading']: `var(--leading-${leading})`,
      }}
    />
  )
}
