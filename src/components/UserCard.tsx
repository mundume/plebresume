import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

const UserCard = ({ user }: { user: KindeUser }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Welcome Back{" "}
          <span className="text-purple-400 ">
            {user.given_name} {user.family_name}{" "}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p> {user.email}</p>
      </CardContent>
    </Card>
  );
};

export default UserCard;
