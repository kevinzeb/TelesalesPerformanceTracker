'use client';

import { Button, TextInput, Title } from '@tremor/react';

import {
  MicrophoneIcon,
  StopIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

import React, { useEffect, useState } from 'react';
import useProvider from '../hooks/useProvider';
import { FeedbackOperatorCall } from '../../core/feedbackOperator/feedbackOperator.entity';

const TranscriptionComponent: React.FC = () => {
  const provider = useProvider();
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any>(false);
  const [loadFeedback, setLoadFeedback] = useState<any>(false);
  const [feedback, setFeedback] = useState<FeedbackOperatorCall | null>(null);

  useEffect(() => {
    const init = () => {
      if ('webkitSpeechRecognition' in window) {
        const lib = new window.webkitSpeechRecognition();
        lib.continuous = true;
        lib.lang = 'es-MX';

        lib.onresult = (event: any) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            setTranscript((pre) => pre + transcript);
          }
        };
        setRecognition(lib);
      }
    };
    init();
  }, []);

  const getFeedback = async () => {
    setLoadFeedback(true);
    const data = await provider.feedback.getFeedbackOperator(transcript);

    setFeedback(data);
    setLoadFeedback(false);
  };

  const startListening = () => {
    setIsListening(true);
    recognition?.start();
  };

  const stopListening = async () => {
    setIsListening(false);
    recognition?.stop();
  };

  return (
    <div>
      <div className="flex mt-12 gap-4 items-center justify-center w-full ">
        <Button
          icon={MicrophoneIcon}
          onClick={startListening}
          disabled={isListening}
          variant="light"
          size="lg"
        />
        <Button
          icon={StopIcon}
          onClick={stopListening}
          disabled={!isListening}
          variant="light"
          color="red"
          size="lg"
        ></Button>
        <Button
          icon={ArrowPathIcon}
          onClick={() => {
            setTranscript('');
            stopListening();
          }}
          variant="light"
          color="red"
          size="lg"
        ></Button>
      </div>
      <div className="flex mt-12 gap-4 items-center justify-center w-full">
        <Button onClick={getFeedback} size="lg">
          Dame el feedback
        </Button>
      </div>
      {isListening && (
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
      <TextInput
        value={transcript}
        placeholder=""
        className="mt-8 mb-16 p-16 text-cyan-700"
        disabled
      />
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
    </div>
  );
};

export default TranscriptionComponent;
