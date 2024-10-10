"use client";
import { InputContainer } from "@/common/components/atoms/InputContainer";
import { SubmitButton } from "@/common/components/atoms/SubmitButton";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { handleSignIn } from "./api/actions";
import { SignInInterface, SignInSchema } from "./api/validations";

export const SignInForm = () => {
  const defaultValues: SignInInterface = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInInterface>({
    resolver: valibotResolver(SignInSchema),
    defaultValues,
  });

  const router = useRouter();
  const onSubmit = async (data: SignInInterface) => {
    try {
      const response = await handleSignIn({ ...data });
      if (response.code !== 1) {
        toast.error(response?.message || "Signin failed");
      } else {
        toast.success(response?.message || "Signin successful");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4">
        <InputContainer
          inputLabel="Email"
          isMandatory
          error={errors.email?.message}>
          <input
            type="email"
            placeholder="Enter Email"
            {...register("email")}
          />
        </InputContainer>
      </div>
      <div className="mb-6">
        <InputContainer
          inputLabel="Password"
          isMandatory
          error={errors.password?.message}>
          <input
            type="password"
            placeholder="Enter Password"
            {...register("password")}
          />
        </InputContainer>
      </div>
      <SubmitButton
        className={`flex w-full items-center justify-center gap-1 !rounded-lg px-6 py-2 ${!isSubmitting && "border border-C_5EBE76"}`}
        isSubmitting={isSubmitting}>
        Sign In
      </SubmitButton>
    </form>
  );
};
