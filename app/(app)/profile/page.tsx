export default async function Profile() {
  // In real auth, read user from session; for now, "fake-user"
  const user = { id: "fake-user", email: "guest@tablature.io" };

  return (
    <div className="container pt-10 space-y-6">
      <h1 className="h1">Profile</h1>
      <div className="glass p-6 rounded-xl2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/15" />
          <div>
            <div className="font-semibold">{user.email}</div>
            <div className="text-white/70 text-sm">User ID: {user.id}</div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="glass p-4 rounded-xl2">
            <h3 className="h3">Publishing</h3>
            <p className="p mt-1">Projects you publish appear in the Gallery. You can unpublish anytime.</p>
            <button className="mt-3 btn btn-primary">Manage Published</button>
          </div>
          <div className="glass p-4 rounded-xl2">
            <h3 className="h3">Connections</h3>
                <p className="p mt-1">Add links to your finished renders or deploys. They'll show on your project page.</p>
            <button className="mt-3 btn">Add a Link</button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="h3">Danger Zone</h3>
          <p className="p mt-1">Clear local session and sign out of the guest account.</p>
          <form action="/api/fakeauth/signout" method="post">
            <button className="mt-2 btn">Sign Out</button>
          </form>
        </div>
      </div>
    </div>
  );
}
