import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-bg flex justify-center items-center font-roboto">
      <div className="space-y-3 max-w-screen-md mx-auto p-4">
        <h1 className="text-5xl lg:text-6xl bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent font-semibold">
          Titulo de la app
        </h1>
        <p className="font-dancingScript text-lg lg:text-2xl font-semibold">
          Estoy escribiendo palabras random para ver si se entiende con la font que tengo seleccionada la cual se llama Dancing Script, espero que se vea bien.
          y sea legible para el usuario final de esta aplicacion, la cual se ve muy bien en la vista previa.
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
            <Link href="/dashboard">
              <button className="bg-accent px-5 py-2 text-bg rounded-xl hover:scale-105 transition-all">
                Dashboard
              </button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
