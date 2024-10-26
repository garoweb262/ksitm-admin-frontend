import React from 'react';
import InputField from '../../../components/control/InputField';

const Referrals = ({ data }) => {
  const referees = data?.referees || [];

  return (
    <div className="py-4 grid grid-cols-1 gap-4">
      {/* Referees Section */}
      <div className="col-span-1">
        <h2 className="font-semibold text-lg">Referees</h2>
      </div>
      {referees.map((referee, index) => (
        <div
          key={referee._id}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="col-span-1 md:col-span-3">
            <h3 className="font-medium text-md">Referee {index + 1}</h3>
          </div>
          <InputField
            type="text"
            label="Name"
            name="name"
            placeholder="Enter Name"
            value={referee.name}
            disabled={true}
          />
          <InputField
            type="text"
            label="Portfolio"
            name="portfolio"
            placeholder="Enter Portfolio"
            value={referee.portfolio}
            disabled={true}
          />
          <InputField
            type="email"
            label="Email"
            name="email"
            placeholder="Enter Email"
            value={referee.email}
            disabled={true}
          />
          <InputField
            type="text"
            label="Phone"
            name="phone"
            placeholder="Enter Phone"
            value={referee.phone}
            disabled={true}
          />
          <InputField
            type="text"
            label="Organization"
            name="organization"
            placeholder="Enter Organization"
            value={referee.organization}
            disabled={true}
          />
          <InputField
            type="text"
            label="Location"
            name="location"
            placeholder="Enter Location"
            value={referee.location}
            disabled={true}
          />
        </div>
      ))}
    </div>
  );
};

export default Referrals;
