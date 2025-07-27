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
      <button type="submit" className="btn mt-2 bg-danger text-light">
        Sign out
      </button>
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
  const session = await auth();
  const user = session?.user?.name;
  console.log(session);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg rounded-4 border-0 mb-4">
            <div className="card-body p-5">
              <h1 className="text-center mb-4">AIO College Application Organizer</h1>
              <p className="lead text-center mb-4">
                Organize your college applications with ease. Research colleges, Write essays, and receive feedback. All using crowd sourced information
              </p>
              
              {user ? (
                <div className="text-center p-4 bg-light rounded-3">
                  <SignOut children={undefined}/>
                </div>
              ) : (
                <div className="p-4 bg-light rounded-3">
                  <div className="row justify-content-center">
                    <div className="col-md-6 mb-3">
                      <div className="card shadow-sm rounded-3 p-3 text-center">
                        <p>Already have an account?</p>
                        <SignIn />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="card shadow-sm rounded-3 p-3 text-center">
                        <p>Create an account to begin</p>
                        <RedirectToSignup />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
