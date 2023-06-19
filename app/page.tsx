"use client";
import Image from "next/image";
import cx from "classnames";
import { crimsonPro, martelSans, palanquinDark } from "./fonts";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>
      <motion.div className="flex flex-row justify-around  px-24">
        <div className="basis-1/3">
          <h1 className="text-8xl">Zach Zulanas</h1>
          <h2 className="text-3xl">developer</h2>
        </div>
        <div className="basis-2/3">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Large input
            </label>
            <input
              type="text"
              id="large-input"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
