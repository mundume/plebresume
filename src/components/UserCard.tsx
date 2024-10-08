import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

const UserCard = ({ user }: { user: KindeUser }) => {
  return (
    <div className="px-0">
      <h2 className="pb-2 text-3xl font-semibold tracking-tight scroll-m-20 first:mt-0">
        Hello, {user.given_name}
      </h2>
      <p className="text-slate-600">What do you want to create?</p>
    </div>
  );
};

export default UserCard;
