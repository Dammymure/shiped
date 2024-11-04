import Link from "next/link"

export default function NotFound() {
  return (
    <main className="text-center flex flex-col h-screen justify-center align-middle">
      <h2 className="text-3xl">There was a problem.</h2>
      <p>We could not find the page you were looking for.</p>
      <p>Go back to the <Link href="/dashboard">dashboard</Link>.</p>
    </main>
  )
}