import { FunctionComponent, useState, useCallback, HTMLAttributes, ReactElement } from 'react'
import { useForm } from '../../hooks'
import { Block, Form, Heading, Button } from '../'
import { version } from '../../../package.json'
import StoryStoreIcon from 'remixicon/icons/Development/terminal-line.svg'

export type SettingsValues<T = string> = {
  AEM_GRAPHQL_URL: T
  AEM_GRAPHQL_AUTH: T
}

export type UIKitSettingsProps = HTMLAttributes<HTMLDivElement> & {
  root?: ReactElement
  values?: SettingsValues
  placeholders?: SettingsValues
  errors?: SettingsValues<{ message: string }>
  onSubmit: (data: any) => any
  onReset: () => any
}

export const UIKitSettings: FunctionComponent<UIKitSettingsProps> = ({
  root = <div />,
  values = {
    AEM_GRAPHQL_URL: '',
    AEM_GRAPHQL_AUTH: '',
  },
  placeholders = {
    AEM_GRAPHQL_URL: '',
    AEM_GRAPHQL_AUTH: '',
  },
  children,
  onSubmit,
  onReset,
  errors: _errors,
  ...props
}) => {
  const { register, handleSubmit, formState } = useForm()

  const handleOnSubmit = (data: any) => {
    onSubmit?.(data)
  }

  const handleOnReset = () => {
    onReset?.()
  }

  const errors = { ...(formState.isDirty ? _errors : {}), ...formState.errors }

  return (
    <root.type {...root.props} {...props}>
      <form onSubmit={handleSubmit(handleOnSubmit)} onReset={handleOnReset}>
        <Block gap="lg">
          <Heading root={<h2 />} size="sm" style={{ display: 'flex', alignItems: 'center' }}>
            <StoryStoreIcon style={{ fill: 'currentcolor', width: '1.5em', marginRight: 'var(--spacing-xs)' }} />
            UIKit v{version}
          </Heading>

          <Block gap="lg">
            <Form.Field>
              <Form.Label error={!!errors?.AEM_GRAPHQL_URL}>AEM GraphQL Endpoint URL</Form.Label>
              <Form.Input
                error={!!errors?.AEM_GRAPHQL_URL}
                placeholder={placeholders.AEM_GRAPHQL_URL}
                defaultValue={values.AEM_GRAPHQL_URL}
                {...register('AEM_GRAPHQL_URL', {
                  shouldUnregister: true,
                  required: 'Please enter the GraphQL endpoint URL to your AEM environment.',
                  pattern: {
                    value: /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/,
                    message: 'Please enter a valid URL.',
                  },
                })}
              />
              <Form.Error>{errors?.AEM_GRAPHQL_URL?.message}</Form.Error>
            </Form.Field>

            <Form.Field>
              <Form.Label error={!!errors?.AEM_GRAPHQL_AUTH}>AEM GraphQL Authentication</Form.Label>
              <Form.Input
                error={!!errors?.AEM_GRAPHQL_AUTH}
                placeholder={placeholders.AEM_GRAPHQL_AUTH}
                defaultValue={values.AEM_GRAPHQL_AUTH}
                {...register('AEM_GRAPHQL_AUTH', { shouldUnregister: true })}
              />
              <Form.Error>{errors?.AEM_GRAPHQL_AUTH?.message}</Form.Error>
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

export const useUIKitSettings = () => {
  const [values, setValues] = useState<SettingsValues>()

  const [errors, setErrors] = useState<SettingsValues<{ message: string }> | undefined>()

  const handleReset = useCallback(() => {
    setValues(undefined)
    setErrors(undefined)
  }, [])

  const handleClearErrors = useCallback(() => {
    setErrors(undefined)
  }, [])

  return {
    values,
    errors,
    setValues,
    setErrors,
    clearErrors: handleClearErrors,
    reset: handleReset,
  }
}
