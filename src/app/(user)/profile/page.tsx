import axios from "axios";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Breadcrumbs from "@/components/breadcrumbs";
import AuthLayout from "@/components/layouts/AuthLayout";
import FormProfile from "@/components/forms/FormProfile";
import { revalidatePath } from "next/cache";

async function getPemagang(id: any) {
  try {
    const res = await axios.get(`${process.env.BASE_URL}/pemagangs/${id}`);

    if (res?.status === 200) {
      revalidatePath("/profile");
      return res?.data?.data;
    }
  } catch (error) {
    throw error;
  }
}

export default async function Profile() {
  const user = await getServerSession(authOptions);
  const getDataPemagang = getPemagang(user?.user?.id);
  const [pemagang] = await Promise.all([getDataPemagang]);

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4">
        <h1 className="text-lg font-medium">Profile</h1>
        <Breadcrumbs role="user" currentPage="Profile" />
      </div>
      <div className="space-y-2 bg-white p-[18px]">
        <FormProfile pemagang={pemagang} user={user?.user} />
      </div>
    </AuthLayout>
  );
}
