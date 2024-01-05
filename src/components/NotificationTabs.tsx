import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { ActivityIcon, MessageSquareWarning } from "lucide-react";

const tabsData = [
  {
    value: "account",
    heading: "Account",
    content: [{ title: "Title 1", description: "Description 1" }],
  },
  {
    value: "password",
    heading: "Password",
    content: [{ title: "Title 2", description: "Description 2" }],
  },
  {
    value: "rod wave",
    heading: "letter",
    content: [
      { title: "Title 2", description: "Description 2" },
      { title: "Title 2", description: "Description 2" },
      { title: "Title 2", description: "Description 2" },
    ],
  },
];

const NotificationTabs = () => {
  return (
    <Tabs defaultValue={tabsData[0].value} className="w-full px-0 mx-0">
      <TabsList className="gap-2">
        {tabsData.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="px-4 border-b"
          >
            {tab.heading}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default NotificationTabs;
