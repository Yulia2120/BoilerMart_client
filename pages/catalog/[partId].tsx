import { getBoilerPartFx } from '@/app/api/boilerParts'
import Layout from '@/components/layout/Layout'
import PartPage from '@/components/templates/PartPage/PartPage'
import { $boilerPart, setBoilerPart } from '@/context/boilerPart'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import { useStore } from 'effector-react'
import Head from 'next/head'
import router from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'



 function CatalogPartPage({query}: {query: IQueryParams}) {
    //страница для авторизованного пользователя
  const {shouldLoadContent} = useRedirectByUserCheck()
  const boilerPart = useStore($boilerPart)

    useEffect(() => {
        loadBoilerPart()
    }, [router.asPath])

  const loadBoilerPart = async () => {
    try {
        const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`)

        setBoilerPart(data)
    } catch (error) {
        toast.error((error as Error).message)
    }
  }
  
  return (
    <>
      <Head>
        <title>Boiler Mart | {shouldLoadContent ? boilerPart.name : ''}</title>
        <meta charSet="UTF-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content='width=device-width, initial-scale=1.0' />
        <link rel="icon" type='image/svg' sizes='32x32' href="/img/logo.svg" />
      </Head>
     {shouldLoadContent && (
       <Layout>
       <main>
             <PartPage/>
       <div className="overlay"/>
      </main>
       </Layout>
     )}
    </>
  )
}

export async function getServerSideProps(context: {query: IQueryParams}){
  return {
    props: {query: {...context.query}},
  }
}

export default CatalogPartPage
  