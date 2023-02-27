import Head from 'next/head'
import AuthComponent from './components/auth'

export const Auth = () => {
  return (
    <>
      <Head>
        <title>Auth</title>
        <meta name="description" content="For watching movies, you should sign in" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Auth</div>
      <AuthComponent />
    </>
  )
}

export default Auth