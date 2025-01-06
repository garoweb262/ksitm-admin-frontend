import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Card from '../../../components/card/Card';
import InputField from '../../../components/control/InputField';
import SelectField from '../../../components/control/SelectField';
import TextAreaField from '../../../components/control/TextAreaField';
import FileUpload from '../../../components/control/FileUpload';
import Button from '../../../components/button/Button';
import Tabs from '../../../components/tabs/Tabs';
import { Edit, Delete } from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';
import * as XLSX from 'xlsx';
import {
  getAllQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
  createBulkQuestion,
} from '../../../api/questionsApi';
import Modal from '../../../components/modal/Modal';
import UpdateQuestionModal from './UpdateQuestionModal';

const QuestionCard = () => {
  const { state } = useAuth();
  const { token } = state;
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const formRef = useRef(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    text: '',
    options: ['', '', '', '', ''],
    correctAnswer: '',
    questionType: '',
    department: '',
  });

  const departments = [
    {
      value: 'Library and Information Science',
      label: 'Library and information science',
    },
    { value: 'Computer Engineering', label: 'Computer engineering' },
    { value: 'Computer Science', label: 'Computer science' },
    { value: 'Electrical Engineering', label: 'Electrical engineering' },
    { value: 'Accountancy', label: 'Accountancy' },
    { value: 'General Studies ', label: 'General Studies' },
  ];

  const questionTypes = [
    { value: 'general', label: 'General' },
    { value: 'departmental', label: 'Departmental' },
  ];

  // Fetch questions
  const { data: questions, isLoading } = useQuery({
    queryKey: ['questions'],
    queryFn: () => getAllQuestions(token),
  });

  // Create question mutation
  const createQuestionMutation = useMutation({
    mutationFn: (questionData) => createQuestion(questionData, token),
    onSuccess: () => {
      queryClient.invalidateQueries('questions');
      toast.success('Question created successfully');
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message || 'Error creating question');
    },
  });

  // Delete question mutation
  const deleteQuestionMutation = useMutation({
    mutationFn: (id) => deleteQuestion(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries('questions');
      toast.success('Question deleted successfully');
    },
  });

  // Update question mutation
  const updateQuestionMutation = useMutation({
    mutationFn: (data) => updateQuestion(data, token, editingQuestionId),
    onSuccess: () => {
      queryClient.invalidateQueries('questions');
      toast.success('Question updated successfully');
      resetForm();
      setIsEditing(false);
      setEditingQuestionId(null);
    },
    onError: (error) => {
      toast.error(error.message || 'Error updating question');
    },
  });

  // Bulk questions mutation
  const createBulkQuestionMutation = useMutation({
    mutationFn: (data) => createBulkQuestion(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries('questions');
      toast.success('Bulk questions created successfully');
      setActiveTab(0);
    },
    onError: (error) => {
      toast.error(error.message || 'Error creating bulk questions');
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const handleBulkUpload = async (file) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const formattedQuestions = jsonData.map((row) => ({
          text: row.text || '',
          options: [
            row.option1,
            row.option2,
            row.option3,
            row.option4,
            row.option5,
          ].filter(Boolean),
          correctAnswer: row.correctAnswer || '',
          questionType: row.questionType || '',
          department: row.department || '',
        }));

        createBulkQuestionMutation.mutate(formattedQuestions);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      toast.error('Error processing file');
    }
  };

  const handleEdit = (question) => {
    setFormData({
      text: question.text,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      questionType: question.questionType,
      department: question.department,
    });
    setIsEditing(true);
    setEditingQuestionId(question._id);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateQuestionMutation.mutate(formData);
    setIsUpdateModalOpen(false);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setIsEditing(false);
    setEditingQuestionId(null);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateQuestionMutation.mutate(formData);
    } else {
      createQuestionMutation.mutate(formData);
    }
  };

  const resetForm = () => {
    setFormData({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      questionType: '',
      department: '',
    });
  };

  const tabContent = [
    {
      title: 'Single Question',
      content: (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <SelectField
            label="Department"
            name="department"
            value={formData.department}
            options={[
              { value: '', label: 'Select Department' },
              ...departments,
            ]}
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

          <Button
            type="submit"
            label={isEditing ? 'Update Question' : 'Add Question'}
            disabled={
              isEditing
                ? updateQuestionMutation.isLoading
                : createQuestionMutation.isLoading
            }
          />
        </form>
      ),
    },
    {
      title: 'Bulk Questions',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Upload an Excel file with columns: text, option1, option2, option3,
            option4, option5, correctAnswer, questionType, department
          </p>
          <FileUpload
            accept=".xlsx,.xls"
            onChange={handleBulkUpload}
            label="Upload Questions Excel File"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Tabs tabs={tabContent} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions?.data?.map((question) => (
          <Card key={question._id} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold">{question.text}</h3>
              <div className="flex space-x-2">
                <Edit
                  className="cursor-pointer text-blue-500"
                  onClick={() => handleEdit(question)}
                />
                <Delete
                  className="cursor-pointer text-red-500"
                  onClick={() => deleteQuestionMutation.mutate(question._id)}
                />
              </div>
            </div>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    option === question.correctAnswer
                      ? 'bg-green-100 border-green-500'
                      : 'bg-gray-100'
                  }`}
                >
                  {option}
                </div>
              ))}
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-semibold">Type:</span>{' '}
                {question.questionType}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Department:</span>{' '}
                {question.department}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <UpdateQuestionModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleOptionChange={handleOptionChange}
        handleUpdateSubmit={handleUpdateSubmit}
        departments={departments}
        questionTypes={questionTypes}
        isLoading={updateQuestionMutation.isLoading}
      />
    </div>
  );
};

export default QuestionCard;
