'use client';

import { useState } from 'react';
import {
  Button,
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue
} from '@tremor/react';
import { es } from 'date-fns/locale';
import { calculateDateRanges } from '../core/helpers/utils/calculateDateRanges';
import useProvider from './hooks/useProvider';
import { FeedbackOperatorCall } from '../core/feedbackOperator/feedbackOperator.entity';

export default function DateRangePickerSpanish({ operatorId }: { operatorId: string }) {
  const provider = useProvider();
  const [loadFeedback, setLoadFeedback] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<FeedbackOperatorCall | null>(null);
  const [currentDate] = useState<Date>(new Date());
  const [value, setValue] = useState<DateRangePickerValue>({
    from: undefined,
    to: undefined
  });

  const getFeedback = async () => {
    setLoadFeedback(true);
    const data = await provider.feedback.getFeedbackOperatorChat(
      operatorId,
      value.from,
      value.to
    );

    setFeedback(data);
    setLoadFeedback(false);
  };

  const dateRanges = calculateDateRanges(currentDate);

  return (
    <div>
      <DateRangePicker
        className="max-w-md "
        value={value}
        onValueChange={setValue}
        locale={es}
        selectPlaceholder="Seleccionar"
        color="rose"
      >
        <DateRangePickerItem
          key="ytd"
          value="ytd"
          from={dateRanges.yearToDateRange.from}
          to={dateRanges.yearToDateRange.to}
        >
          Año transcurrido
        </DateRangePickerItem>
        <DateRangePickerItem
          key="month"
          value="month"
          from={dateRanges.lastMonthRange.from}
          to={dateRanges.lastMonthRange.to}
        >
          Mes pasado
        </DateRangePickerItem>
        <DateRangePickerItem
          key="week"
          value="week"
          from={dateRanges.lastWeekRange.from}
          to={dateRanges.lastWeekRange.to}
        >
          Semana pasada
        </DateRangePickerItem>
        <DateRangePickerItem
          key="day"
          value="day"
          from={dateRanges.yesterdayRange.from}
          to={dateRanges.yesterdayRange.to}
        >
          Ayer
        </DateRangePickerItem>
        <DateRangePickerItem
          key="hour"
          value="hour"
          from={dateRanges.lastHourRange.from}
          to={dateRanges.lastHourRange.to}
        >
          Hace una hora
        </DateRangePickerItem>
      </DateRangePicker>
      <Button className="mt-12 mb-16" onClick={getFeedback}>
        Dame el feedback
      </Button>

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
      {(feedback?.feedback || []).map(({ feedback_message }, i) => (
        <div
          key={i}
          dangerouslySetInnerHTML={{
            __html: feedback_message
          }}
        />
      ))}
    </div>
  );
}
