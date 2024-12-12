import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const links = [
  { name: "Home", href: "/" },
  { name: "Diario", href: "/journal" },
];

const layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        <div className="font-dancingScript font-semibold text-2xl text-center mt-2">ChatDiary</div>
        <ul className="mt-5">
          {links.map((link) => (
            <li key={link.name} className="px-5 hover:text-black/30 transition-colors">
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="w-full h-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

export default layout;
