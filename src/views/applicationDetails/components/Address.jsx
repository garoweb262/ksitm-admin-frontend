import React, { useState } from 'react';
import InputField from '../../../components/control/InputField';
import TextAreaField from '../../../components/control/TextAreaField';
const Address = ({ data }) => {
  const user = data?.userId || {};
  return (
    <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-3">
        <h2 className="font-semibold text-lg">Address Information</h2>
      </div>
      <div>
        <InputField
          type="text"
          label="Place of Birth"
          name="placeOfBirth"
          placeholder="Enter Place of Birth"
          value={data.placeOfBirth}
          disabled={true}
        />
      </div>
      <div>
        <InputField
          type="text"
          label="Country"
          name="country"
          placeholder="Enter Country"
          value={data.country}
          disabled={true}
        />
      </div>
      <div>
        <InputField
          type="text"
          label="State"
          name="state"
          placeholder="Enter State"
          value={data.state}
          disabled={true}
        />
      </div>
      <div>
        <InputField
          type="text"
          label="LGA"
          name="lga"
          placeholder="Enter LGA"
          value={data.lga}
          disabled={true}
        />
      </div>

      {/* Home Address */}
      <div className="col-span-3">
        <h2 className="font-semibold text-lg">Home Address</h2>
      </div>
      <div>
        <TextAreaField
          label="Address"
          name="homeAddress.address"
          placeholder="Enter Address"
          value={data.homeAddress?.address}
          disabled={true}
          rows={4}
          maxLength={300}
        />
      </div>
      <div>
        <InputField
          type="text"
          label="City"
          name="homeAddress.city"
          placeholder="Enter City"
          value={data.homeAddress?.city}
          disabled={true}
        />
      </div>
      <div>
        <InputField
          type="text"
          label="State"
          name="homeAddress.state"
          placeholder="Enter State"
          value={data.homeAddress?.state}
          disabled={true}
        />
      </div>
      <div>
        <InputField
          type="text"
          label="Country"
          name="homeAddress.country"
          placeholder="Enter Country"
          value={data.homeAddress?.country}
          disabled={true}
        />
      </div>

      {/* Contact Address */}
      <div className="col-span-3">
        <h2 className="font-semibold text-lg">Contact Address</h2>
      </div>
      <div>
        <TextAreaField
          label="Address"
          name="contactAddress.address"
          placeholder="Enter Address"
          value={data.contactAddress?.address}
          disabled={true}
          rows={4}
          maxLength={300}
        />
      </div>
      <div>
        <InputField
          type="text"
          label="State"
          name="contactAddress.state"
          placeholder="Enter State"
          value={data.contactAddress?.state}
          disabled={true}
        />
      </div>
      <div>
        <InputField
          type="text"
          label="Contact Phone"
          name="contactAddress.phone"
          placeholder="Enter Phone Number"
          value={data.contactAddress?.phone}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default Address;
