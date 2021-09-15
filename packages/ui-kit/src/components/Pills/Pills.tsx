import { FunctionComponent, useCallback, HTMLAttributes, ReactElement } from 'react'
import { useForm } from '../../hooks'
import { Form } from '..'
import { classes } from '../../lib'

// Styles
import style from './Pills.module.css'

type Value = string | string[] | number | number[]

export type PillsProps = HTMLAttributes<HTMLFormElement> & {
  root?: ReactElement
  variant?: 'single' | 'multi' | undefined
  onChange?: (values: { [key: string]: Value }) => any
  items: Array<{ id: string; label: string; value: Value }>
}

export const Pills: FunctionComponent<PillsProps> = ({ root = <form />, onChange, variant, items, ...props }) => {
  const { register, getValues } = useForm({ mode: 'onChange' })

  const handleOnChange = useCallback(() => {
    const _values = getValues()

    const values = Object.entries(_values).reduce((acumm, [key, _value]: any) => {
      const value = _value.split(',')
      return { ...acumm, [key]: value.length > 1 ? value : value[0] }
    }, {})

    onChange?.(values)
  }, [])

  return (
    <root.type
      {...root.props}
      {...props}
      onChange={handleOnChange}
      className={classes([style.root, root.props, props.className])}
    >
      <Form.Swatches
        name="pills"
        variant={variant}
        className={style.swatches}
        items={items?.map(({ id, value, label }) => ({ label, value, ...register(id) }))}
      />
    </root.type>
  )
}
