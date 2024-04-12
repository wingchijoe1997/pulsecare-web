import { RegisterForm } from "./RegisterForm";
import { Suspense } from "react";
export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
