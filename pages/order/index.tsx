import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'



export default function OrderPage() {
  const {shouldLoadContent} = useRedirectByUserCheck()
  return (
    <>
      <Head>
        <title>BoilerMart | {shouldLoadContent ? 'Оформление заказа' : ''}</title>
        <meta charSet="UTF-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content='width=device-width, initial-scale=1.0' />
        <link rel="icon" type='image/svg' sizes='32x32' href="/img/logo.svg" />
      </Head>
     {shouldLoadContent && (
       <Layout>
       <main>
       <h1>Order</h1>
       <div className="overlay"></div>
      </main>
       </Layout>
     )}
    </>
  )
}
