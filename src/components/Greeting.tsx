import React from 'react';

export interface GreetingProps {
  name: string;
}

export const Greeting: React.FC<GreetingProps> = (props: GreetingProps) => {
  return <h1>Hallo, {props.name}</h1>;
};
