import type { User } from "@/types/user";
import { useUpdateUserProfile } from "@/services/user-service";
import { userStore } from "@/store/auth-store";
import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/profile/authentication")({
  component: RouteComponent,
});

function RouteComponent() {
  const userData = useStore(userStore);
  const { mutate: updateUser } = useUpdateUserProfile();

  const [user, setUser] = useState<User>();
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    if (userData) {
      setUser({
        ...userData,
        password: "",
      });
    }
  }, [userData]);

  function handleUpdateUser() {
    if (user?.password === "") {
      return toast("Password cannot be empty");
    }
    if (user?.password !== passwordConfirmation) {
      return toast("Password doesn't match");
    }
    updateUser({ user: user! }, {
      onSuccess: () => {
        setPasswordConfirmation("");
        toast("Success updating password");
      },
    });
  }
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-sm">New password</label>
        <input
          className="border px-2 py-1 rounded"
          type="text"
          value={user?.password ?? ""}
          onChange={e => setUser(u => ({
            ...u!,
            password: e.target.value,
          }))}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Password confirmation</label>
        <input
          className="border px-2 py-1 rounded"
          type="password"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <div className="">
        <button onClick={() => handleUpdateUser()} className="px-4 py-2 bg-orange-400 text-white text-sm rounded-md">Update Password</button>
      </div>
    </>
  );
}
