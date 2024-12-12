import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-bg flex justify-center items-center font-roboto">
      <div className="space-y-3 max-w-screen-md mx-auto p-4">
        <h1 className="text-5xl lg:text-6xl bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent font-semibold py-2">
          ChatDiary
        </h1>
        <p className="font-dancingScript text-lg lg:text-2xl font-semibold">
          Escribe sobre tu día y deja que la inteligencia artificial analice tus
          palabras para ofrecerte un resumen personalizado. Reflexiona y
          descubre nuevas perspectivas sobre tus emociones y experiencias.
        </p>
        <div className="flex gap-5">
          <SignedOut>
            <SignInButton>
              <button className="bg-accent px-5 py-2 text-bg rounded-xl hover:scale-105 transition-all">
                Ingresar
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/journal">
              <button className="bg-accent px-5 py-2 text-bg rounded-xl hover:scale-105 transition-all">
                Journal
              </button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
