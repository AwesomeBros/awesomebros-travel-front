import { auth } from "@/auth";
import ProfileSection from "@/components/user/profile-section";
import UserButton from "@/components/user/user-button";

export default async function UserInfoPage() {
  const session = await auth();
  console.log("UserInfoPage session:", session);
  return (
    <main className="max-w-5xl h-[calc(100vh-97px)] mx-auto px-4 flex items-center">
      <div className="my-auto w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between gap-4">
          <h1 className="text-3xl font-semibold">유저 정보</h1>
        </div>
        <ProfileSection userId={session?.user.id} />
        <UserButton userId={session?.user.id} />
      </div>
    </main>
  );
}
