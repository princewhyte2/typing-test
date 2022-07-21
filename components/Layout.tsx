import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "react-feather"

const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  const handleClick = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  return (
    <header className="h-28 border-b shadow-sm">
      <div className="px-4 h-full sm:px-6 py-4 flex items-center justify-between container mx-auto">
        <Link href={"/"}>
          <h1 className=" cursor-pointer  animate-pulse font-Pacifico font-bold text-3xl">Typing-test...</h1>
        </Link>
        <button className=" border  font-bold py-2 px-4 rounded" onClick={handleClick}>
          {currentTheme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  )
}

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="min-h-screen font-Roboto  flex flex-col bg-white text-black dark:text-white dark:bg-black">
      <Header />
      <main className="container max-w-2xl flex items-center justify-center mx-auto px-4 sm:px-6 flex-1">
        {children}
      </main>
    </div>
  )
}

export default Layout
