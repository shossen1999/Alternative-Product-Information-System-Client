import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';
import MyQueriesCards from './MyQueriesCards';

const MyQueries = () => {
    const myQueries = useLoaderData();
    const [queries, setQueries] = useState(myQueries);

    // Sort queries in descending order based on timestamp
    const sortedQueries = queries.sort((a, b) => new Date(b.currentDate) - new Date(a.currentDate));

    return (
        <div>
            <Helmet>
                <title>My Queries</title>
            </Helmet>
            <h2>My Queries: {sortedQueries.length}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedQueries.map(myQuery =>
                    <MyQueriesCards
                        key={myQuery._id}
                        queries={queries}
                        setQueries={setQueries}
                        myQuery={myQuery}
                    />
                )}
            </div>

            <div className="flex justify-center items-center my-5 md:my-8 lg:my-8">
                <Link to="/"><button className="btn btn-primary ">Go Back to Home</button></Link>
            </div>
        </div>
    );
};

export default MyQueries;
