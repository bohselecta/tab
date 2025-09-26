import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container pt-12">
      <div className="max-w-md mx-auto">
        <SignIn routing="path" path="/sign-in" />
      </div>
    </div>
  );
}
