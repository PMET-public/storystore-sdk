import { gql, ServerError, useQuery } from '@apollo/client'
import { Block, Error, Link, Pills, Tile, TileSkeleton } from '@storystore/ui-kit'
import { useNetworkStatus } from '@storystore/ui-kit/hooks'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import NextImage from '../../../../../../components/NextImage'

// GraphQL Query
import ADVENTURES_QUERY from './adventures.graphql'

const AdventuresPage: NextPage = () => {
  // Get current pathname for links
  const { asPath } = useRouter()

  const getAdventureLink = useCallback(
    (path: string) => {
      const pathname = asPath.split('.html')?.[0]
      return pathname + path
    },
    [asPath]
  )

  // Network Online/Offline State
  const online = useNetworkStatus()

  //   Filters
  const [filter, setFilter] = useState({})

  const handleOnFilterUpdate = useCallback(values => {
    const _expressions = values.map((value: string) => ({ value }))

    setFilter({ adventureActivity: { _expressions } })
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
            root={<Link href={getAdventureLink(_path)} />}
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
