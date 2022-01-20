import { FunctionComponent, useCallback, HTMLAttributes, ReactElement, isValidElement } from 'react'
import { useForm } from '../../hooks'
import { Form } from '..'
import { classes } from '../../lib'

// Styles
import style from './Pills.module.css'

type Value = string | string[] | number | number[]

export type PillsProps = HTMLAttributes<HTMLFormElement> & {
  root?: ReactElement
  name?: string
  label?: ReactElement<HTMLAttributes<HTMLDivElement>>
  variant?: 'single' | 'multi' | undefined
  onChange?: (values: string[]) => any
  items: Array<{ id: string; label: string; value: Value }>
}

export const Pills: FunctionComponent<PillsProps> = ({
  root = <form />,
  onChange,
  label,
  variant,
  name,
  items,
  ...props
}) => {
  const { register, getValues } = useForm({ mode: 'onChange' })

  const handleOnChange = useCallback(() => {
    const _values = getValues()

    const values = Object.entries(_values).reduce((acumm, [key, value]: any) => {
      return value ? [...acumm, value] : [...acumm]
    }, [])

    onChange?.(values)
  }, [])

  return (
    <root.type
      {...root.props}
      {...props}
      onChange={handleOnChange}
      className={classes([style.root, root.props, props.className])}
    >
      {isValidElement(label) && <label.type {...label.props} />}
      <Form.Swatches
        color="secondary"
        name={name}
        variant={variant}
        className={style.swatches}
        items={items?.map(({ id, value, label }) => ({ label, value, ...register(id) }))}
      />
    </root.type>
  )
}
