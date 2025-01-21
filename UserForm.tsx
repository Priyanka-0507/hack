import React from 'react';
import { UserDetails } from './type';
import { User, Mail, Phone, Check } from 'lucide-react';

interface UserFormProps {
  onSubmit: (data: UserDetails) => void;
  initialData?: UserDetails;
  isUpdate?: boolean;
}

export function UserForm({ onSubmit, initialData, isUpdate = false }: UserFormProps) {
  const [formData, setFormData] = React.useState<UserDetails>(
    initialData || {
      name: '',
      email: '',
      phoneNumber: '',
      acceptedTerms: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.name && 
    formData.email && 
    formData.phoneNumber && 
    formData.acceptedTerms;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-emerald-700 mb-1">
          Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-emerald-500" />
          </div>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="pl-10 block w-full rounded-lg border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2.5 border transition-colors"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-emerald-700 mb-1">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-emerald-500" />
          </div>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10 block w-full rounded-lg border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2.5 border transition-colors"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-emerald-700 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-emerald-500" />
          </div>
          <input
            type="tel"
            id="phone"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="pl-10 block w-full rounded-lg border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2.5 border transition-colors"
            required
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          checked={formData.acceptedTerms}
          onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-colors"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-emerald-700">
          I accept the terms and conditions
        </label>
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-200
          ${isFormValid 
            ? 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500' 
            : 'bg-gray-400 cursor-not-allowed'}`}
      >
        <Check className="w-5 h-5 mr-2" />
        {isUpdate ? 'Update Details' : 'Submit'}
      </button>
    </form>
  );
}