import React from "react";
import TabsHome from "../components/TabsHome";
import HomeAdmin from "../components/HomeAdmin";

export default function Home({ user }) {
  return (
    <div>
      {user.rol == "ADMIN" ? (
        <div className="flex max-w-10/12 mx-auto my-6">
          <HomeAdmin />
        </div>
      ) : (
        <TabsHome user={user} />
      )}
    </div>
  );
}
