import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("credentials");
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
      <button type="submit">Sign out</button>
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
  let user = session?.user.name;
  console.log(session)

  return (
    <section>
      <h1>Home</h1>
      <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <><SignIn /><br /><RedirectToSignup /></>}</div>
    </section>
  );
}
