import { useEffect, useState } from 'react';

export interface PersonDeal {
  name: string;
  totalDeals: number;
  totalAmount: number;
  trend: number;
}

export interface PeopleDealsResponse {
  message: string;
  timestamp: string;
  status: string;
  people: PersonDeal[];
}

export type PeopleFilter = 'thisMonth' | 'lastMonth' | 'thisYear';

const PEOPLE_DEALS_API_URL = 'http://localhost:3001/api/sales-dashboard';

export function usePeopleDeals(filter: PeopleFilter) {
  const [people, setPeople] = useState<PersonDeal[]>([]);

  useEffect(() => {
    fetchPeopleDeals();
  }, [filter]);

  const fetchPeopleDeals = async () => {
    try {
      const requestUrl = new URL(PEOPLE_DEALS_API_URL);
      requestUrl.searchParams.set('filter', filter);
      const response = await fetch(requestUrl.toString());
      if (!response.ok) {
        throw new Error('Failed to fetch people deals');
      }
      const result: PeopleDealsResponse = await response.json();
      setPeople(result.people);
    } catch (err) {
      setPeople([]);
    }
  };

  return { people };
}
