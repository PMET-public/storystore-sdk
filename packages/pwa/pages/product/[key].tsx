import { NextPage } from 'next'
import { useRouter } from 'next/router'

const ProductPage: NextPage = ({ ...props }) => {
  const router = useRouter()
  const { key } = router.query

  return <h1>Product: {key}</h1>
}

export default ProductPage
