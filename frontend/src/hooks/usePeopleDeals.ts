import { useEffect, useState } from 'react';

export interface PersonDeal {
  id: number;
  name: string;
  totalDeals: number;
  totalAmount: number;
  trend: number;
}

export interface PeopleDealsResponse {
  status: string;
  data: PersonDeal[];
}

export type PeopleFilter = 'thisMonth' | 'lastMonth' | 'thisYear';

const PEOPLE_DEALS_API_URL = '/api/sales-dashboard';

export function usePeopleDeals(filter: PeopleFilter) {
  const [people, setPeople] = useState<PersonDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPeopleDeals();
  }, [filter]);

  const fetchPeopleDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const requestUrl = new URL(PEOPLE_DEALS_API_URL, window.location.origin);
      requestUrl.searchParams.set('period', filter);
      const response = await fetch(requestUrl.toString());
      if (!response.ok) {
        throw new Error('Failed to fetch people deals');
      }
      const result: PeopleDealsResponse = await response.json();
      setPeople(result.data);
    } catch (err) {
      setError('Unable to load people stats.');
    } finally {
      setLoading(false);
    }
  };

  return { people, loading, error };
}
