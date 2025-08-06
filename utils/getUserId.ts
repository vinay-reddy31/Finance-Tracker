// utils/getUserId.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }
  return session.user.email;
}
