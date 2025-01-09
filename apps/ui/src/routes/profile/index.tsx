import type { User } from "@/types/user";
import { useUpdateUserProfile } from "@/services/user-service";
import { userStore } from "@/store/auth-store";
import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const userData = useStore(userStore);
  const { mutate: updateUser } = useUpdateUserProfile();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  function handleUpdateUser() {
    if (user === userData) {
      return toast("There is no difference");
    }
    updateUser({ user: user! }, {
      onSuccess: () => {
        toast("Success update profile data");
      },
    });
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Full name</label>
        <input
          className="border px-2 py-1 rounded"
          type="text"
          value={user?.fullname ?? ""}
          onChange={e => setUser(u => ({
            ...u!,
            fullname: e.target.value,
          }))}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Email</label>
        <input
          className="border px-2 py-1 rounded"
          type="email"
          value={user?.email ?? ""}
          onChange={e => setUser(u => ({
            ...u!,
            email: e.target.value,
          }))}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Alamat</label>
        <input
          className="border px-2 py-1 rounded"
          type="email"
          value={user?.address ?? ""}
          onChange={e => setUser(u => ({
            ...u!,
            address: e.target.value,
          }))}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Phone Number</label>
        <input
          className="border px-2 py-1 rounded"
          type="text"
          value={user?.phone ?? ""}
          onChange={e => setUser(u => ({
            ...u!,
            phone: e.target.value,
          }))}
        />
      </div>
      <div className="">
        <button onClick={() => handleUpdateUser()} className="px-4 py-2 bg-orange-400 text-white text-sm rounded-md">Save changes</button>
      </div>
    </>
  );
}
