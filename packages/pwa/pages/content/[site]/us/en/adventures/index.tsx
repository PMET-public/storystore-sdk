import { ServerError, useQuery } from '@apollo/client'
import { Block, Error, Pills, Tile, TileSkeleton } from '@storystore/ui-kit'
import { useNetworkStatus } from '@storystore/ui-kit/hooks'
import { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import NextImage from '../../../../../../components/NextImage'

// GraphQL Query
import ADVENTURES_QUERY from './adventures.graphql'

const AdventuresPage: NextPage = () => {
  // Network Online/Offline State
  const online = useNetworkStatus()

  //   Filters
  const [filter, setFilter] = useState({})

  const handleOnFilterUpdate = useCallback((values: any) => {
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

    console.log(_filters)

    setFilter(_filters)
  }, [])

  // GraphQL Data
  const { error, data, loading, previousData } = useQuery(ADVENTURES_QUERY, {
    variables: { filter },
  })

  // Scroll to the top on data change
  useEffect(() => {
    if (previousData) window.scrollTo(0, 0) // scroll to the top on data change
  }, [previousData])

  // Error View
  if (error) {
    const status = (error.networkError as ServerError)?.statusCode
    return <Error status={online ? status : 'Offline'} />
  }

  const adventures = data?.adventureList?.items

  return (
    <Block rows="auto 1fr" padded style={{ height: '100%' }} contained>
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

      <Block gap="md" columns={{ sm: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' }}>
        {adventures?.map(({ _path, adventureTitle, adventureActivity, adventureTripLength, adventurePrimaryImage }) => (
          <Tile
            key={_path}
            heading={adventureTitle}
            subheading={`${adventureTripLength} ${adventureActivity}`}
            image={<NextImage src={adventurePrimaryImage._path} alt={adventureTitle} width={400} height={400} />}
          />
        )) ||
          (loading && (
            <>
              <TileSkeleton />
              <TileSkeleton />
              <TileSkeleton />
              <TileSkeleton />
              <TileSkeleton />
              <TileSkeleton />
              <TileSkeleton />
              <TileSkeleton />
            </>
          ))}
      </Block>
    </Block>
  )
}

export default AdventuresPage
