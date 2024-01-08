import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import UserCard from "./UserCard";
import UploadButton from "./uploadButton";

type User = KindeUser;
const Dashboard = ({ user }: { user: User }) => {
  return (
    <>
      <UserCard user={user} />
      <UploadButton />
    </>
  );
};

export default Dashboard;
