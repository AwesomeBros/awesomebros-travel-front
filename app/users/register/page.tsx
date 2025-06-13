import { auth } from "@/auth";
import { RegisterForm } from "@/components/users/register-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "회원가입",
};

export default async function Signup() {
  const session = await auth();
  if (session && session.user) {
    return redirect("/");
  }
  return <RegisterForm />;
}
