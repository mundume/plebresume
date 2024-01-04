import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import UserCard from "./UserCard";

type User = KindeUser;
const Dashboard = ({ user }: { user: User }) => {
  return (
    <>
      <UserCard user={user} />
    </>
  );
};

export default Dashboard;
