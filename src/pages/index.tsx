import type { NextPage } from "next";
import { PublicLayout } from "../layouts/PublicLayout";

export type NextPageWithLayout<T = object> = NextPage<T> & {
  getLayout?: React.FC;
};

const PublicPage: NextPageWithLayout = () => {
  return <div>Public Page</div>;
};

// @ts-ignore
PublicPage.getLayout = PublicLayout;

export default PublicPage;
