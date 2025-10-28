import React from 'react';

export default function StudentControls({
    filter,
    setFilter,
    search,
    setSearch,
    sortOrder,
    toggleSort,
}) {
    return (
        <div className="controls">
            <div className="filters">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                    type="button"
                >
                    All
                </button>
                <button
                    className={`filter-btn ${filter === 'pass' ? 'active' : ''}`}
                    onClick={() => setFilter('pass')}
                    type="button"
                >
                    Pass
                </button>
                <button
                    className={`filter-btn ${filter === 'fail' ? 'active' : ''}`}
                    onClick={() => setFilter('fail')}
                    type="button"
                >
                    Fail
                </button>
            </div>

            {/* NOTE: Search is controlled by App (we chose App to hold search state) */}
            <input
                className="input search"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button className="btn sort-btn" type="button" onClick={toggleSort}>
                Sort: {sortOrder === 'desc' ? 'High → Low' : 'Low → High'}
            </button>
        </div>
    );
}
