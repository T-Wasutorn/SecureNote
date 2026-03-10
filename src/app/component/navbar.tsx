import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between bg-[#f2fbf8] px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-[#1cd398] to-[#00cfff]" />
        <h1 className="text-base font-bold md:text-2xl">Durilogger</h1>
      </div>
      <Link
        href={"/auth/signin"}
        className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-center"
      >
        Login
      </Link>
    </nav>
  );
}