import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkle, Sparkles } from "lucide-react";

type Skills = {
  skill: string;
};
type Props = {
  handleAddGeneratedSkill: (skill: string) => void;
  generatedSkill: Skills[];
};
function AISkillCard({ handleAddGeneratedSkill, generatedSkill }: Props) {
  return generatedSkill.length > 0 ? (
    <div className="relative">
      <Badge className="absolute top-1 right-1">
        <Sparkles className="w-4 h-4 text-yellow-400" /> ai
      </Badge>

      <Card className="flex items-center gap-2 my-4 flex-wrap p-4 border-none">
        {generatedSkill.map((skill, index) => (
          <Button
            size={"sm"}
            key={index}
            onClick={() => {
              handleAddGeneratedSkill(skill.skill);
            }}
          >
            {skill.skill}
          </Button>
        ))}
      </Card>
    </div>
  ) : null;
}

export default AISkillCard;
