import { FunctionComponent, useEffect } from 'react'
import { AdventuresProps } from './Adventures.d'
import { gql, ServerError, useQuery } from '@apollo/client'
import { classes } from '../../../../lib'
import { Error, Block } from '../../../../components'
import { AdventureTile } from '../../components'
import { useNetworkStatus } from '../../../../hooks'

// Styles
import style from './Adventures.module.css'

// GraphQL Query
export const ADVENTURES_QUERY = gql`
  query ADVENTURES_QUERY($filter: AdventureModelFilter) {
    adventureList(filter: $filter) {
      items {
        id: _path
        _path
        adventureActivity
        adventureTitle
        adventureTripLength
        adventurePrimaryImage {
          ... on ImageRef {
            id: _path
            _path
          }
        }
      }
    }
  }
`

export const Adventures: FunctionComponent<AdventuresProps> = ({ filter }) => {
  // GraphQL Data
  const { error, data, loading, previousData } = useQuery(ADVENTURES_QUERY, {
    variables: { filter },
  })

  // Network Online/Offline State
  const online = useNetworkStatus()

  useEffect(() => {
    if (previousData) window.scrollTo(0, 0) // scroll to the top on data change
  }, [previousData])

  // Error View
  if (error) {
    const status = (error.networkError as ServerError).statusCode
    return <Error status={online ? status : 'Offline'} />
  }

  // Adventures List
  const adventures = loading ? Array(5).fill({ loading }) : data?.adventureList?.items

  return (
    <Block
      className={style.root}
      gap="md"
      columns={{ sm: '1fr', md: '1fr 1fr ', lg: '1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr' }}
    >
      {adventures.map(({ ...adventure }: any, key: number) => (
        <AdventureTile
          key={adventure._path ?? key}
          className={classes([style.tile, [style.more, adventures.length > 3]])}
          {...adventure}
        />
      ))}
    </Block>
  )
}
