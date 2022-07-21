import create from "zustand"

export interface IState {
  timer: number
  paragraph: string
  setTimer: (timer: number) => void
  setParagraph: (paragraph: string) => void
}

const useStore = create<IState>()((set) => ({
  timer: 60,
  paragraph: "",
  setTimer: (timer: number) => set((state) => ({ ...state, timer })),
  setParagraph: (paragraph: string) => set((state) => ({ ...state, paragraph })),
}))

export default useStore
