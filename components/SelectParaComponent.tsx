import randomWords from "random-words"
import Link from "next/link"
import { useEffect } from "react"
import useStore, { IState } from "../store"

const SelectParaComponent = (): JSX.Element => {
  const paragraph = useStore((state: IState): string => state.paragraph)
  const setParagraph = useStore((state: IState): ((paragraph: string) => void) => state.setParagraph)

  useEffect(() => {
    setParagraph(randomWords({ exactly: 100, join: " " }))
  }, [setParagraph])

  return (
    <div>
      <h1>Use default or Choose test paragraph</h1>

      <textarea
        data-testid="init-paragraph"
        className=" min-h-[25rem] font-bold p-4 min-w-full md:min-w-[30rem] border rounded outline-none"
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
      />

      <div className="flex space-x-4 justify-end">
        <Link href="/challenge/select-timer">
          <button data-testid="use-para" className="border font-bold py-2 px-4 rounded">
            use paragraph
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SelectParaComponent
