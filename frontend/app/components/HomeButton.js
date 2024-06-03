import Link from "next/link";
import Image from "next/image";
import home from "/public/home_castle.png";

export default function HomeButton() {
  return (
    <div className="container justify-between">
      <h1 className="text-2xl font-bold">
        <Link href="/">
          <Image
            className="w-[72px] h-auto"
            src={home}
            alt="Home button"
            priority
          ></Image>
        </Link>
      </h1>
    </div>
  );
}
