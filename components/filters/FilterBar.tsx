import FilterChip from './FilterChip';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFilter, clearFilters } from '../../store/filterSlice';

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { services, types, centers, searchText } = useAppSelector((state) => state.filter);

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <FilterChip
          label="Services"
          options={[{ key: 'therapist', label: 'Therapist' }, { key: 'psychiatrist', label: 'Psychiatrist' }]}
          selected={services}
          onChange={(val) => dispatch(setFilter({ key: 'services', value: val }))}
        />
        <FilterChip
          label="Types"
          options={[{ key: 'inhouse', label: 'In-house' }, { key: 'external', label: 'External' }]}
          selected={types}
          onChange={(val) => dispatch(setFilter({ key: 'types', value: val }))}
        />
        <FilterChip
          label="Centers"
          options={[]} /* derive from data at runtime */
          selected={centers}
          onChange={(val) => dispatch(setFilter({ key: 'centers', value: val }))}
        />
      </div>
      <div className="flex space-x-2">
        <button
          className="px-4 py-2 bg-red-100 text-red-700 rounded"
          onClick={() => dispatch(clearFilters())}
        >
          Reset
        </button>
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded"
          onClick={() => {/* apply; list auto updates */}}
        >
          Apply
        </button>
      </div>
      <input
        type="text"
        placeholder="Search providers..."
        className="w-full p-2 border rounded"
        value={searchText}
        onChange={(e) => dispatch(setFilter({ key: 'searchText', value: e.target.value }))}
      />
    </div>
  );
};
export default FilterBar;