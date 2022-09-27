import { FC } from "react";
import { JournalStatisticDto } from "../lib/interfaces";
import { secondsToHms } from "../lib/utils";

interface Props {
  journalStatistic: JournalStatisticDto | undefined;
}

const JournalSummary: FC<Props> = ({ journalStatistic }) => {
  return (
    <>
      {journalStatistic && (
        <section>
          <div>
            <p>Total time passed</p>
            {/* <span>22 hours 24 min</span> */}
            <span>{secondsToHms(journalStatistic?.totalTimePassed) || 0}</span>
          </div>
          <div>
            <p>Last Week</p>
            <span>
              {secondsToHms(journalStatistic?.totalTimePassedWeek) || 0}
            </span>
          </div>
          <div>
            <p>Today</p>
            <span>
              {secondsToHms(journalStatistic?.totalTimePassedToday) || 0}
            </span>
          </div>
        </section>
      )}
    </>
  );
};

export default JournalSummary;
