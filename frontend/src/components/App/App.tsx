import { useState } from 'react';
import { PeopleFilter, usePeopleDeals } from '../../hooks/usePeopleDeals';
import { OtherPeopleTable } from '../OtherPeopleTable/OtherPeopleTable';
import { Sidebar } from '../Sidebar/Sidebar';
import { TopPeopleCard } from '../TopPeopleCard/TopPeopleCard';
import './App.css';

function App() {
  const [filter, setFilter] = useState<PeopleFilter>('thisMonth');
  const { people, loading: peopleLoading, error: peopleError } = usePeopleDeals(filter);

  const sortedPeople = [...people].sort(
    (a, b) => b.totalDeals - a.totalDeals || a.name.localeCompare(b.name)
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
        <TopPeopleCard topPeople={topPeople} loading={peopleLoading} error={peopleError} />
        <OtherPeopleTable
          people={otherPeople}
          loading={peopleLoading}
          error={peopleError}
          rankOffset={topPeople.length}
        />
      </div>
    </div>
  );
}

export default App;
