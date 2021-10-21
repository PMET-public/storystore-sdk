import { FunctionComponent, useState, useCallback, HTMLAttributes, ReactElement } from 'react'
import { useForm } from '../../hooks'
import { Block, Form, Heading, Button } from '../'
import { version } from '../../../package.json'

// Styles
import style from './UIKitSettings.module.css'

// Icons
import StoryStoreIcon from 'remixicon-react/TerminalLineIcon'

export type SettingsValues<T = string> = {
  AEM_HOST: T
  AEM_AUTH: T
  AEM_GRAPHQL_PATH: T
}

export type UIKitSettingsProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  values?: SettingsValues
  placeholders?: SettingsValues
  errors?: SettingsValues<{ message: string }>
  onReset: () => any
  onSubmit: (data: any) => any
}

export const UIKitSettings: FunctionComponent<UIKitSettingsProps> = ({
  root = <div />,
  values = {
    AEM_HOST: '',
    AEM_GRAPHQL_PATH: '',
    AEM_AUTH: '',
  },
  placeholders = {
    AEM_HOST: '',
    AEM_GRAPHQL_PATH: '',
    AEM_AUTH: '',
  },
  children,
  onSubmit,
  onReset,
  errors: _errors,
  ...props
}) => {
  const { register, handleSubmit, formState, watch } = useForm<SettingsValues & { env: SettingsValues<boolean> }>({
    defaultValues: {
      ...values,
      env: {
        AEM_HOST: typeof values.AEM_HOST === 'undefined',
        AEM_AUTH: typeof values.AEM_AUTH === 'undefined',
        AEM_GRAPHQL_PATH: typeof values.AEM_GRAPHQL_PATH === 'undefined',
      },
    },
  })

  const handleOnSubmit = (data: any) => {
    onSubmit?.(data)
  }

  const handleOnReset = () => {
    onReset?.()
  }

  const env = watch('env')

  const errors = { ...(formState.isDirty ? _errors : {}), ...formState.errors }

  return (
    <root.type {...root.props} {...props}>
      <form onSubmit={handleSubmit(handleOnSubmit)} onReset={handleOnReset} noValidate>
        <Block gap="lg">
          <Heading root={<h2 />} size="sm" style={{ display: 'flex', alignItems: 'center' }}>
            <StoryStoreIcon style={{ fill: 'currentcolor', width: '1.5em', marginRight: 'var(--spacing-xs)' }} />
            UIKit v{version}
          </Heading>

          <Block gap="lg">
            <Form.Field>
              <Form.Label error={!!errors?.AEM_HOST}>AEM Host</Form.Label>
              <Form.Input
                error={!!errors?.AEM_HOST}
                placeholder={placeholders.AEM_HOST}
                disabled={env?.AEM_HOST}
                type="url"
                {...register('AEM_HOST', {
                  shouldUnregister: true,
                  required: !env?.AEM_HOST,
                  pattern: {
                    value: /^https?:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/,
                    message: 'Please enter a valid URL.',
                  },
                })}
              />
              <label className={style.checkbox}>
                <input {...register('env.AEM_HOST')} type="checkbox" />
                <span>Use System Value</span>
              </label>
              <Form.Error>{errors?.AEM_HOST?.message}</Form.Error>
            </Form.Field>

            <Form.Field>
              <Form.Label error={!!errors?.AEM_GRAPHQL_PATH}>AEM GraphQl Path</Form.Label>
              <Form.Input
                error={!!errors?.AEM_GRAPHQL_PATH}
                placeholder={placeholders.AEM_GRAPHQL_PATH}
                disabled={env?.AEM_GRAPHQL_PATH}
                {...register('AEM_GRAPHQL_PATH', {
                  shouldUnregister: true,
                  required: !env?.AEM_GRAPHQL_PATH,
                  pattern: {
                    value: /^(.+)\/([^\/]+)$/,
                    message: 'Please enter a valid path.',
                  },
                })}
              />
              <label className={style.checkbox}>
                <input {...register('env.AEM_GRAPHQL_PATH')} type="checkbox" />
                <span>Use System Value</span>
              </label>
              <Form.Error>{errors?.AEM_GRAPHQL_PATH?.message}</Form.Error>
            </Form.Field>

            <Form.Field>
              <Form.Label error={!!errors?.AEM_AUTH}>AEM GraphQL Authentication</Form.Label>
              <Form.Input
                error={!!errors?.AEM_AUTH}
                placeholder={placeholders.AEM_AUTH}
                disabled={env?.AEM_AUTH}
                {...register('AEM_AUTH', { shouldUnregister: true })}
              />
              <label className={style.checkbox}>
                <input {...register('env.AEM_AUTH')} type="checkbox" />
                <span>Use System Value</span>
              </label>
              <Form.Error>{errors?.AEM_AUTH?.message}</Form.Error>
            </Form.Field>
          </Block>

          <Block gap="sm" align="end" columns="auto auto auto">
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="secondary" type="reset">
              Reset
            </Button>
          </Block>
        </Block>
      </form>
    </root.type>
  )
}

export const useUIKitSettings = (defaultValues?: SettingsValues) => {
  const [values, setValues] = useState<SettingsValues | undefined>(defaultValues)

  const [errors, setErrors] = useState<SettingsValues<{ message: string }> | undefined>()

  const handleSubmit = useCallback(values => {
    setValues(values)
  }, [])

  const handleReset = useCallback(() => {
    setValues(undefined)
    setErrors(undefined)
  }, [])

  return {
    values,
    errors,
    onSubmit: handleSubmit,
    onReset: handleReset,
  }
}
