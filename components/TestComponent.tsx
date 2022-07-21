import { AnimatePresence, motion } from "framer-motion"
import { Dialog } from "@headlessui/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import useStore, { IState } from "../store"
import { calculatePercentage } from "../utils"

const TestComponent = (): JSX.Element => {
  const paragraph = useStore((state: IState): string => state.paragraph)
  const [inputValue, setInputValue] = useState((): string => "")
  const timer = useStore((state: IState): number => state.timer)
  const setTimer = useStore((state: IState): ((timer: number) => void) => state.setTimer)
  const [inProgress, setInProgress] = useState(false)
  let [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  //onmount start countdown
  useEffect(() => {
    //if game is in progress, start countdown
    if (inProgress) {
      //if timer is 0, game is over
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer(timer - 1)
        }, 1000)
        return () => clearInterval(interval)
      } else {
        //game is over
        setInProgress(false)
        setIsOpen(true)
      }
    }
    //clear interval
  }, [inProgress, setTimer, timer])

  function closeModal() {
    setIsOpen(false)
    //reset timer
    setTimer(60)
    //reset input value
    setInputValue("")
    //reset in progress
    setInProgress(false)
    //navigate to home
    router.push("/")
  }

  function openModal() {
    setIsOpen(true)
  }

  //calculate total correct words matching the paragraph
  const totalCorrectWords = (): number => {
    let totalCorrectWords = 0
    const words = paragraph.split(" ")
    const inputWords = inputValue.split(" ")

    words.forEach((word: string, index: number): void => {
      if (word === inputWords[index]) {
        totalCorrectWords++
      }
    })

    return totalCorrectWords
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    //stop creating a new line on enter

    if (e.key === "Enter") {
      e.preventDefault()
      //if game is in progress, start countdown
      if (inProgress) {
        setInProgress(false)
        openModal()
      }
      //if game is not in progress, start game
      else {
        setInProgress(true)
        setInputValue("")
      }
    }
  }

  //handle text area change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputValue(e.target.value)
  }

  return (
    <div className="flex flex-col justify-center space-y-4">
      <h1>Challenge Component</h1>
      <p>
        <span className={`${timer < 5 && timer > 0 ? "animate-ping" : ""} font-semibold text-6xl mx-4 text-red-500`}>
          {timer}
        </span>
        secs left
      </p>
      <p className="font-bold border rounded-md p-4">{paragraph}</p>

      <textarea
        placeholder='start typing here... press "Enter" key to start and when done, press the "Enter" key'
        value={inputValue}
        onChange={handleChange}
        className=" min-h-[25rem] md:min-w-[30rem]  p-4 min-w-full  border rounded outline-none"
        onKeyPress={handleKeyDown}
      />

      {/* modal component */}
      <AnimatePresence>
        {isOpen && (
          <Dialog className="relative z-50" static as={motion.div} open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-black font-bold text-base ">Typing result</Dialog.Title>

                <div className="mt-2 text-lg flex flex-col space-y-3 text-black font-semibold">
                  <p>
                    You got <span className="text-5xl font-semibold">{totalCorrectWords()}</span> correct words with{" "}
                    <span className="text-5xl font-semibold">{timer}</span> seconds left.
                  </p>
                  <p>
                    <span className="text-5xl font-semibold">{paragraph.split(" ").length - totalCorrectWords()}</span>
                    words were incorrect.
                  </p>
                  <p className="text-center text-5xl font-semibold">
                    {calculatePercentage(totalCorrectWords(), paragraph.split(" ").length)}%
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex  justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TestComponent
