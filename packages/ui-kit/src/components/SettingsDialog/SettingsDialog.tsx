import { FunctionComponent, useEffect, useState } from 'react'
import { cookies } from '@storystore/toolbox'
import { useForm } from '../../hooks'
import { Block, Dialog, DialogProps, Form, Heading, Button } from '../'
import { version } from '../../../package.json'
import StoryStoreIcon from 'remixicon/icons/Development/terminal-line.svg'

export type SettingsValues = {
  AEM_GRAPHQL_URL: string
  AEM_GRAPHQL_AUTH: string
}

export type SettingsDialogProps = {
  defaultValues: SettingsValues
  onSubmit: (data: any) => any
  onReset: () => any
} & DialogProps

export const SettingsDialog: FunctionComponent<SettingsDialogProps> = ({
  root = <div />,
  defaultValues = {
    AEM_GRAPHQL_URL: '',
    AEM_GRAPHQL_AUTH: '',
  },
  children,
  onSubmit,
  onReset,
  ...props
}) => {
  const [values, setValues] = useState<SettingsValues>(defaultValues)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleOnSubmit = (data: any) => {
    cookies.set('STORYSTORE_SETTINGS', JSON.stringify(data), 365)
    setValues(data)
    onSubmit?.(data)
  }

  const handleOnReset = (data: any) => {
    setValues(defaultValues)
    cookies.remove('STORYSTORE_SETTINGS')
    onReset?.()
  }

  useEffect(() => {
    const userValues = cookies.get('STORYSTORE_SETTINGS')
    setValues(userValues ? JSON.parse(userValues) : defaultValues)
  }, [])

  return (
    <Dialog root={<form onSubmit={handleSubmit(handleOnSubmit)} />} onReset={handleOnReset} {...props}>
      <Block gap="lg">
        <Heading root={<h2 />} size="sm" style={{ display: 'flex', alignItems: 'center' }}>
          <StoryStoreIcon style={{ fill: 'currentcolor', width: '1.5em', marginRight: 'var(--spacing-xs)' }} /> UIKit v
          {version}
        </Heading>

        <Block gap="lg">
          <Form.Field>
            <Form.Label error={!!errors?.AEM_GRAPHQL_URL}>AEM GraphQL Endpoint URL</Form.Label>
            <Form.Input
              error={!!errors?.AEM_GRAPHQL_URL}
              placeholder="http://domain:port/content/graphql/global/endpoint.json"
              defaultValue={values.AEM_GRAPHQL_URL}
              {...register('AEM_GRAPHQL_URL')}
            />
            <Form.Error>{errors?.AEM_GRAPHQL_URL?.message}</Form.Error>
          </Form.Field>

          <Form.Field>
            <Form.Label error={!!errors?.AEM_GRAPHQL_AUTH}>AEM GraphQL Authentication</Form.Label>
            <Form.Input
              error={!!errors?.AEM_GRAPHQL_AUTH}
              placeholder="username:password"
              defaultValue={values.AEM_GRAPHQL_AUTH}
              {...register('AEM_GRAPHQL_AUTH')}
            />
            <Form.Error>{errors?.AEM_GRAPHQL_AUTH?.message}</Form.Error>
          </Form.Field>
        </Block>

        <Block gap="md" align="end" columns="auto auto auto">
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="secondary" type="reset">
            Reset
          </Button>
        </Block>
      </Block>
    </Dialog>
  )
}
