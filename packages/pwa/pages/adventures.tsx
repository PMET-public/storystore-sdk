import { NextPage } from 'next'
import { Adventures } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { Block, Pills } from '@storystore/ui-kit/components'
import { useState } from 'react'

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

export default AdventuresPage
