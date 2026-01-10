import React from "react";
import TabsHome from "../components/TabsHome";

export default function Home({ user }) {
  return (
    <div>
      <TabsHome user={user} />
    </div>
  );
}
