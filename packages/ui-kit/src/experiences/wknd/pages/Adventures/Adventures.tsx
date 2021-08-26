import { FunctionComponent } from 'react'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import style from './Adventures.module.css'
import Error from '../../../../components/Error'
import View from '../../../../components/View'
import Grid from '../../../../components/Grid'
import Tile, { TileSkeleton } from '../../../../components/Tile'
import Link from '../../../../components/Link'
import Swatches from '../../../../components/Form/Swatches'
import Heading from '../../../../components/Heading'
import { useForm } from 'react-hook-form'

export type AdventuresProps = {}

export const ADVENTURES_QUERY = gql`
  query ADVENTURES_QUERY($filter: AdventureModelFilter) {
    adventureList(filter: $filter) {
      items {
        id: _path
        adventureActivity
        adventureTitle
        adventureTripLength
        adventurePrimaryImage {
          ... on ImageRef {
            id: _path
            src: _path
          }
        }
      }
    }
  }
`

export const Adventures: FunctionComponent<AdventuresProps> = ({}) => {
  const { register, getValues } = useForm({ mode: 'onChange' })

  const { error, data, loading, refetch } = useQuery(ADVENTURES_QUERY)

  const handleOnFilterUpdate = () => {
    const values = getValues()

    const filter = Object.keys(values.filter).reduce((accum, key) => {
      const item = values.filter[key]

      if (!item) return {} // ALL

      return {
        ...accum,
        [key]: {
          _logOp: 'OR',
          _expressions: item?.split(',').map((value: string) => ({ value: value || undefined })) || [],
        },
      }
    }, {})

    refetch({ filter }).then(() => {
      window.scrollTo(0, 0) // reset scroll
    })
  }

  if (error) return <Error status={(error.networkError as any)?.response?.status} style={{ height: '100%' }} />

  return (
    <View padded className={style.root}>
      <form onChange={handleOnFilterUpdate} className={style.filter}>
        <Swatches
          name="filters"
          variant="single"
          items={[
            { label: 'All', value: '', ...register('filter.adventureActivity') },
            { label: 'Rock Climbing', value: 'Rock Climbing', ...register('filter.adventureActivity') },
            { label: 'Cycling', value: 'Cycling', ...register('filter.adventureActivity') },
            { label: 'Skiing', value: 'Skiing', ...register('filter.adventureActivity') },
            { label: 'Surfing', value: 'Surfing', ...register('filter.adventureActivity') },
            { label: 'Travel', value: ['Social', 'Camping'], ...register('filter.adventureActivity') },
          ]}
        />
      </form>

      <Grid gap="md" columns={{ sm: '1fr', md: '1fr 1fr ', lg: '1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr' }}>
        {loading
          ? Array(5)
              .fill(null)
              .map((_, key) => (
                <TileSkeleton key={key} uniqueKey={`adventure--${key}`} className={style.tile} surface />
              ))
          : data.adventureList.items.map(
              ({ id, adventurePrimaryImage, adventureTitle, adventureTripLength, adventureActivity }: any) => (
                <Tile
                  root={<Link href={id} />}
                  className={style.tile}
                  key={id}
                  image={
                    <img
                      loading="lazy"
                      src={'/__aem' + adventurePrimaryImage?.src}
                      width={400}
                      height={400}
                      alt={adventureTitle}
                    />
                  }
                  heading={<Heading root={<h3 />}>{adventureTitle}</Heading>}
                  tags={[`${adventureTripLength} ${adventureActivity}`]}
                  surface
                />
              )
            )}
      </Grid>
    </View>
  )
}
