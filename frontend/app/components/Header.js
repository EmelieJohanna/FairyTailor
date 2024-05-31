import Link from "next/link";
import Image from "next/image";
import home from "/public/home_castle.png";

export default function Header() {
  return (
    <header className="flex top-0 left-0 w-full justify-center items-center absolute z-10">
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
    </header>
  );
}
