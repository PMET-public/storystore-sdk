import { gql, useQuery } from '@apollo/client'

export const PAST_LAUNCHES_QUERY = gql`
  query PAST_LAUNCHES {
    launchesPast(limit: 10) {
      id
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
      launch_site {
        site_name_long
      }
    }
  }
`

export const Launches = () => {
  const { loading, error, data } = useQuery(PAST_LAUNCHES_QUERY)

  if (loading) return <div>⏱ Loading...</div>

  if (error) return <div>😖 {error.message}</div>

  return (
    <>
      <h1>Last 10 SpaceX Launches</h1>

      <section style={{ display: 'grid', gridGap: '20px' }}>
        {data.launchesPast.map(({ id, mission_name, launch_date_local, rocket, launch_site }) => (
          <article key={id}>
            📄 <strong>{mission_name}</strong>
            <br />
            🗓
            <span>{new Date(launch_date_local).toLocaleDateString()}</span>
            <br />
            🚀 {rocket.rocket_name} / {launch_site.site_name_long}
          </article>
        ))}
      </section>
    </>
  )
}
