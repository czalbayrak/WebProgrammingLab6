// Controlled input: the value lives in App's state and is passed down.

function FilterForm({ filter, onFilterChange}){
    function handleSubmit(event){
        event.preventDefault(); // stop the page from reloading on Enter.
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="filter">Filter by title</label>
            <input
            id="filter"
            type="text"
            placeholder="Type to filter..."
            value={filter}
            onChange={(event)=> onFilterChange(event.target.value)}
            />
        </form>
    );
}
export default FilterForm;
