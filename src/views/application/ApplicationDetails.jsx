import React, { useRef, useState, useEffect } from 'react';
import Button from '../../components/button/Button';
import { getUserApplication } from '../../api/applicationApi';
import { getUserProfile} from '../../api/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import FormatDate from '../../components/table/FormatDate';
const ApplicationDetails = () => {
  const componentRef = useRef();
  const [dummyData, setDummyData] = useState({
    dateOfBirth: '',
    hobby: '',
    placeOfBirth: '',
    lga: '',
    state: '',
    country: '',
    faculty: '',
    department:'',
    role: '',
    passport: '',
    homeAddress: { address: '', city: '', state: '', country:'' },
        contactAddress: { address: '', state: '', phone: '' },
        experience: [
            { name: '', description: '', role: '', startYear: null, endYear: null,  fileUrl: '' }
        ],
        institutions: [
            { name: '', course: '', grade: '', location: '', startYear: null, endYear: null }
        ],
        academicQualification: [
            { certificate: '', institution: '', dateAwarded: null, fileUrl: '' }
        ],
        presentJob: {
            jobTitle: '',
            employer: '',
            role: '',
            startYear: '',
            description: '',
            fileUrl: ''
        },
        conference: [
            { name: '', location: '', date: null, paperTitle: '', fileUrl: '', }
        ],
        professionalAchievement: '',
        honors: [
            { name: '', organization: '', date: null, fileUrl: '', }
        ],
        grants: [
            { title: '', amount: '', date: null, experience: '', fileUrl: '', }
        ],
        inventions: [
            { title: '', number: '', date: null, fileUrl: '', }
        ],
        publication: [
            { title: '', type: '', date: null, fileUrl: '', }
        ],
        service: [
            { bodyName: '', role: '', date: null, fileUrl: '', }
        ],
        refrees: [{ name: '', portfolio: '', email: '', phone: '' }]
  });
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
 

  // Function to handle print
  const handlePrint = () => {
    window.print();
  }
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    surName: '',
    phone: '',
    email: '',
    ninPassportBase64:'',
    passport:'',
  });
  const getUserDetails = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await getUserProfile(token);
        if (response.success) {
            const data = response.data;
            const [year, month, day] = data.dateOfBirth.split('-');
            const parsedDate = new Date(`${year}-${month}-${day}`);
            const formattedDate = parsedDate.toISOString().slice(0, 10);
            
            setFormData({
                ...formData,
                firstName: data.firstName, 
                middleName: data.middleName,
                surName: data.surName,
                phone: data.phone,
                email: data.email,
                gender: data.gender,
                faculty: data.faculty,
                department: data.department,
                role: data.role,
                dateOfBirth: formattedDate,
                passport:data.passport,
                ninPassportBase64:data.ninPassportBase64,
            });
        } else {
            toast.error('Failed to retrieve user details');
        }
    } catch (error) {
        // console.error("Error:", error);
        toast.error("Error:", error);
    }
};

useEffect(() => {
    getUserDetails();
    
}, []);
const [errorMessage, setErrorMessage] = useState('');

const getApplicationDetails = async () => {
  const token = localStorage.getItem('token');
 
  try {
      const response = await getUserApplication(token);
      if (response.status === 'success') {
          const data = response.data;

          // Utility function to split fileUrl if it's a string
          const splitFileUrl = (items) => {
              items.forEach((item) => {
                  if (typeof item.fileUrl === 'string') {
                      item.fileUrl = item.fileUrl.split(','); // Split string into an array
                  }
              });
          };

          
          if (data.academicQualification) {
              splitFileUrl(data.academicQualification);
          }
          if (data.honors) {
              splitFileUrl(data.honors);
          }
          if (data.experience) {
            splitFileUrl(data.experience);
        }
        if (data.professionalMemberships) {
          splitFileUrl(data.professionalMemberships);
      }
          if (data.grants) {
              splitFileUrl(data.grants);
          }
          if (data.inventions) {
              splitFileUrl(data.inventions);
          }
          if (data.publication) {
              splitFileUrl(data.publication);
          }
          if (data.service) {
              splitFileUrl(data.service);
          }

          setDummyData(data);
          setErrorMessage('');
        } else {
          // Handle error responses
          if (response.error && response.error.statusCode === 404) {
              setErrorMessage("No application found for this user.");
          } else {
              setErrorMessage("An unexpected error occurred. Please try again.");
          }
      }
  } catch (error) {
      console.log("Error:", error);
      setErrorMessage("An error occurred while fetching the application details.");
  }
};


useEffect(() => {
  getApplicationDetails();
}, []);

if (errorMessage) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
    <div className="text-center flex flex-col space-y-3">
        <h2 className="text-xl font-bold">
            No Application. Go to the application page.
        </h2>
        <Button
            onClick={() => navigate("/app/application")}
            className="w-full h-full"
            label="Back to Application"
        />
    </div>
</div>
  );
}

if (!dummyData || Object.keys(dummyData).length === 0) {
  return (
      <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center flex flex-col space-y-3">
              <h2 className="text-xl font-bold">
                  No Application. Go to the application page.
              </h2>
              <Button
                  onClick={() => navigate("/app/application")}
                  className="w-full h-full"
                  label="Back to Application"
              />
          </div>
      </div>
  );
}

  return (
    <div className="p-4 shadow-md border my-6">
      <h1 className="text-xl md:text-2xl text-center text-dark font-bold mb-4">KSITM RECRUITMENT 2024</h1>
      <p>Application Slip</p>
      <div ref={componentRef} className="flex flex-col">
        {/* Applicant Details Section */}
        <h2 className="text-lg font-bold mb-2">Applicant Details</h2>
        <div className='flex justify-between items-center py-5'>
          <div />
          <div className='grid grid-cols-2 gap-2'>
          
          <div className="flex justify-center items-center md:col-span-1">
          <img 
  src={`data:image/jpeg;base64,${formData.
    ninPassportBase64}`} 
  alt="User-photo" 
  className="w-40 h-40 object-cover rounded-md" 
/>
</div>

          <div className="flex justify-center items-center md:col-span-1">
          <img  src={`${formData.passport}`} alt="User-photo" className="w-40 h-40 object-cover rounded-md" />

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
                <td className="border border-gray-300 px-4 py-2">{formData?.firstName} {formData?.middleName} {formData?.surName}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Email:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{formData?.email}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Phone Number:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{formData?.phone}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Date of Birth:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{formData?.dateOfBirth}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Gender:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{formData?.gender}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>NIN:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{formData?.nin}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>User ID:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{formData?.userId}</td>
                </tr>
                <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Place of Birth:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{dummyData.placeOfBirth}</td>

                </tr>
                <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>LGA:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{dummyData?.lga}</td>
                </tr>
                <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>State:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{dummyData?.state}</td>
                </tr>
                <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Country:</strong></td>
                <td className="border border-gray-300 px-4 py-2">{dummyData?.country}</td>
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
            <td className="border border-gray-300 px-4 py-2">{dummyData.homeAddress.address}</td>
        <td className="border border-gray-300 px-4 py-2">{dummyData.homeAddress.city}</td>
        <td className="border border-gray-300 px-4 py-2">{dummyData.homeAddress.state}</td>
        <td className="border border-gray-300 px-4 py-2">{dummyData.homeAddress.country}</td>
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
                  <td className="border border-gray-300 px-4 py-2">{dummyData?.contactAddress?.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{dummyData?.contactAddress?.state}</td>
                  <td className="border border-gray-300 px-4 py-2">{dummyData?.contactAddress?.phone}</td>
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
              {dummyData?.institutions.map((qual, index) => (
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
              {dummyData?.experience.map((exp, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{exp.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{exp.role}</td>
                  <td className="border border-gray-300 px-4 py-2"><FormatDate value={exp.startYear} /></td>
                  <td className="border border-gray-300 px-4 py-2"><FormatDate value={exp.endYear} /></td>
                  <td className="border border-gray-300 px-4 py-2">{exp.description}</td>
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
      {/* Ensure dummyData and professionalMemberships are defined */}
      {dummyData?.professionalMemberships?.length > 0 ? (
        dummyData.professionalMemberships.map((exp, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2">{exp.organizationName}</td>
            <td className="border border-gray-300 px-4 py-2">{exp.rank}</td>
            <td className="border border-gray-300 px-4 py-2">
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
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3} className="border border-gray-300 px-4 py-2 text-center">No professional memberships found.</td>
        </tr>
      )}
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
              {dummyData?.publication.map((publication, index) => (
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
              {dummyData?.honors.map((honor, index) => (
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
              {dummyData?.grants.map((grant, index) => (
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
              {dummyData?.inventions.map((invention, index) => (
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
              {dummyData?.publication.map((publication, index) => (
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
              {dummyData?.service.map((service, index) => (
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
              {dummyData?.refrees.map((referee, index) => (
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
        <p className="border border-gray-300 p-4">{dummyData?.professionalAchievement}</p>
        <h2 className="text-lg font-bold mb-2">Hobby</h2>
        <p className="border border-gray-300 p-4">{dummyData?.hobby}</p>
      </div>
      <div className="flex justify-center py-5">
<Button  onClick={handlePrint} label="Print" />
      </div>
    </div>
  );
};

export default ApplicationDetails;