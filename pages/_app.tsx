import "../styles/globals.css"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import ErrorBoundary from "../components/ErrorBoundary"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
