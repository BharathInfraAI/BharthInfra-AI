import { SignUp } from "@clerk/nextjs";
export default function Page() { return <main className="grid min-h-screen place-items-center bg-[#07111f] p-6"><section className="rounded-3xl bg-white p-8 shadow-2xl"><SignUp fallbackRedirectUrl="/after-sign-in" /></section></main>; }
