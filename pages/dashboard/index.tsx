import Layout from '@/components/layout/Layout'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import DashboardPage from '@/components/templates/DashboardPage/DashboardPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'



export default function Dashboard() {
  const {shouldLoadContent} = useRedirectByUserCheck()
  const getDefaultTextGenerator = () => ''
  const getTextGenerator = () => ''
   
  return (
    <>
      <Head>
        <title>BoilerMart | {shouldLoadContent ? 'Главная' : ''}</title>
        <meta charSet="UTF-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content='width=device-width, initial-scale=1.0' />
        <link rel="icon" type='image/svg' sizes='32x32' href="/img/logo.svg" />
      </Head>
     {shouldLoadContent && (
       <Layout>
       <main>
        <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
        />
       <DashboardPage/>
       <div className="overlay"></div>
      </main>
       </Layout>
     )}
    </>
  )
}
