import React from 'react';
import InputField from '../../../components/control/InputField';
import SelectField from '../../../components/control/SelectField';

const UserDetails = ({ formData, setFormData, errors }) => {
    const departmentOptions = [
        { value: 'Library and Information Science', label: 'Library and information science' },
        { value: 'Computer Engineering', label: 'Computer engineering' },
        { value: 'Computer Science', label: 'Computer science' },
        { value: 'Electrical Engineering', label: 'Electrical engineering' },
        { value: 'Accountancy', label: 'Accountancy' },
    ];

    const roleOptions = [
        { value: 'Senior Lecturer', label: 'Senior Lecturer' },
        { value: 'Lecturer I', label: 'Lecturer I' },
        { value: 'Lecturer II', label: 'Lecturer II' },
        { value: 'Lecturer III', label: 'Lecturer III' },
        { value: 'Senior Instructor', label: 'Senior Instructor' },
        { value: 'Technologist I', label: 'Technologist I' },
        { value: 'Accountant', label: 'Accountant' },
    ];

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleOnChangeHomeAddress = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            homeAddress: {
                ...prevFormData.homeAddress,
                [name.split('.').pop()]: value,
            },
        }));
    };

    const handleOnChangeContactAddress = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            contactAddress: {
                ...prevFormData.contactAddress,
                [name.split('.').pop()]: value,
            },
        }));
    };

    return (
        <div className="flex flex-col space-y-2">
            <p className="text-xl md:text-2xl text-start text-dark font-bold pb-4">User Details</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <InputField
                    type="text"
                    label="First Name"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleOnChange}
                    error={errors.firstName}
                    disabled={true}
                />
                <InputField
                    type="text"
                    label="Middle Name"
                    name="middleName"
                    placeholder="Enter your middle name"
                    value={formData.middleName}
                    onChange={handleOnChange}
                    error={errors.middleName}
                    disabled={true}
                />
                <InputField
                    type="text"
                    label="Surname"
                    name="surName"
                    placeholder="Enter your surname"
                    value={formData.surName}
                    onChange={handleOnChange}
                    error={errors.surName}
                    disabled={true}
                />
                <InputField
                    type="tel"
                    label="Phone Number"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleOnChange}
                    error={errors.phone}
                    maxLength={11}
                />
                <InputField
                    type="date"
                    label="Date of Birth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleOnChange}
                    error={errors.dateOfBirth}
                    disabled={true}
                />
                <InputField
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleOnChange}
                    error={errors.email}
                    // disabled={true}
                />
                <SelectField
                    label="Gender"
                    name="gender"
                    options={[
                        { value: 'm', label: 'Male' },
                        { value: 'f', label: 'Female' },
                    ]}
                    value={formData.gender}
                    onChange={handleOnChange}
                    error={errors.gender}
                    disabled={true}
                />

                <InputField
                    type="text"
                    label="Place of Birth"
                    name="placeOfBirth"
                    placeholder="Enter your place of birth"
                    value={formData.placeOfBirth}
                    onChange={handleOnChange}
                    error={errors.placeOfBirth}
                />
                <InputField
                    type="text"
                    label="LGA"
                    name="lga"
                    placeholder="Enter your LGA"
                    value={formData.lga}
                    onChange={handleOnChange}
                    error={errors.lga}
                />
                <InputField
                    type="text"
                    label="State"
                    name="state"
                    placeholder="Enter your state"
                    value={formData.state}
                    onChange={handleOnChange}
                    error={errors.state}
                />
                <InputField
                    type="text"
                    label="Country"
                    name="country"
                    placeholder="Enter your country"
                    value={formData.country}
                    onChange={handleOnChange}
                    error={errors.country}
                />
            </div>

            <p className="text-xl md:text-2xl text-start text-dark font-bold pb-4">Home Address</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <InputField
                    type="text"
                    label="Address"
                    name="homeAddress.address"
                    placeholder="Enter your address"
                    value={formData.homeAddress?.address || ''}
                    onChange={handleOnChangeHomeAddress}
                    error={errors.homeAddress?.address}
                />
                <InputField
                    type="text"
                    label="City"
                    name="homeAddress.city"
                    placeholder="Enter your city/LGA"
                    value={formData.homeAddress?.city || ''}
                    onChange={handleOnChangeHomeAddress}
                    error={errors.homeAddress?.city}
                />
                <InputField
                    type="text"
                    label="State"
                    name="homeAddress.state"
                    placeholder="Enter your state"
                    value={formData.homeAddress?.state || ''}
                    onChange={handleOnChangeHomeAddress}
                    error={errors.homeAddress?.state}
                />
                <InputField
                    type="text"
                    label="Country"
                    name="homeAddress.country"
                    placeholder="Enter your country"
                    value={formData.homeAddress?.country || ''}
                    onChange={handleOnChangeHomeAddress}
                    error={errors.homeAddress?.country}
                />
            </div>

            <p className="text-xl md:text-2xl text-start text-dark font-bold pb-4">Contact Address</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <InputField
                    type="text"
                    label="Address"
                    name="contactAddress.address"
                    placeholder="Enter your address"
                    value={formData.contactAddress?.address || ''}
                    onChange={handleOnChangeContactAddress}
                    error={errors.contactAddress?.address}
                />
                <InputField
                    type="text"
                    label="State"
                    name="contactAddress.state"
                    placeholder="Enter your state"
                    value={formData.contactAddress?.state || ''}
                    onChange={handleOnChangeContactAddress}
                    error={errors.contactAddress?.state}
                />
                <InputField
                    type="text"
                    label="Phone"
                    name="contactAddress.phone"
                    placeholder="Enter your phone"
                    value={formData.contactAddress?.phone || ''}
                    onChange={handleOnChangeContactAddress}
                    error={errors.contactAddress?.phone}
                />
            </div>

            <p className="text-xl md:text-2xl text-start text-dark font-bold pb-4">School Details</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <SelectField
                    label="School"
                    name="faculty"
                    options={[
                        { value: 'Technology', label: 'Technology' },
                        { value: 'Management', label: 'Management' },
                        { value: 'General Studies', label: 'General Studies' },
                    ]}
                    value={formData.faculty}
                    onChange={handleOnChange}
                    error={errors.faculty}
                    disabled={true}
                />
                <SelectField
                    label="Department"
                    name="department"
                    options={
                        formData.faculty === 'Management'
                            ? [{ value: 'Accountancy', label: 'Accountancy' }]
                            : departmentOptions.filter((department) => department.value !== 'Accountancy')
                    }
                    value={formData.department}
                    onChange={handleOnChange}
                    error={errors.department}
                    disabled={true}
                />
                <SelectField
                    label="Role"
                    name="role"
                    options={
                        formData.department === 'Accountancy'
                            ? [
                                { value: 'Senior Lecturer', label: 'Senior Lecturer' },
                                { value: 'Lecturer I', label: 'Lecturer I' },
                                { value: 'Lecturer II', label: 'Lecturer II' },
                                { value: 'Lecturer III', label: 'Lecturer III' },
                              ]
                            : formData.faculty === 'Technology' &&
                              ['Library and Information Science', 'Electrical Engineering'].includes(formData.department)
                            ? [
                                { value: 'Senior Lecturer', label: 'Senior Lecturer' },
                                { value: 'Lecturer I', label: 'Lecturer I' },
                                { value: 'Lecturer II', label: 'Lecturer II' },
                                { value: 'Lecturer III', label: 'Lecturer III' },
                              ]
                            : formData.faculty === 'Technology' && formData.department === 'Computer Engineering'
                            ? [
                                { value: 'Senior Lecturer', label: 'Senior Lecturer' },
                                { value: 'Lecturer I', label: 'Lecturer I' },
                                { value: 'Lecturer II', label: 'Lecturer II' },
                                { value: 'Senior Instructor', label: 'Senior Instructor' },
                                { value: 'Technologist I', label: 'Technologist I' },
                              ]
                            : formData.faculty === 'Technology' && formData.department === 'Computer Science'
                            ? [
                                { value: 'Senior Lecturer', label: 'Senior Lecturer' },
                                { value: 'Lecturer I', label: 'Lecturer I' },
                                { value: 'Lecturer II', label: 'Lecturer II' },
                                { value: 'Senior Instructor', label: 'Senior Instructor' },
                                { value: 'Technologist I', label: 'Technologist I' },
                              ]
                            : roleOptions
                    }
                    value={formData.role}
                    onChange={handleOnChange}
                    error={errors.role}
                    disabled={true}
                />
            </div>
        </div>
    );
};

export default UserDetails;
