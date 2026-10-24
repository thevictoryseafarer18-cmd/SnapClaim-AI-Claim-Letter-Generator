import Link from "next/link";
export default function Home(){return(
<main className="min-h-screen">
<header className="max-w-5xl mx-auto px-6 py-5 font-bold text-xl">SnapClaim</header>
<section className="max-w-5xl mx-auto px-6 pt-16 pb-24">
<h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">Don't under-describe your damage. Let the photos make the case.</h1>
<p className="mt-6 text-lg text-slate-600 max-w-2xl">Upload up to five photos. SnapClaim reads them like a claims adjuster and writes a professional, ready-to-send claim letter in about 30 seconds.</p>
<Link href="/claim/new" className="inline-block mt-8 bg-navy text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#16304f]">Start your claim</Link>
<ul className="mt-16 grid md:grid-cols-3 gap-6 text-sm text-slate-700">
<li className="bg-white p-5 rounded-lg border"><b>Photos in</b><br/>Car dents, water stains, broken windows, roof damage.</li>
<li className="bg-white p-5 rounded-lg border"><b>Damage report</b><br/>Each item named in insurance terms and rated 1 to 5.</li>
<li className="bg-white p-5 rounded-lg border"><b>Letter out</b><br/>Edit it, then download a print-ready PDF.</li></ul>
</section></main>)}
