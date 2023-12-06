import Layout from './layout'
import './styles.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>

      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp;
