import { FC } from "react";
import { JournalDto } from "../lib/interfaces";
import { convertDate, convertTiming, secondsToHms } from "../lib/utils";

// {
//   date: "22/03/2022",
//   loginTime: "10h:15min:53s",
//   timeSpent: "2h: 55min",
// },

interface Props {
  journals: JournalDto[];
}

const JournalList: FC<Props> = ({ journals }) => {
  const haveJournals = Boolean(journals.length);

  return (
    <tbody>
      {haveJournals ? (
        journals.map((entry) => (
          <tr key={entry._id}>
            <td>{convertDate(entry.loginDate)}</td>
            <td>{convertTiming(entry.loginDate)}</td>
            <td>{secondsToHms(entry.timeSpent, "short")}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No Journal Registered</td>
        </tr>
      )}
    </tbody>
  );
};

export default JournalList;
