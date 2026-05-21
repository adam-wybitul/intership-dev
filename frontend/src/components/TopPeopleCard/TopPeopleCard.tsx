import { PersonDeal } from '../../hooks/usePeopleDeals';
import './TopPeopleCard.css';

interface TopPeopleCardProps {
  topPeople: PersonDeal[];
  loading: boolean;
  error: string | null;
}

function formatPrice(value: number, locale : string = 'en-US', currency : string = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

const getTrendMeta = (trend: number) => {
  if (trend > 0) {
    return { emoji: '📈', className: 'positive', label: `+${trend}` };
  }
  if (trend < 0) {
    return { emoji: '📉', className: 'negative', label: `${trend}` };
  }
  return { emoji: '➡️', className: 'flat', label: '0' };
};

export function TopPeopleCard({ topPeople, loading, error }: TopPeopleCardProps) {
  return (
    <div className="top-people-card">
      <div className="top-people-header">
        <h2 className="top-people-title">Top 5 Closers</h2>
        <p className="top-people-subtitle">Business deals closed</p>
      </div>

      {error ? (
        <div className="top-people-error">{error}</div>
      ) : loading ? (
        <div className="top-people-empty">Loading people...</div>
      ) : topPeople.length === 0 ? (
        <div className="top-people-empty">No data available yet.</div>
      ) : (
        <ul className="top-people-list">
          {topPeople.map((person, index) => {
            const rankClass =
              index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
            const trendMeta = getTrendMeta(person.trend);

            return (
              <li key={person.id} className="top-people-item">
                <span className={`top-people-rank ${rankClass}`}>#{index + 1}</span>
                <span className="top-people-name">{person.name}</span>
                <span className={`top-people-trend ${trendMeta.className}`}>
                  {trendMeta.emoji} {trendMeta.label}
                </span>
                <span className="top-people-count">{person.totalDeals} deals</span>
                <span className="top-people-amount">{formatPrice(person.totalAmount, `cs-CZ`, `CZK`)}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
