import { MainHeading } from "@/common/components/atoms/MainHeading";
import { SignInForm } from "@/main/signIn/SignInForm";

export default function SignIn() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
      <MainHeading text="SignIn" />
      <SignInForm />
    </div>
  );
}
