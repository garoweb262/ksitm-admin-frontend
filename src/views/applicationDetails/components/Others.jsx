import React from 'react';

const Others = ({ data }) => {
  // Destructure the required fields from the data prop
  const { hobby, professionalAchievement, rejectionReasons } = data;

  return (
    <div>
      <p>
        <strong className="text-primary">Hobby:</strong> {hobby}
      </p>
      <p>
        <strong className="text-primary">Professional Achievement:</strong>{' '}
        {professionalAchievement}
      </p>

      {/* Displaying rejection reasons */}
      {rejectionReasons && rejectionReasons.length > 0 && (
        <div>
          <h3 className="font-bold text-2xl text-red-500">
            Rejection Reasons:
          </h3>
          <ul>
            {rejectionReasons.map((reason) => (
              <li key={reason._id}>
                <strong>{reason.type}:</strong> {reason.reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Others;
