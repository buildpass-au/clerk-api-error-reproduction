import type { NextPage } from "next";
import { WorkerLayout } from "../layouts/WorkerLayout";

export type NextPageWithLayout<T = object> = NextPage<T> & {
  getLayout?: React.FC;
};

const WorkerPage: NextPageWithLayout = () => {
  return <div>Worker Page</div>;
};

// @ts-ignore
WorkerPage.getLayout = WorkerLayout;

export default WorkerPage;
