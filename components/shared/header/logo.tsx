import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src={"/logo/logo.png"}
        alt="Logo"
        height={100}
        width={100}
        className="hidden md:block cursor-pointer"
      />
    </Link>
  );
}
