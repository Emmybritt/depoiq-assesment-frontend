import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <SignUp
        forceRedirectUrl={process.env.NEXT_PUBLIC_BASE_URL}
        afterSignOutUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`}
      />
    </div>
  );
}
