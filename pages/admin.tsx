import { unstable_getServerSession } from "next-auth";
import { useSession, getSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { oktaOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: any) {
  const session: any = await unstable_getServerSession(
    context.req,
    context.res,
    oktaOptions
  );
  if (session) {
    return {
      props: { name: session.user.name, groups: session.user.groups.join(",") },
    };
  }
  return {
    redirect: { destination: "/", permanent: false },
  };
}

const AdminPage = ({ name, groups }: any) => {
  return (
    <div>
      <div>Name: {name}</div>
      <div>Groups: {groups}</div>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default AdminPage;
