import React from 'react';
import { UserForm } from './UserForm';
import { UserDetailsDisplay } from './UserDetails';
import { UserDetails } from './type';

 export default function Profile() {
  const [userDetails, setUserDetails] = React.useState<UserDetails | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSubmit = (data: UserDetails) => {
    setUserDetails(data);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-emerald-800 text-center mb-8">
            User Profile Management
          </h1>
          
          <div className="flex justify-center">
            {!userDetails || isEditing ? (
              <UserForm 
                onSubmit={handleSubmit}
                initialData={userDetails || undefined}
                isUpdate={!!userDetails}
              />
            ) : (
              <UserDetailsDisplay
                user={userDetails}
                onEdit={() => setIsEditing(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

