import React from 'react';
import Modal from '../../../components/modal/Modal';
import SelectField from '../../../components/control/SelectField';
import InputField from '../../../components/control/InputField';
import TextAreaField from '../../../components/control/TextAreaField';
import Button from '../../../components/button/Button';

const UpdateQuestionModal = ({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleOptionChange,
  handleUpdateSubmit,
  departments,
  questionTypes,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Question">
      <form onSubmit={handleUpdateSubmit} className="space-y-4 p-4">
        <SelectField
          label="Department"
          name="department"
          value={formData.department}
          options={[{ value: '', label: 'Select Department' }, ...departments]}
          onChange={handleInputChange}
        />

        <SelectField
          label="Question Type"
          name="questionType"
          value={formData.questionType}
          options={[
            { value: '', label: 'Select Question Type' },
            ...questionTypes,
          ]}
          onChange={handleInputChange}
        />

        <TextAreaField
          label="Question Text"
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          placeholder="Enter question text"
        />

        {formData.options.map((option, index) => (
          <InputField
            key={index}
            label={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Enter option ${index + 1}`}
          />
        ))}

        <SelectField
          label="Correct Answer"
          name="correctAnswer"
          value={formData.correctAnswer}
          options={[
            { value: '', label: 'Select Correct Answer' },
            ...formData.options.map((option, index) => ({
              value: option,
              label: `Option ${index + 1}`,
            })),
          ]}
          onChange={handleInputChange}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            label="Cancel"
            onClick={onClose}
            className="bg-gray-500"
          />
          <Button type="submit" label="Update Question" disabled={isLoading} />
        </div>
      </form>
    </Modal>
  );
};

export default UpdateQuestionModal;
