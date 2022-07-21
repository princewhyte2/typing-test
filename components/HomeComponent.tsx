import { Player, Controls } from "@lottiefiles/react-lottie-player"
import Link from "next/link"
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.9,
      staggerChildren: 0.4,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const HomeComponent = (): JSX.Element => {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex h-full px-4 md:px-8 items-center justify-center"
    >
      <motion.li variants={item}>
        <Player
          className="hidden xl:block"
          autoplay
          loop
          src="https://assets4.lottiefiles.com/temporary_files/r5WAZZ.json"
          style={{ height: "650px", width: "650px" }}
        >
          <Controls visible={false} buttons={["play", "repeat", "frame", "debug"]} />
        </Player>
      </motion.li>

      <motion.li>
        <div className=" rounded md:h-fit md:w-[30rem] md:border  md:p-5">
          <h3 className=" animate-pulse font-Pacifico font-bold text-6xl text-center">Instruction</h3>
          <p className="font-Roboto py-6 text-lg">
            This is a simple app for users to test and improve their typing skills. You will be presented with a random
            text paragraph or you can copy your own choice of the paragraph. This is called challenge. Then you will
            select the time duration of the test it can be 1 m, 2m 5m, or custom. Once the test is set up you can start
            the test and hence the timer. You need to type the paragraph in another text box as it is. For each correct
            word, you will get 1 point for each incorrect word you type you will receive 0 points. Total points will be
            the total no of words in the paragraph. At the end of the test, you will be presented with your score which
            is your typing accuracy and speed.
          </p>
          <Link href="/challenge/select-paragraph">
            <button className=" hover:animate-none animate-bounce bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Start Challenge
            </button>
          </Link>
        </div>
      </motion.li>
    </motion.ul>
  )
}

export default HomeComponent
