import { addons, types } from '@storybook/addons'
import { useParameter } from '@storybook/api'
import { AddonPanel, Form } from '@storybook/components'
import { useCallback } from 'react'
import { ADDON_ID, useStoryStateVariables, Params } from '../lib'
import { styled } from '@storybook/theming'

const PANEL_ID = `${ADDON_ID}/panel`

export type VariablesPanelProps = {
  params: Params
}

const Root = styled.div`
  padding: 1rem 0;
`

const FormWrapper = styled(Form)`
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-gap: 0.5rem;
  width: 100%;
`

const NoVariablesWrapper = styled.div(({ theme }) => ({
  background: theme.background.warning,
  color: theme.color.darkest,
  padding: '10px 15px',
  lineHeight: '20px',
  boxShadow: `${theme.appBorderColor} 0 -1px 0 0 inset`,
}))

const VariablesPanel = ({ params }: VariablesPanelProps) => {
  const [state, setState] = useStoryStateVariables(params)

  const handleOnSave = useCallback(
    e => {
      e.preventDefault()
      const { name } = e.target.dataset
      const input = e.target.elements[name]
      const newValues = { ...state, [name]: input.value }
      setState(newValues)
    },
    [state, setState]
  )

  const handleOnReset = useCallback(
    e => {
      e.preventDefault()
      const { name, defaultValue } = e.target.dataset
      const newValues = { ...state, [name]: defaultValue }
      setState(newValues)
    },
    [state, setState]
  )

  return (
    <Root>
      {Object.entries(params.fields).map(([name, { label = name, defaultValue, ...props }]) => {
        return (
          <Form.Field key={name} label={label}>
            <FormWrapper
              onSubmit={handleOnSave}
              onReset={handleOnReset}
              data-name={name}
              data-default-value={defaultValue}
            >
              <Form.Input key={state[name]} name={name} size="100%" defaultValue={state[name]} {...props} />

              <Form.Button type="submit">Save</Form.Button>
              <Form.Button type="reset" disabled={state[name] === defaultValue}>
                Reset
              </Form.Button>
            </FormWrapper>
          </Form.Field>
        )
      })}
    </Root>
  )
}

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title() {
      const params: Params = useParameter('variables')
      const title = params?.title || 'Variables'
      const count = Object.keys(params?.fields || {}).length
      return `${title} (${count})`
    },
    render: ({ active = false, key }) => {
      const params: Params = useParameter('variables')

      return (
        <AddonPanel active={active} key={key}>
          {params?.fields ? (
            <VariablesPanel params={params} />
          ) : (
            <NoVariablesWrapper> This story is not configured to handle variables.</NoVariablesWrapper>
          )}
        </AddonPanel>
      )
    },
  })
})
