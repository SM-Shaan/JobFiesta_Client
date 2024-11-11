import React from 'react'

const companies = [
    { name: 'Tech Innovators', industry: 'Technology' },
    { name: 'HealthCorp', industry: 'Healthcare' },
    { name: 'FinServe', industry: 'Finance' },
];

const CompanyList = () => {
    return (
        <section className="bg-white shadow-md rounded-lg p-6 my-8 mx-4">
            <h2 className="text-2xl font-semibold mb-4">Participating Companies</h2>
            <ul className="space-y-4">
                {companies.map((company, index) => (
                    <li key={index} className="border-b-2 pb-4">
                        <h3 className="text-xl font-semibold">{company.name}</h3>
                        <p className="text-gray-700">Industry: {company.industry}</p>
                    </li>
                ))}
            </ul>
        </section>

    )
}

export default CompanyList