import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { ActivityIcon, MessageSquareWarning } from "lucide-react";
import { Card, CardDescription, CardHeader } from "./ui/card";

const tabsData = [
  {
    value: "account",
    heading: "Account",
    content: [
      {
        title: "new job at kinde",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, eum!",
      },
      {
        title: "new job at kinde",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, eum!",
      },
      {
        title: "new job at kinde",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, eum!",
      },
    ],
  },
  {
    value: "password",
    heading: "Password",
    content: [
      {
        title: "new job at kinde",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, eum!",
      },
      {
        title: "new job at kinde",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, eum!",
      },
      {
        title: "new job at kinde",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, eum!",
      },
    ],
  },
  {
    value: "rod wave",
    heading: "letter",
    content: [
      {
        title: "new job at kinde",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, eum!",
      },

      {
        title: "new job at kinde",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, eum!",
      },
      {
        title: "new job at kinde",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, eum!",
      },
    ],
  },
];

const NotificationTabs = () => {
  return (
    <Tabs defaultValue={tabsData[0].value} className="w-full px-0 mx-0">
      <TabsList className="gap-2">
        {tabsData.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="">
            {tab.heading}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="px-1 ">
          {tab.content.map((item) => (
            <Card key={item.title} className="px-4 my-1">
              <CardHeader className="p-0 py-1 text-sm font-normal ">
                {item.title}
              </CardHeader>
              <CardDescription className="flex items-center justify-start pb-2 text-xs truncate">
                {item.description}
              </CardDescription>
            </Card>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default NotificationTabs;
