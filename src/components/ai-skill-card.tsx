import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type Skills = {
  skill: string;
};
type Props = {
  handleAddGeneratedSkill: (skill: string) => void;
  generatedSkill: Skills[];
};
function AISkillCard({ handleAddGeneratedSkill, generatedSkill }: Props) {
  return (
    <div>
      {generatedSkill.length > 0 && (
        <Card className="flex items-center gap-2 my-4 flex-wrap p-4 border-none">
          {generatedSkill.map((skill, index) => (
            <Button
              key={index}
              onClick={() => {
                handleAddGeneratedSkill(skill.skill);
              }}
            >
              {skill.skill}
            </Button>
          ))}
        </Card>
      )}
    </div>
  );
}

export default AISkillCard;
