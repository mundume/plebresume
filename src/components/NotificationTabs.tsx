import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardDescription, CardHeader } from "./ui/card";

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
    <Tabs defaultValue={tabsData[0].value} className="w-[500px] px-0 mx-0">
      <TabsList className="gap-2 duration-1000 animate-in">
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
