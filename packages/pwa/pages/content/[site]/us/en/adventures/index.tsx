import { ServerError, useQuery } from '@apollo/client'
import { Block, Error, Link, Pills, Tile, TileSkeleton } from '@storystore/ui-kit'
import { useNetworkStatus } from '@storystore/ui-kit/hooks'
import { ModelManager } from '@adobe/aem-spa-page-model-manager'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import NextImage from '../../../../../../components/NextImage'
import { addApolloState, initializeApollo } from '../../../../../../lib/apollo/client'

// GraphQL Query
import ADVENTURES_QUERY from './adventures.graphql'

// Styles
import styles from './adventures.module.css'

const AdventuresPage: NextPage = () => {
  // Get current pathname for links
  const { asPath } = useRouter()

  const getAdventureLink = useCallback(
    (path: string) => {
      const pathname = asPath.split('.html')?.[0]
      return pathname + '/adventure?path=' + path
    },
    [asPath]
  )

  // Network Online/Offline State
  const online = useNetworkStatus()

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
        className={styles.filters}
        variant="single"
        items={[
          { label: 'All', value: '', id: 'adventureActivity' },
          { label: 'Rock Climbing', value: 'Rock Climbing', id: 'adventureActivity' },
          { label: 'Cycling', value: 'Cycling', id: 'adventureActivity' },
          { label: 'Skiing', value: 'Skiing', id: 'adventureActivity' },
          { label: 'Surfing', value: 'Surfing', id: 'adventureActivity' },
          { label: 'Social', value: 'Social', id: 'adventureActivity' },
          { label: 'Camping', value: 'Camping', id: 'adventureActivity' },
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
              <TileSkeleton uniqueKey="0" animate={loading} />
              <TileSkeleton uniqueKey="1" animate={loading} />
              <TileSkeleton uniqueKey="2" animate={loading} />
              <TileSkeleton uniqueKey="3" animate={loading} />
              <TileSkeleton uniqueKey="4" animate={loading} />
              <TileSkeleton uniqueKey="5" animate={loading} />
              <TileSkeleton uniqueKey="6" animate={loading} />
              <TileSkeleton />
            </>
          ))}
      </Block>
    </Block>
  )
}

/** Server-Side Rendering */
export const getServerSideProps: GetServerSideProps = async ({ resolvedUrl }) => {
  const apolloClient = initializeApollo()

  const props: any = {}

  try {
    const [pageModel] = await Promise.all([
      ModelManager.getData(resolvedUrl.split('?')[0]),
      apolloClient.query({
        query: ADVENTURES_QUERY,
        variables: { filter: {} },
      }),
    ])

    props.pageModel = pageModel
  } catch (error) {
    console.error(error)
  }

  return addApolloState(apolloClient, {
    props,
  })
}

export default AdventuresPage
