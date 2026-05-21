import { useState } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { PeopleFilter, usePeopleDeals } from '../../hooks/usePeopleDeals';
import { DataTable } from '../DataTable/DataTable';
import { OtherPeopleTable } from '../OtherPeopleTable/OtherPeopleTable';
import { Sidebar } from '../Sidebar/Sidebar';
import { TopPeopleCard } from '../TopPeopleCard/TopPeopleCard';
import './App.css';

function App() {
  const { data } = useFetchData();
  const [filter, setFilter] = useState<PeopleFilter>('thisMonth');
  const { people } = usePeopleDeals(filter);

  const sortedPeople = [...people].sort(
    (a, b) => b.closedDeals - a.closedDeals || a.name.localeCompare(b.name)
  );
  const topPeople = sortedPeople.slice(0, 5);
  const otherPeople = sortedPeople.slice(5);


  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-container">
        <div className="people-filter">
          <label className="people-filter-label" htmlFor="people-filter-select">
            Filter:
          </label>
          <select
            id="people-filter-select"
            className="people-filter-select"
            value={filter}
            onChange={(event) => setFilter(event.target.value as PeopleFilter)}
          >
            <option value="thisMonth">This month</option>
            <option value="lastMonth">Last month</option>
            <option value="thisYear">This year</option>
          </select>
        </div>
        <TopPeopleCard topPeople={topPeople} />
        <OtherPeopleTable people={otherPeople} rankOffset={topPeople.length} />
        <DataTable data={data} />
      </div>
    </div>
  );
}

export default App;
