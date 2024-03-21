import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="h-screen overflow-hidden min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-slate-300 to-slate-600">
      <SignUp />
    </section>
  );
}
