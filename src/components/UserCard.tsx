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
    <Card className="rounded">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Welcome Back, Nzai
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p> {user.email}</p>
      </CardContent>
    </Card>
  );
};

export default UserCard;
