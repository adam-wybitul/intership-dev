import { PersonDeal } from '../../hooks/usePeopleDeals';
import './TopPeopleCard.css';

interface TopPeopleCardProps {
  topPeople: PersonDeal[];
}

export function TopPeopleCard({ topPeople }: TopPeopleCardProps) {
  return (
    <div className="top-people-card">
      <div className="top-people-header">
        <h2 className="top-people-title">Top 5 Closers</h2>
        <p className="top-people-subtitle">Business deals closed</p>
      </div>

      {topPeople.length === 0 ? (
        <div className="top-people-empty">No data available yet.</div>
      ) : (
        <ul className="top-people-list">
          {topPeople.map((person, index) => (
            <li key={person.id} className="top-people-item">
              <span className="top-people-rank">#{index + 1}</span>
              <span className="top-people-name">{person.name}</span>
              <span className="top-people-count">{person.closedDeals} deals</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
