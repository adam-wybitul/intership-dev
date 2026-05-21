import { PersonDeal } from '../../hooks/usePeopleDeals';
import './OtherPeopleTable.css';

interface OtherPeopleTableProps {
  people: PersonDeal[];
  rankOffset?: number;
}

export function OtherPeopleTable({ people, rankOffset = 5 }: OtherPeopleTableProps) {
  return (
    <div className="other-people-container">
      <h2 className="other-people-title">Other People</h2>

      {people.length === 0 ? (
        <div className="other-people-empty">No additional people to show.</div>
      ) : (
        <table className="other-people-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Closed Deals</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <tr key={person.id}>
                <td>#{rankOffset + index + 1}</td>
                <td>{person.name}</td>
                <td>{person.closedDeals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
