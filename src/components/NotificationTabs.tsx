import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardDescription, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";

const tabsData = [
  {
    value: "All jobs",
    heading: "Jobs",
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
    value: "recruiters",
    heading: "Actively recruiting",
    content: [
      {
        title: "glow up",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis mollitia dolorum voluptatum, ab sunt vel consequatur beatae totam aliquam voluptatibus!",
      },
      {
        title: "here with me",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis mollitia dolorum voluptatum, ab sunt vel consequatur beatae totam aliquam voluptatibus!",
      },
      {
        title: "niko on",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis mollitia dolorum voluptatum, ab sunt vel consequatur beatae totam aliquam voluptatibus!",
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
    <Tabs defaultValue={tabsData[0].value} className="sm:w-[500px]  mx-0 px-4">
      <div className="flex items-center justify-between ">
        <TabsList className="gap-2 duration-1000 animate-in">
          {tabsData.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="">
              {tab.heading}
            </TabsTrigger>
          ))}
        </TabsList>
        <Button size={"icon"} className="">
          <Settings className="w-4 h-4 text-slate-600" />
        </Button>
      </div>

      {tabsData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="px-1 ">
          {tab.content.map((item) => (
            <Card key={item.title} className="px-4 my-1">
              <CardHeader className="p-0 py-1 text-sm font-normal ">
                {item.title}
              </CardHeader>
              <CardDescription className="flex items-center justify-start pb-2 text-xs truncate text-wrap text-slate-500">
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
