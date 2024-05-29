import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';
import QueryCards from './QueryCards';
import QueryCardsOne from './QueryCardsOne'; // Import the modified QueryCards component for 1 column layout
import QueryCardsTwo from './QueryCardsTwo'; // Import the modified QueryCards component for 2 column layout

const Queries = () => {
    const queriesData = useLoaderData();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortedQueries, setSortedQueries] = useState([]);
    const [gridColumns, setGridColumns] = useState(3); // Initial grid layout set to 3 columns

    useEffect(() => {
        const sortedData = [...queriesData].sort((a, b) => new Date(b.currentDate) - new Date(a.currentDate));
        setSortedQueries(sortedData);
    }, [queriesData]);

    const filteredQueries = sortedQueries.filter(query =>
        query.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getGridComponent = () => {
        switch (gridColumns) {
            case 1:
                return QueryCardsOne; // Use QueryCardsOne for 1 column layout
            case 2:
                return QueryCardsTwo; // Use QueryCardsTwo for 2 column layout
            case 3:
            default:
                return QueryCards; // Use default QueryCards for 3 column layout
        }
    };

    return (
        <div>
            <Helmet>
                <title>All Queries</title>
            </Helmet>
            <h2>All Queries: {filteredQueries.length}</h2>

            <div className='text-center'>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by product name"
                    className="mb-4 px-36 py-2 border border-gray-300 rounded  bg-gray-50 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="text-center mb-4">
                <button className="btn" style={{ backgroundColor: "#18555b", color: "white" }} onClick={() => setGridColumns(1)}>1 Column</button>
                <button className="btn mx-2" style={{ backgroundColor: "#18555b", color: "white" }} onClick={() => setGridColumns(2)}>2 Columns</button>
                <button className="btn" style={{ backgroundColor: "#18555b", color: "white" }} onClick={() => setGridColumns(3)}>3 Columns</button>
            </div>

            <div className={`grid gap-6 ${gridColumns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}`}>
                {filteredQueries.map(query => {
                    const GridComponent = getGridComponent();
                    return <GridComponent key={query._id} query={query} />;
                })}
            </div>

            <div className="flex justify-center items-center my-5 md:my-8 lg:my-8">
                <Link to="/">
                    <button className="btn" style={{ backgroundColor: "#18555b", color: "white" }}>Go Back to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default Queries;
