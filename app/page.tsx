import Image from "next/image";
import cx from "classnames";
import { crimsonPro, martelSans, palanquinDark } from "./fonts";

export default function Home() {
  return (
    <main>
      <div></div>
      <div></div>
      <p className={cx(martelSans.className)}>Martel Sans</p>
      <p className={cx(palanquinDark.className)}>Palanquin Dark</p>
      <p className={cx(crimsonPro.className)}>Crimson Text</p>
    </main>
  );
}
