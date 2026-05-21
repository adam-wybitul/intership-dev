import { PersonDeal } from '../../hooks/usePeopleDeals';
import './OtherPeopleTable.css';

interface OtherPeopleTableProps {
  people: PersonDeal[];
  loading: boolean;
  error: string | null;
  rankOffset?: number;
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

function formatPrice(value: number, locale : string = 'en-US', currency : string = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

export function OtherPeopleTable({ people, loading, error, rankOffset = 5 }: OtherPeopleTableProps) {
  return (
    <div className="other-people-container">
      <h2 className="other-people-title">Other People</h2>

      {error ? (
        <div className="other-people-error">{error}</div>
      ) : loading ? (
        <div className="other-people-empty">Loading people...</div>
      ) : people.length === 0 ? (
        <div className="other-people-empty">No additional people to show.</div>
      ) : (
        <table className="other-people-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Closed Deals</th>
              <th>Total Amount (CZK)</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => {
              const trendMeta = getTrendMeta(person.trend);

              return (
                <tr key={person.id}>
                  <td>#{rankOffset + index + 1}</td>
                  <td>{person.name}</td>
                  <td>{person.totalDeals}</td>
                  <td>{formatPrice(person.totalAmount, `cs-CZ`, `CZK`)}</td>
                  <td>
                    <span className={`other-people-trend ${trendMeta.className}`}>
                      {trendMeta.emoji} {trendMeta.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
