import { useQuery } from '@apollo/client'
import View from '../../../components/View'
import Banner from '../../../components/Banner'
import gql from 'graphql-tag'
import { FunctionComponent } from 'react'

export const HOME_QUERY = gql`
  query HOME_QUERY {
    articleList {
      items {
        author
      }
    }
  }
`

const Home: FunctionComponent = () => {
  const { loading, data, error } = useQuery(HOME_QUERY)

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>There was an issue.</h1>

  return (
    <>
      <Banner />
      <View contained padded>
        <section>
          <h2>Articles</h2>
          {data.articleList?.items.map(({ author }: any, id: number) => (
            <article key={id}>
              <h2>{author}</h2>
            </article>
          ))}
        </section>
      </View>
    </>
  )
}

export default Home
