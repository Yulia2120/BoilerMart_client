import Layout from '@/components/layout/Layout'
import ContactsPage from '@/components/templates/ContactsPage/ContactsPage'
import Head from 'next/head'

function WholesaleBuyers() {

    return(
        <>
        <Head>
        <title>BoilerMart | Оптовым покупателям</title>
        <meta charSet="UTF-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content='width=device-width, initial-scale=1.0' />
        <link rel="icon" type='image/svg' sizes='32x32' href="/img/logo.svg" />
      </Head>
      <Layout>
       <main>
      <ContactsPage isWholesaleBuersPage={true}/>
       <div className="overlay"></div>
      </main>
       </Layout>
        </>
    )
}

export default WholesaleBuyers