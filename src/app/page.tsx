import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-bg flex justify-center items-center font-roboto">
      <div className="space-y-3 max-w-screen-md mx-auto p-4">
        <h1 className="text-6xl bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent font-semibold">Titulo de la app</h1>
        <p className="font-dancingScript text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae consequatur quas, exercitationem quisquam quis culpa ullam minima voluptates alias perspiciatis?</p>
        <div>
          <Link href="/journal">
            <button className="py-2 px-3 rounded-lg bg-accent text-white text-sm font-semibold">
              Ingresar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
