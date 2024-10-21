import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Button from '../../../components/button/Button';
import UserDetails from './UserDetails';
import Exprience from './Exprience';
import Qualification from './Qualification';
import Academics from './Academics';
import Refrees from './Refrees';
import { getUserProfile } from '../../../api/userApi';
import { createApplication } from '../../../api/applicationApi';
import Loader from '../../../components/loader/Loader';
import Preview from './Preview';
import Success from './Success';
const ApplicationForm = () => {
    const [activeTab, setActiveTab] = useState(1);
   
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        surName: '',
        email: '',
        gender: '',
        phone: '',
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
        
        // conference: [
        //     { name: '', location: '', date: null, paperTitle: '', fileUrl: '', }
        // ],
        professionalMemberships: [
            {
                organizationName:"", rank:"", fileUrl:''
            }
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
        refrees: [{ name: '', portfolio: '', email: '', phone: '', organization:'', location:'' }]
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
                    firstName: data.firstName, // Use correct keys from API response
                    middleName: data.middleName,
                    surName: data.surName,
                    phone: data.phone,
                    email: data.email,
                    gender: data.gender,
                    faculty: data.faculty,
                    department: data.department,
                    role: data.role,
                    dateOfBirth: formattedDate,
                });
            } else {
                toast.error('Failed to retrieve user details');
            }
        } catch (error) {
            // console.error("Error:", error);
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);
    const [tabValidation, setTabValidation] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
    });
    
    const [errors, setErrors] = useState({});
    

    const validateTab = (tabNum) => {
        const errors = {};
        let isValid = true;
    
        switch (tabNum) {
            case 1: // Validation for Tab 1
                if (!formData.placeOfBirth) {
                    errors.placeOfBirth = "Place of birth is required.";
                    isValid = false;
                }
                if (!formData.lga) {
                    errors.lga = "LGA is required.";
                    isValid = false;
                }
                if (!formData.state) {
                    errors.state = "State is required.";
                    isValid = false;
                }
                if (!formData.country) {
                    errors.country = "Country is required.";
                    isValid = false;
                }
                if (!formData.homeAddress.address || !formData.homeAddress.city || !formData.homeAddress.state) {
                    errors.homeAddress = "Home address must include address, city, and state.";
                    isValid = false;
                }
                if (!formData.contactAddress.address || !formData.contactAddress.state || !formData.contactAddress.phone) {
                    errors.contactAddress = "Contact address must include address, state, and phone.";
                    isValid = false;
                }
                break;
    
            case 2: // Validation for Tab 2
                if (formData.institutions.length === 0 || formData.institutions.some(inst => !inst.name || !inst.course || !inst.location || !inst.grade || !inst.startYear || !inst.endYear)) {
                    errors.institutions = "At least one institution is required and must include name, course, location, grade, start year, and end year.";
                    isValid = false;
                }
                if (formData.academicQualification.length === 0 || formData.academicQualification.some(qual => !qual.certificate || !qual.institution || !qual.dateAwarded || !qual.fileUrl)) {
                    errors.academicQualification = "At least one academic qualification is required, including certificate, institution, date awarded, and a file upload.";
                    isValid = false;
                }
                break;
    
            case 3: // Validation for Tab 3
                if (formData.experience.length === 0 || formData.experience.some(exp => !exp.name || !exp.description || !exp.role || !exp.startYear || !exp.endYear)) {
                    errors.experience = "At least one experience entry is required and must include name, description, role, start year, and end year.";
                    isValid = false;
                }
                
                break;
    
            case 4:
               
                break;
                case 5: // Validation for Tab 5
                if (formData.refrees.length < 3) {
                    errors.refrees = "Please provide at least 3 referees.";
                    isValid = false;
                }
                formData.refrees.forEach((ref, index) => {
                    if (!ref.name) {
                        errors[`refrees_name_${index}`] = `Referee ${index + 1} name is required.`;
                        isValid = false;
                    }
                    if (!ref.portfolio) {
                        errors[`refrees_portfolio_${index}`] = `Referee ${index + 1} portfolio is required.`;
                        isValid = false;
                    }
                    if (!ref.email) {
                        errors[`refrees_email_${index}`] = `Referee ${index + 1} email is required.`;
                        isValid = false;
                    }
                    if (!ref.phone) {
                        errors[`refrees_phone_${index}`] = `Referee ${index + 1} phone number is required.`;
                        isValid = false;
                    }
                });
               
                break;
    
        
        }
    
        setErrors(errors); // Set errors to be displayed or handled
        setTabValidation((prev) => ({ ...prev, [tabNum]: isValid })); // Update validation state for the current tab
        return isValid;
    };
    
    
    const changeTab = (nextTab) => {
        console.log("Form Data:", formData); 
        if (validateTab(activeTab)) {
            setActiveTab(nextTab);
        } else {
            // console.log("Validation failed for tab:", activeTab); // Log which tab failed validation
            toast.error("Please fill out all required fields before proceeding.");
        }
    };
    

    const handleOnChange = (e, index, field, section) => {
        const { value } = e.target;

        setFormData((prevData) => {
            if (Array.isArray(prevData[section])) {
                const updatedSection = prevData[section].map((item, idx) =>
                    idx === index ? { ...item, [field]: value } : item
                );
                return { ...prevData, [section]: updatedSection };
            } else if (typeof prevData[section] === 'object' && prevData[section] !== null) {
                return {
                    ...prevData,
                    [section]: { ...prevData[section], [field]: value }
                };
            }
            return { ...prevData, [section]: value };
        });
    };
const [loading, setLoading] = useState(false)
const [successData, setSuccessData] = useState({})
    const submitApplication = async () => {
        const isValid = validateTab(activeTab);
        if (!isValid) {
            Object.values(errors).forEach((error) => {
                toast.error(error);
            });
            return;
        }

        const token = localStorage.getItem('token');
        try {
            setLoading(true)
            const response = await createApplication(formData, token);
            if (response.status === "success") {
                toast("Application submitted successfully.");
                setSuccessData(Result.data)
                setLoading(false)
            } else {
                toast.error("Submitting application failed. Please try again.");
            }
        } catch (error) {
            setLoading(false)
            // console.error('Error submitting application:', error);
            toast.error(error.response?.data?.message || "An error occurred submitting application.");
        }finally{
            setLoading(false);
        }
    };   
    return (
        <div className="flex flex-col justify-center items-center text-center p-4 shadow-md border">

          

            <hr className="my-4" />

            {/* Conditional Rendering of Form Sections Based on Active Tab */}
            {activeTab === 1 && (
                <>
                <UserDetails formData={formData} setFormData={setFormData} handleOnChange={handleOnChange} errors={errors} />
              <Button variant='solid' onClick={() => changeTab(2)} label="Next" /> 
              </>
            )}

{activeTab === 2 && (
 <>
 <div className='flex flex-col'>
 <Qualification formData={formData} setFormData={setFormData} handleOnChange={handleOnChange} errors={errors}/>
 <div className='flex flex-row items-center justify-between'>
 <Button variant='outline' onClick={() => changeTab(1)} label="Previous" />
 <Button variant='solid' onClick={() => changeTab(3)} label="Next" />
 </div>
 </div>
 </>
)}
{activeTab === 3 && (
 <>
  <div className='flex flex-col'>
 <Exprience formData={formData} setFormData={setFormData} handleOnChange={handleOnChange} errors={errors}/>
 <div className='flex flex-row items-center justify-between'>
 <Button variant='outline' onClick={() => changeTab(2)} label="Previous" />
 <Button variant='solid' onClick={() => changeTab(4)} label="Next" />
 </div>
 </div>
 </>
)}
{activeTab === 4 && (
 <>
  <div className='flex flex-col'>
 <Academics formData={formData} setFormData={setFormData} handleOnChange={handleOnChange} errors={errors}/>
 <div className='flex flex-row items-center justify-between'>
 <Button variant='outline' onClick={() => changeTab(3)} label="Previous" />
<Button variant='solid' onClick={() => changeTab(5)} label="Next" />
 </div>
 </div>

 </>
)}
{activeTab === 5 && (
 <>
 <div className='flex flex-col space-y-5'>
 <Refrees formData={formData} setFormData={setFormData} handleOnChange={handleOnChange} errors={errors}/>
 <div className='flex flex-row items-center justify-between'>
 <Button variant='outline' onClick={() => changeTab(4)} label="Previous" />
 <Button variant='solid' onClick={() => changeTab(6)} label={loading ? <Loader loading={loading} /> :"Submit"} />
    </div>
    </div>
 </>
)}
{activeTab === 6 && (
 <>
 <div className='flex flex-col space-y-5'>
 <Preview formData={formData}/>
 <div className='flex flex-row items-center justify-between'>
 <Button variant='outline' onClick={() => changeTab(5)} label="Previous" />
 <Button variant='solid' onClick={submitApplication} label={loading ? <Loader loading={loading} /> :"Submit"} />
    </div>
    </div>
 </>
)}
{activeTab === 7 && (
 <>
 <div className='flex flex-col space-y-4'>
 <Success successData={successData}/>
    </div>
 </>
)}
        
        </div>
    );
};

export default ApplicationForm;
