import React from 'react'
import FormatDate from '../../../components/table/FormatDate';
const Preview = ({ formData }) => {
    // Utility function to split fileUrl if it's a string
    const splitFileUrl = (items) => {
        items.forEach((item) => {
            if (typeof item.fileUrl === 'string') {
                item.fileUrl = item.fileUrl.split(','); // Split string into an array
            }
        });
    };

    const processFormData = () => {
        const clonedFormData = { ...formData };  // Clone formData to avoid mutating props

        if (clonedFormData.academicQualification) {
            splitFileUrl(clonedFormData.academicQualification);
        }
        if (clonedFormData.honors) {
            splitFileUrl(clonedFormData.honors);
        }
        if (clonedFormData.grants) {
            splitFileUrl(clonedFormData.grants);
        }
        if (clonedFormData.inventions) {
            splitFileUrl(clonedFormData.inventions);
        }
        if (clonedFormData.publication) {
            splitFileUrl(clonedFormData.publication);
        }
        if (clonedFormData.service) {
            splitFileUrl(clonedFormData.service);
        }

        return clonedFormData;  // Return the modified formData
    };

    const processedData = processFormData();    
  return (
    
    <div  className="flex flex-col">
      {/* Applicant Details Section */}
      <h2 className="text-lg font-bold mb-2">Preview your Application</h2>
      <div className='flex justify-between items-center py-5'>
        <div />
        <div className='grid grid-cols-2 gap-2'>
        
        <div className="flex justify-center items-center md:col-span-1">
        <img 
src={`data:image/jpeg;base64,${processedData.
  ninPassportBase64}`} 
alt="User-photo" 
className="w-40 h-40 object-cover rounded-md" 
/>
</div>

        <div className="flex justify-center items-center md:col-span-1">
        <img  src={`${processedData.passport}`} alt="User-photo" className="w-40 h-40 object-cover rounded-md" />

        </div>
        </div>
      </div>
        <div className='overflow-x-auto'>
        <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Field</th>
              <th className="border border-gray-300 px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><strong>Full Name:</strong></td>
              <td className="border border-gray-300 px-4 py-2">{processedData?.firstName} {processedData?.middleName} {processedData?.surName}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><strong>Email:</strong></td>
              <td className="border border-gray-300 px-4 py-2">{processedData?.email}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><strong>Phone Number:</strong></td>
              <td className="border border-gray-300 px-4 py-2">{processedData?.phone}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><strong>Date of Birth:</strong></td>
              <td className="border border-gray-300 px-4 py-2">{processedData?.dateOfBirth}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><strong>Gender:</strong></td>
              <td className="border border-gray-300 px-4 py-2">{processedData?.gender}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><strong>NIN:</strong></td>
              <td className="border border-gray-300 px-4 py-2">{processedData?.nin}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><strong>User ID:</strong></td>
              <td className="border border-gray-300 px-4 py-2">{processedData?.userId}</td>
              </tr>
              <tr>
              <td className="border border-gray-300 px-4 py-2"><strong>Place of Birth:</strong></td>
              <td className="border border-gray-300 px-4 py-2">{processedData.placeOfBirth}</td>

              </tr>
              <tr>
              <td className="border border-gray-300 px-4 py-2"><strong>LGA:</strong></td>
              <td className="border border-gray-300 px-4 py-2">{processedData?.lga}</td>
              </tr>
              <tr>
              <td className="border border-gray-300 px-4 py-2"><strong>State:</strong></td>
              <td className="border border-gray-300 px-4 py-2">{processedData?.state}</td>
              </tr>
              <tr>
              <td className="border border-gray-300 px-4 py-2"><strong>Country:</strong></td>
              <td className="border border-gray-300 px-4 py-2">{processedData?.country}</td>
            </tr>
            
          </tbody>
        </table>

        {/* User Image */}
        
      </div>

      {/* Home Address Section */}
      <h2 className="text-lg font-bold mb-2">Home Address</h2>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">City</th>
              <th className="border border-gray-300 px-4 py-2">State</th>
              <th className="border border-gray-300 px-4 py-2">Country</th>
            </tr>
          </thead>
          <tbody>
          <td className="border border-gray-300 px-4 py-2">{processedData.homeAddress.address}</td>
      <td className="border border-gray-300 px-4 py-2">{processedData.homeAddress.city}</td>
      <td className="border border-gray-300 px-4 py-2">{processedData.homeAddress.state}</td>
      <td className="border border-gray-300 px-4 py-2">{processedData.homeAddress.country}</td>
          </tbody>
        </table>
      </div>

      {/* Contact Address Section */}
      <h2 className="text-lg font-bold mb-2">Contact Address</h2>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">State</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
         
              <tr>
                <td className="border border-gray-300 px-4 py-2">{processedData?.contactAddress?.address}</td>
                <td className="border border-gray-300 px-4 py-2">{processedData?.contactAddress?.state}</td>
                <td className="border border-gray-300 px-4 py-2">{processedData?.contactAddress?.phone}</td>
              </tr>
           
          </tbody>
        </table>
      </div>

      {/* Qualifications Section */}
      <h2 className="text-lg font-bold mb-2">Qualifications</h2>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Institution</th>
              <th className="border border-gray-300 px-4 py-2">Start Year</th>
              <th className="border border-gray-300 px-4 py-2">End Year</th>
              <th className="border border-gray-300 px-4 py-2">Grade</th>
              <th className="border border-gray-300 px-4 py-2">Course</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {processedData?.institutions.map((qual, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{qual?.name}</td>
                <td className="border border-gray-300 px-4 py-2"><FormatDate value={qual?.startYear} /></td>
                <td className="border border-gray-300 px-4 py-2"><FormatDate value={qual?.endYear} /></td>
                <td className="border border-gray-300 px-4 py-2">{qual?.grade}</td>
                <td className="border border-gray-300 px-4 py-2">{qual?.course}</td>
                <td className="border border-gray-300 px-4 py-2">{qual?.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Experience Section */}
      <h2 className="text-lg font-bold mb-2">Experience</h2>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Company</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Start Year</th>
              <th className="border border-gray-300 px-4 py-2">End Year</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {processedData?.experience.map((exp, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{exp.name}</td>
                <td className="border border-gray-300 px-4 py-2">{exp.role}</td>
                <td className="border border-gray-300 px-4 py-2"><FormatDate value={exp.startYear} /></td>
                <td className="border border-gray-300 px-4 py-2"><FormatDate value={exp.endYear} /></td>
                <td className="border border-gray-300 px-4 py-2">{exp.description}</td>
                <td className="border border-gray-300 px-4 py-2">
    {processedData?.experience?.fileUrl?.length > 0 ? (
      // Map through the array of file URLs and display each as a clickable link
      experience.fileUrl.map((url, urlIndex) => (
        <div key={urlIndex}>
          <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            View File {urlIndex + 1}
          </a>
        </div>
      ))
    ) : (
      <span>No files available</span>
    )}
  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-bold mb-2">Professional Memberships</h2>
        <div className='overflow-x-auto'>
          <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Organisation Name</th>
                <th className="border border-gray-300 px-4 py-2">Rank</th>
                <th className="border border-gray-300 px-4 py-2">Files</th>
              </tr>
            </thead>
            <tbody>
              {processedData?.professionalMemberships.map((exp, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{exp.organizationName}</td>
                  <td className="border border-gray-300 px-4 py-2">{exp.rank}</td>
                  {exp?.fileUrl?.length > 0 ? (
      // Map through the array of file URLs and display each as a clickable link
      exp.fileUrl.map((url, urlIndex) => (
        <div key={urlIndex}>
          <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            View File {urlIndex + 1}
          </a>
        </div>
      ))
    ) : (
      <span>No files available</span>
    )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

{/* Publications Section */}
<h2 className="text-lg font-bold mb-2">Publications</h2>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">File</th>
            </tr>
          </thead>
          <tbody>
            {processedData?.publication.map((publication, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{publication?.title}</td>
                <td className="border border-gray-300 px-4 py-2">{publication?.type}</td>
                <td className="border border-gray-300 px-4 py-2"><FormatDate value={publication?.date}/></td>
                <td className="border border-gray-300 px-4 py-2">
    {publication?.fileUrl?.length > 0 ? (
      // Map through the array of file URLs and display each as a clickable link
      publication.fileUrl.map((url, urlIndex) => (
        <div key={urlIndex}>
          <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            View File {urlIndex + 1}
          </a>
        </div>
      ))
    ) : (
      <span>No files available</span>
    )}
  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    

      {/* Honors Section */}
      <h2 className="text-lg font-bold mb-2">Honors</h2>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Honor</th>
              <th className="border border-gray-300 px-4 py-2">Organization</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">File</th>
            </tr>
          </thead>
          <tbody>
            {processedData?.honors.map((honor, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{honor?.name}</td>
                <td className="border border-gray-300 px-4 py-2">{honor?.organization}</td>
                <td className="border border-gray-300 px-4 py-2"><FormatDate value={honor?.date} /></td>
                <td className="border border-gray-300 px-4 py-2">
    {honor?.fileUrl?.length > 0 ? (
      // Map through the array of file URLs and display each as a clickable link
      honor.fileUrl.map((url, urlIndex) => (
        <div key={urlIndex}>
          <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            View File {urlIndex + 1}
          </a>
        </div>
      ))
    ) : (
      <span>No files available</span>
    )}
  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grants Section */}
      <h2 className="text-lg font-bold mb-2">Grants</h2>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Experience</th>
              <th className="border border-gray-300 px-4 py-2">File</th>
            </tr>
          </thead>
          <tbody>
            {processedData?.grants.map((grant, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{grant?.title}</td>
                <td className="border border-gray-300 px-4 py-2">{grant?.amount}</td>
                <td className="border border-gray-300 px-4 py-2"><FormatDate value={grant?.date}/></td>
                <td className="border border-gray-300 px-4 py-2">{grant?.experience}</td>
                <td className="border border-gray-300 px-4 py-2">
    {grant?.fileUrl?.length > 0 ? (
      // Map through the array of file URLs and display each as a clickable link
      grant.fileUrl.map((url, urlIndex) => (
        <div key={urlIndex}>
          <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            View File {urlIndex + 1}
          </a>
        </div>
      ))
    ) : (
      <span>No files available</span>
    )}
  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inventions Section */}
      <h2 className="text-lg font-bold mb-2">Inventions</h2>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Number</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">File</th>
            </tr>
          </thead>
          <tbody>
            {processedData?.inventions.map((invention, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{invention?.title}</td>
                <td className="border border-gray-300 px-4 py-2">{invention?.number}</td>
                <td className="border border-gray-300 px-4 py-2"><FormatDate value={invention?.date}/></td>
                <td className="border border-gray-300 px-4 py-2">
    {invention?.fileUrl?.length > 0 ? (
      // Map through the array of file URLs and display each as a clickable link
      invention.fileUrl.map((url, urlIndex) => (
        <div key={urlIndex}>
          <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            View File {urlIndex + 1}
          </a>
        </div>
      ))
    ) : (
      <span>No files available</span>
    )}
  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Publications Section */}
      <h2 className="text-lg font-bold mb-2">Publications</h2>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">File</th>
            </tr>
          </thead>
          <tbody>
            {processedData?.publication.map((publication, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{publication?.title}</td>
                <td className="border border-gray-300 px-4 py-2">{publication?.type}</td>
                <td className="border border-gray-300 px-4 py-2"><FormatDate value={publication?.date}/></td>
                <td className="border border-gray-300 px-4 py-2">
    {publication?.fileUrl?.length > 0 ? (
      // Map through the array of file URLs and display each as a clickable link
      publication.fileUrl.map((url, urlIndex) => (
        <div key={urlIndex}>
          <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            View File {urlIndex + 1}
          </a>
        </div>
      ))
    ) : (
      <span>No files available</span>
    )}
  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Services Section */}
      <h2 className="text-lg font-bold mb-2">Services</h2>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Body Name</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {processedData?.service.map((service, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{service?.bodyName}</td>
                <td className="border border-gray-300 px-4 py-2">{service?.role}</td>
                <td className="border border-gray-300 px-4 py-2"><FormatDate value={service?.date}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* References Section */}
      <h2 className="text-lg font-bold mb-2">References</h2>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Portfolio</th>
              <th className="border border-gray-300 px-4 py-2">Organisation</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {processedData?.refrees.map((referee, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{referee?.name}</td>
                <td className="border border-gray-300 px-4 py-2">{referee?.portfolio}</td>
                <td className="border border-gray-300 px-4 py-2">{referee?.organization}</td>
                <td className="border border-gray-300 px-4 py-2">{referee?.location}</td>
                <td className="border border-gray-300 px-4 py-2">{referee?.email}</td>
                <td className="border border-gray-300 px-4 py-2">{referee?.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       
      <h2 className="text-lg font-bold mb-2">Professional Achievements</h2>
      <p className="border border-gray-300 p-4">{processedData?.professionalAchievement}</p>
      <h2 className="text-lg font-bold mb-2">Hobby</h2>
      <p className="border border-gray-300 p-4">{processedData?.hobby}</p>
    </div>
  
  )
}

export default Preview