import Link from "next/link"
import { convertMinutesToSeconds } from "../utils"
import useStore, { IState } from "../store"
import { useEffect } from "react"

const SelectTimerComponent = (): JSX.Element => {
  //timer from store
  const timer = useStore((state: IState): number => state.timer)
  const setTimer = useStore((state: IState): ((timer: number) => void) => state.setTimer)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
    //if type of event is htmlinputelement
    if (e.target instanceof HTMLInputElement) {
      setTimer(Number(e.target.value))
    } else {
      //convert minutes to seconds
      setTimer(convertMinutesToSeconds(Number(e.target.value)))
    }
  }

  //set timer to 60 seconds on initial render
  useEffect((): void => {
    setTimer(60)
  }, [setTimer])

  return (
    <div className="flex flex-col space-y-3">
      <h1>Timer Component</h1>
      <p className="text-center">
        <span className=" font-semibold text-6xl">{timer}</span>secs
      </p>
      <div className="flex space-x-4 items-center border p-4 rounded-md">
        <div className="flex-1">
          <label className="block text-sm font-bold mb-2">Select timer:</label>
          <div className="h-12 border rounded-md flex justify-center items-center">
            <select onChange={handleChange} defaultValue={1} className="border-none outline-none">
              <option value="1">1 minute</option>
              <option value="2">2 minutes</option>
              <option value="5">5 minutes</option>
            </select>
          </div>
        </div>
        <div>or</div>
        <div>
          <label className="block text-sm font-bold mb-2">Use custom:(set time in seconds)</label>
          <input onChange={handleChange} type={"number"} className="outline-none border h-12 rounded-md px-3" />
        </div>
      </div>
      <div className="flex space-x-4 justify-end">
        <Link href="/challenge/test">
          <button className="border font-bold py-2 px-4 rounded">Go to challenge</button>
        </Link>
      </div>
    </div>
  )
}

export default SelectTimerComponent
