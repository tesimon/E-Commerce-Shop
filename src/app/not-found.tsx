import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card flex flex-col gap-2  justify-center items-center h-screen ">
      <h2 className="card-title">Not Found</h2>
      <p className="text-secondary">Could not find requested resource</p>
      <Link href="/" className="btn btn-outline">
        Return Home
      </Link>
    </div>
  );
}
