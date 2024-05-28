import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';
import QueryCards from './QueryCards';

const Queries = () => {
    const queriesData = useLoaderData();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortedQueries, setSortedQueries] = useState([]);

    // Sort queries in descending order based on timestamp
    useEffect(() => {
        const sortedData = [...queriesData].sort((a, b) => new Date(b.currentDate) - new Date(a.currentDate));
        setSortedQueries(sortedData);
    }, [queriesData]);

    // Filter queries based on the search query
    const filteredQueries = sortedQueries.filter(query =>
        query.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Helmet>
                <title>All Queries</title>
            </Helmet>
            <h2>All Queries: {filteredQueries.length}</h2>

            {/* Search input */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name"
                className="mb-4 p-2 border border-gray-300 rounded"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQueries.map(query => (
                    <QueryCards
                        key={query._id}
                        query={query}
                    />
                ))}
            </div>

            <div className="flex justify-center items-center my-5 md:my-8 lg:my-8">
                <Link to="/">
                    <button className="btn btn-primary">Go Back to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default Queries;
