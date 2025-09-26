import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container pt-12">
      <div className="max-w-md mx-auto">
        <SignUp routing="path" path="/sign-up" />
      </div>
    </div>
  );
}
