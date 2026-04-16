// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/restaurant");
// }

// src/app/page.js
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-orange-50">
      {/* Fancy Loader / Brand Section */}
      <div className="text-center">
        <div className="relative flex justify-center mb-6">
          {/* Animated rings */}
          <div className="absolute h-24 w-24 animate-ping rounded-full bg-orange-400 opacity-20"></div>
          <div className="relative h-24 w-24 flex items-center justify-center rounded-full bg-orange-500 text-white text-4xl shadow-xl">
            🍕
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Food<span className="text-orange-500">Dash</span>
        </h1>

        <p className="mt-2 text-slate-500 animate-pulse font-medium">
          Redirecting you to our menu...
        </p>
      </div>

      {/* Optional: Simple decorative elements */}
      <div className="fixed bottom-10 text-xs text-slate-400 uppercase tracking-widest">
        Powered by Next.js & Vercel
      </div>
    </div>
  );
}
