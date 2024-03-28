"use client";

import { Chat } from "@/domain/chat";
import { CardUserAvatar } from "./card-user-avatar";
import { CardUserContainer } from "./card-user-container";
import { CardUserContent } from "./card-user-content";

type CardUserProps = {
  data: Chat;
};

export function CardUser({ data }: CardUserProps) {
  return (
    <CardUserContainer>
      <CardUserAvatar />
      <CardUserContent data={data} />
    </CardUserContainer>
  );
}
