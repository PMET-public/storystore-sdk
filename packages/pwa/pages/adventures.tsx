import { GetServerSideProps, NextPage } from 'next'
import { Adventures } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { Block, Pills } from '@storystore/ui-kit/components'
import { useState } from 'react'
import { trackEvent } from '../lib/tracker'
import { APP_AEM_MODEL_PAGE_PATH } from '@storystore/ui-kit/dist/experiences/wknd/components'
import { getPropsFromAEMModel, getThemePropsFromAEMModel } from '@storystore/ui-kit/lib'

const AdventuresPage: NextPage = props => {
  const [filters, setFilters] = useState({})

  const handleOnFilterUpdate = (values: any) => {
    const _filters = Object.keys(values).reduce((accum, key) => {
      const _item = values[key]

      if (!_item) return {} // ALL

      const item = Array.isArray(_item) ? _item : [_item]

      return {
        ...accum,
        [key]: {
          _logOp: 'OR',
          _expressions: item?.map((value: string) => ({ value: value || undefined })) || [],
        },
      }
    }, {})

    setFilters(_filters)

    /** Track reset variables */
    trackEvent({
      category: 'Adventures',
      action: 'Filtered',
      label: values.adventureActivity,
    })
  }

  return (
    <Block rows="auto 1fr" padded style={{ height: '100%' }}>
      <Pills
        variant="single"
        items={[
          { label: 'All', value: '', id: 'adventureActivity' },
          { label: 'Rock Climbing', value: 'Rock Climbing', id: 'adventureActivity' },
          { label: 'Cycling', value: 'Cycling', id: 'adventureActivity' },
          { label: 'Skiing', value: 'Skiing', id: 'adventureActivity' },
          { label: 'Surfing', value: 'Surfing', id: 'adventureActivity' },
          { label: 'Travel', value: ['Social', 'Camping'], id: 'adventureActivity' },
        ]}
        onChange={handleOnFilterUpdate}
      />
      <div>
        <Adventures filter={filters} {...props} />
      </div>
    </Block>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  /** Get AEM Model */
  const model = await fetch(new URL(APP_AEM_MODEL_PAGE_PATH + '.model.json', process.env.NEXT_PUBLIC_URL).href, {
    headers: { cookie: req.headers.cookie },
  })
    .then(async res => await res.json())
    .catch(() => undefined)

  return {
    props: { model: getPropsFromAEMModel(model), theme: getThemePropsFromAEMModel(model) },
  }
}

export default AdventuresPage
