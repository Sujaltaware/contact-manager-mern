import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { 
  FiUsers, 
  FiLogOut, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiMail, 
  FiPhone, 
  FiUser,
  FiX,
  FiCheck,
  FiAlertCircle
} from "react-icons/fi";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    }
  });

  const load = async () => {
    try {
      const res = await api.get("/contacts");
      setContacts(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setApiError("Failed to load contacts");
      }
    }
  };

  useEffect(() => {
    load();
  }, []);


  useEffect(() => {
    if (apiError || successMessage) {
      const timer = setTimeout(() => {
        setApiError("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [apiError, successMessage]);

  const onSubmit = async (data) => {
    try {
      setApiError("");
      if (editingId) {
        await api.put(`/contacts/${editingId}`, data);
        setSuccessMessage("Contact updated successfully!");
        setEditingId(null);
      } else {
        await api.post("/contacts", data);
        setSuccessMessage("Contact added successfully!");
      }
      reset();
      load();
    } catch (err) {
      setApiError(err.response?.data?.msg || "Failed to save contact");
    }
  };

  const onEdit = (contact) => {
    setEditingId(contact._id);
    setValue("name", contact.name);
    setValue("email", contact.email || "");
    setValue("phone", contact.phone || "");
  };

  const onCancelEdit = () => {
    setEditingId(null);
    reset();
  };

  const onDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await api.delete(`/contacts/${id}`);
      setSuccessMessage("Contact deleted successfully!");
      load();
    } catch (err) {
      setApiError("Failed to delete contact");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <FiUsers className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Contact Manager</h1>
                <p className="text-sm text-gray-500">Manage your contacts efficiently</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              <FiLogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(successMessage || apiError) && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            successMessage 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {successMessage ? (
              <FiCheck className="h-5 w-5 text-green-600 mr-3" />
            ) : (
              <FiAlertCircle className="h-5 w-5 text-red-600 mr-3" />
            )}
            <span className={`text-sm font-medium ${
              successMessage ? 'text-green-800' : 'text-red-800'
            }`}>
              {successMessage || apiError}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <FiPlus className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? "Edit Contact" : "Add New Contact"}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter full name"
                    {...register("name", { 
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters"
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="h-4 w-4 mr-1" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address"
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="h-4 w-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    {...register("phone", {
                      required: "Phone Number is required",
                      pattern: {
                        value: /^[\+]?[1-9][\d]{0,15}$/,
                        message: "Please enter a valid phone number"
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingId ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    <>
                      {editingId ? (
                        <>
                          <FiEdit2 className="inline h-4 w-4 mr-2" />
                          Update Contact
                        </>
                      ) : (
                        <>
                          <FiPlus className="inline h-4 w-4 mr-2" />
                          Add Contact
                        </>
                      )}
                    </>
                  )}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                  >
                    <FiX className="inline h-4 w-4 mr-2" />
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Saved Contacts</h2>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {contacts.length} {contacts.length === 1 ? 'Contact' : 'Contacts'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {contacts.length === 0 ? (
                  <div className="text-center py-12">
                    <FiUsers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts yet</h3>
                    <p className="text-gray-500">Get started by adding your first contact!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <div key={contact._id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                              <FiUser className="text-white h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                              <div className="space-y-1">
                                {contact.email && (
                                  <p className="text-sm text-gray-600 flex items-center">
                                    <FiMail className="h-4 w-4 mr-2 text-gray-400" />
                                    {contact.email}
                                  </p>
                                )}
                                {contact.phone && (
                                  <p className="text-sm text-gray-600 flex items-center">
                                    <FiPhone className="h-4 w-4 mr-2 text-gray-400" />
                                    {contact.phone}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button
                              onClick={() => onEdit(contact)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              <FiEdit2 className="h-3 w-3 mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => onDelete(contact._id)}
                              className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <FiTrash2 className="h-3 w-3 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}