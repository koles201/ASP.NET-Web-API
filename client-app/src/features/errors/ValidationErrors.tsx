import React from "react";
import { Message } from "semantic-ui-react";

interface Props {
  errors: string[];
}

export default function ValidationErros({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: any, i: number) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}
