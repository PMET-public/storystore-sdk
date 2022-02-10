import { NextPage } from 'next'
import { Banner, Block, Button, Carousel, Heading, Link, Price, Tile, TileSkeleton } from '@storystore/ui-kit'
import { useQuery } from '@apollo/client'
import NextImage from '../../../../../components/NextImage'

// GraphQl Query
import HOME_QUERY from './index.graphql'

const HomePage: NextPage = () => {
  const { loading, data, error } = useQuery(HOME_QUERY)

  const adventures = data?.adventureList?.items
  const products = data?.products?.items

  return (
    <Block gap={{ sm: 'lg', md: 'xl' }}>
      <Banner
        height={{ sm: '70vh', md: '80vh' }}
        backgroundImage={<NextImage src="/Hero.jpeg" layout="fill" alt="" />}
        heading={
          <Heading
            size="5xl"
            style={{
              ['--heading-size-sm' as string]: 'calc(100vw / 15)',
              ['--heading-size-md' as string]: 'calc(100vw / 27)',
              ['--heading-size-lg' as string]: 'calc(100vw / 25)',
            }}
          >
            Not all who wander are lost.
          </Heading>
        }
        button={
          <Button root={<Link href={`${process.env.NEXT_PUBLIC_HOME_PATH}/adventures`} />}>View Adventures</Button>
        }
        align="left"
        vAlign="middle"
        contained
      />

      {/* Adventures */}
      <Block gap="md" contained padded>
        <Heading size={{ sm: 'xl', md: '2xl' }}>For the outdoor kind.</Heading>

        <Carousel show={{ sm: 1, md: 2, lg: 3 }} gap="sm" peak>
          {adventures?.map(
            ({ _path, adventureTitle, adventureTripLength, adventureActivity, adventurePrimaryImage }) => (
              <Tile
                key={_path}
                root={<Link href={`${process.env.NEXT_PUBLIC_HOME_PATH}/adventures/adventure?path=${_path}`} />}
                image={<NextImage src={adventurePrimaryImage._path} width={500} height={500} alt={adventureTitle} />}
                heading={<Heading>{adventureTitle}</Heading>}
                tags={[`${adventureTripLength} ${adventureActivity}`]}
              />
            )
          ) || [
            <TileSkeleton key={0} uniqueKey="0" animate={loading} imageWidth={500} imageHeight={500} />,
            <TileSkeleton key={1} uniqueKey="1" animate={loading} imageWidth={500} imageHeight={500} />,
            <TileSkeleton key={2} uniqueKey="2" animate={loading} imageWidth={500} imageHeight={500} />,
            <TileSkeleton key={3} uniqueKey="3" animate={loading} imageWidth={500} imageHeight={500} />,
          ]}
        </Carousel>
      </Block>
    </Block>
  )
}

export default HomePage
