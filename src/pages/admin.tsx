import type { NextPage } from "next";
import { AdminLayout } from "../layouts/AdminLayout";

export type NextPageWithLayout<T = object> = NextPage<T> & {
  getLayout?: React.FC;
};

const AdminPage: NextPageWithLayout = () => {
  return <div>Admin Page</div>;
};

// @ts-ignore
AdminPage.getLayout = AdminLayout;

export default AdminPage;
