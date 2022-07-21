import randomWords from "random-words"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import useStore, { IState } from "../store"

const TestComponent = (): JSX.Element => {
  const paragraph = useStore((state: IState): string => state.paragraph)
  const [inputValue, setInputValue] = useState(() => "")
  const timer = useStore((state: IState): number => state.timer)
  const setTimer = useStore((state: IState): ((timer: number) => void) => state.setTimer)
  const router = useRouter()

  //onmount start countdown
  useEffect(() => {
    //if timer is not 0

    if (timer !== 0) {
      //start countdown
      const interval = setInterval(() => {
        //decrease timer
        setTimer(timer - 1)
      }, 1000)
      //on unmount clear interval
      return () => {
        clearInterval(interval)
      }
    }
  }, [setTimer, timer])

  return (
    <div className="flex flex-col justify-center space-y-4">
      <h1>Challenge Component</h1>
      <p>
        <span className={`${timer < 5 && timer > 0 ? "animate-ping" : ""} font-semibold text-6xl text-red-500`}>
          {timer}
        </span>
        secs left
      </p>
      <p className="font-bold border rounded-md p-4">{paragraph}</p>

      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className=" min-h-[25rem]  p-4 min-w-full md:min-w-[30rem] border rounded outline-none"
      ></textarea>
    </div>
  )
}

export default TestComponent
