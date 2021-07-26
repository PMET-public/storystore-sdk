import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

export const HOME_QUERY = gql`
  query HOME_QUERY {
    articleList {
      items {
        author
      }
    }
  }
`

const Home = () => {
  const { loading, data, error } = useQuery(HOME_QUERY)

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>There was an issue.</h1>

  return (
    <section>
      <h2>Articles</h2>
      {data.articleList?.items.map(({ author }: any, id: number) => (
        <article key={id}>
          <h2>{author}</h2>
        </article>
      ))}
    </section>
  )
}

export default Home
