"use client";
import { InputContainer } from "@/common/components/atoms/InputContainer";
import { SubmitButton } from "@/common/components/atoms/SubmitButton";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { handleSignup } from "./api/actions";
import { SignUpInterface, SignUpSchema } from "./api/validations";

export const SignUpForm = () => {
  const defaultValues: SignUpInterface = {
    username: "",
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpInterface>({
    resolver: valibotResolver(SignUpSchema),
    defaultValues,
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpInterface) => {
    const response = await handleSignup(data);
    if (response.code !== 1) {
      toast.error(response?.message || "SignUp failed");
    } else {
      toast.success(response?.message || "SignUp successful,Please login..");
      router.push("/signin");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4">
        <InputContainer
          inputLabel="Username"
          isMandatory
          error={errors?.username?.message}>
          <input
            type="username"
            className="w-full rounded-lg border border-C_9f9f9f p-2"
            placeholder="Enter Username"
            {...register("username")}
          />
        </InputContainer>
      </div>
      <div className="mb-4">
        <InputContainer
          inputLabel="Email"
          isMandatory
          error={errors.email?.message}>
          <input
            type="email"
            className="w-full rounded-lg border border-C_9f9f9f p-2"
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
            className="w-full rounded-lg border border-C_9f9f9f p-2"
            placeholder="Enter Password"
            {...register("password")}
          />
        </InputContainer>
      </div>
      <SubmitButton isSubmitting={isSubmitting}>Signup</SubmitButton>
    </form>
  );
};
