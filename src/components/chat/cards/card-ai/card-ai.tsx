import { Chat } from "@/domain/chat";
import { CardAiAvatar } from "./card-ai-avatar";
import { CardAiContainer } from "./card-ai-container";
import { CardAiContent } from "./card-ai-content";

type CardAiProps = {
  data: Chat;
};

export function CardAi({ data }: CardAiProps) {
  return (
    <CardAiContainer>
      <CardAiAvatar />
      <CardAiContent data={data} />
    </CardAiContainer>
  );
}
