import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <p>You are not logged in</p>
      <button type="submit">Sign in!</button>
    </form>
  );
}

function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <p>{children}</p>
      <button type="submit" className="btn mt-2 bg-danger text-light">Sign out</button>
    </form>
  );
}

async function RedirectToSignup() {
  return (
    <form
      action={async () => {
        "use server";
        redirect("/signup");
      }}
    >
      <button type="submit">Go to Signup</button>
    </form>
  );
}

export default async function Page() {
  let session = await auth();
  let user = session?.user?.name;
  console.log(session);

  return (      
    <div className="container m-4">
      {/* <h1>Hello</h1> */}
      <div className="mt-4">
        {user ? (
          <SignOut>
            <span className="fw-bold">{`Welcome ${user}`}</span>
          </SignOut>
        ) : (
          <>
            <div className="mb-3">
              <SignIn />
            </div>
            <RedirectToSignup />
          </>
        )}
      </div>
    </div>
  );
}
