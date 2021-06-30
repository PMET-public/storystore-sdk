import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const ADVENTURES_LIST_QUERY = gql`
  query ADVENTURES_LIST_QUERY {
    adventureList {
      items {
        id: _path
        adventureTitle
      }
    }
  }
`

const IndexPage = () => {
  const { loading, data, error } = useQuery(ADVENTURES_LIST_QUERY)

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>There was an issue.</h1>

  return (
    <ul>
      {data.adventureList.items.map(({ id, adventureTitle }) => (
        <li key={id}>{adventureTitle}</li>
      ))}
    </ul>
  )
}

export default IndexPage
