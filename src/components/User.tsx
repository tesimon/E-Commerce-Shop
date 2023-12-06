"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
interface userSession {
  session: Session | null;
}
export default function User({ session }: userSession) {
  const user = session?.user;
  const [showModal, setShowModel] = useState(false);

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {user ? (
        <div
          className="flex items-center gap-[2px] cursor-pointer"
          onClick={() => {
            setShowModel(!showModal);
          }}
        >
          <div className=" btn  btn-ghost btn-circle">
            <Image
              src={user?.image || "/anonymous.jpg"}
              width={30}
              height={30}
              alt="avatar"
              className="rounded-full w-[30px] h-[30px]"
            />
          </div>
          <div className="text-sm font-bold">{user?.name}</div>
        </div>
      ) : (
        <button
          className="btn btn-outline btn-sm rounded-md"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      )}
      {showModal && (
        <div className="w-[90vw] sm:w-[400px] absolute top-[30%] sm:top-[15%]  z-50 right-5 sm:right-[20%]">
          <div className="dropdown-content menu p-2 shadow bg-base-100 rounded-md w-full outline ">
            <div className="flex justify-around items-center px-2 ">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg">{user?.name}</h3>
                <p className="">{user?.email}</p>
              </div>
              <Link
                href="/addproduct"
                onClick={() => setShowModel(false)}
                className="btn btn-link"
              >
                Add Products
              </Link>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-ghost btn-outline rounded-md"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                Sign out
              </button>
              <div>
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-error rounded-md"
                  onClick={() => {
                    setShowModel(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
