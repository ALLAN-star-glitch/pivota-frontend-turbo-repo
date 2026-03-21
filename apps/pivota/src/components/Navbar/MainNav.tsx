"use client";

import { MainNav as SharedNav } from "@repo/ui";

export default function MainNav() {
  return (
    /* We simply call the shared navigation. 
      The internal state for the drawer and search modal 
      is already handled inside the package.
    */
    <SharedNav isDashboard={false} />
  );
}