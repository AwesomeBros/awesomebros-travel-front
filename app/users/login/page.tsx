import { auth } from "@/auth";
import { LoginForm } from "@/components/user/login-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "로그인",
};

export default async function LoginPage() {
  const session = await auth();
  if (session && session.user) {
    return redirect("/");
  }
  return <LoginForm />;
}
