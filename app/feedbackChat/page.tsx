'use client';

import { Button, TextInput, Title, Text } from '@tremor/react';

import React, { useEffect, useState } from 'react';
import useProvider from '../hooks/useProvider';
import { FeedbackOperatorCall } from '../../core/feedbackOperator/feedbackOperator.entity';

const TranscriptionComponent: React.FC = () => {
  const provider = useProvider();

  const [loadFeedback, setLoadFeedback] = useState<any>(false);
  const [chatId, setChatId] = useState<any>('');
  const [feedback, setFeedback] = useState<FeedbackOperatorCall | null>(null);

  const getFeedback = async () => {
    setLoadFeedback(true);
    const data = await provider.feedback.getFeedbackOperatorChatId(chatId);

    setFeedback(data);
    setLoadFeedback(false);
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title className="text-center ">Evaluador de calidad chats</Title>
      <Text className="text-center text-gray-500">
        Ejemplo: 104231348414669
      </Text>
      <TextInput
        value={chatId}
        onChange={(e) => {
          setChatId(e.target.value);
        }}
        className="p-1 mt-4"
        placeholder="ID"
      />

      <div className="flex mt-12 mb-16 gap-4 items-center justify-center w-full">
        <Button onClick={getFeedback} size="lg">
          Dame el feedback
        </Button>
      </div>

      {loadFeedback && (
        <div className="flex mt-6 items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
      {feedback?.feedback.map(({ feedback_message }, i) => (
        <div
          key={i}
          dangerouslySetInnerHTML={{
            __html: feedback_message
          }}
        />
      ))}
    </main>
  );
};

export default TranscriptionComponent;
