import { MainHeading } from "@/common/components/atoms/MainHeading";
import { SignUpForm } from "@/main/signup/SignUpFrom";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
      <MainHeading text="Signup" />
      <SignUpForm />
      <div className="mt-4">
        <Link
          href="/signin"
          className="text-C_5EBE76 hover:underline hover:shadow-none">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
