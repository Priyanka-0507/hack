import React from 'react';
import { UserDetails } from './type';
import { Pencil, User, Mail, Phone } from 'lucide-react';

interface UserDetailsProps {
  user: UserDetails;
  onEdit: () => void;
}

export function UserDetailsDisplay({ user, onEdit }: UserDetailsProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-emerald-800">User Details</h2>
        <button
          onClick={onEdit}
          className="p-2 text-emerald-600 hover:text-emerald-700 rounded-full hover:bg-emerald-50 transition-all duration-200"
          title="Edit details"
        >
          <Pencil size={20} />
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center">
          <User className="w-5 h-5 text-emerald-500 mr-3" />
          <div>
            <p className="text-sm font-medium text-emerald-600">Name</p>
            <p className="text-gray-800 font-medium">{user.name}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Mail className="w-5 h-5 text-emerald-500 mr-3" />
          <div>
            <p className="text-sm font-medium text-emerald-600">Email</p>
            <p className="text-gray-800 font-medium">{user.email}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Phone className="w-5 h-5 text-emerald-500 mr-3" />
          <div>
            <p className="text-sm font-medium text-emerald-600">Phone Number</p>
            <p className="text-gray-800 font-medium">{user.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}