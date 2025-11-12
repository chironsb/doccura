import React from 'react';
import { Box, Text } from 'ink';
import { Message } from '../app';

interface ChatViewProps {
  messages: Message[];
}

export function ChatView({ messages }: ChatViewProps) {
  return (
    <Box flexDirection="column" paddingX={1} paddingY={1}>
      {messages.map((msg, index) => (
        <Box key={index} flexDirection="column" marginBottom={1}>
          <Box marginBottom={0}>
            <Text color={msg.role === 'user' ? 'cyan' : 'green'} bold>
              {msg.role === 'user' ? 'You' : 'Assistant'}:
            </Text>
          </Box>
          <Box paddingLeft={2}>
            <Text>{msg.content}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

