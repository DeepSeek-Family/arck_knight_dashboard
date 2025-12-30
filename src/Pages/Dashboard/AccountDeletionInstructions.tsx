import { Trash2, AlertCircle } from "lucide-react";
import imageOne from "../../../public/1.png";
import imageTwo from "../../../public/2.png";
import imageThree from "../../../public/3.png";
const AccountDeletionInstructions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Trash2 className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Account Deletion</h1>
          </div>
          <p className="text-blue-100">
            How to permanently delete your account
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <p className="text-gray-700 leading-relaxed">
            Fiber Optic Chart and Tools provides users with the ability to
            permanently delete their account and all associated data. This page
            explains the account deletion process and what happens to your data.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-2">
                ⚠️ Important Notice
              </h3>
              <p className="text-red-800 leading-relaxed">
                Account deletion is permanent and cannot be undone. All your
                data, including projects, cases, notes, and settings will be
                permanently deleted from our servers.
              </p>
            </div>
          </div>
        </div>

        {/* How to Delete Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🗑️</span>
            <h2 className="text-2xl font-bold text-gray-900">
              How to Delete Your Account
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Open the App
                </h3>
                <p className="text-gray-700">
                  Launch Fiber Optic Chart and Tools on your device.
                </p>
                <div className="mt-3 bg-gray-100 rounded-lg p-4">
                  <img
                    src={imageOne}
                    alt="Profile icon location"
                    className="w-full rounded"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Navigate to Profile
                </h3>
                <p className="text-gray-700">
                  Tap on the profile icon in the bottom navigation bar.
                </p>
                <div className="mt-3 bg-gray-100 rounded-lg p-4">
                  <img
                    src={imageTwo}
                    alt="Profile icon location"
                    className="w-full rounded"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Confirm Your Password
                </h3>
                <p className="text-gray-700">
                  Enter your account password to confirm the deletion request.
                </p>
                <div className="mt-3 bg-gray-100 rounded-lg p-4">
                  <img
                    src={imageThree}
                    alt="Password confirmation"
                    className="w-full rounded"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Confirm Deletion
                </h3>
                <p className="text-gray-700">
                  Tap the "Delete" button to permanently delete your account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What Gets Deleted */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📊</span>
            <h2 className="text-2xl font-bold text-gray-900">
              What Gets Deleted
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            When you delete your account, the following data will be permanently
            removed:
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-blue-800 font-bold">•</span>
              <span className="text-gray-700">
                Your profile information and login credentials
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-800 font-bold">•</span>
              <span className="text-gray-700">
                All saved projects and case details
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-800 font-bold">•</span>
              <span className="text-gray-700">Notes and custom settings</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-800 font-bold">•</span>
              <span className="text-gray-700">
                App preferences and configurations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-800 font-bold">•</span>
              <span className="text-gray-700">
                Any other data associated with your account
              </span>
            </li>
          </ul>
        </div>

        {/* Need Help */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🆘</span>
            <h2 className="text-2xl font-bold text-gray-900">Need Help?</h2>
          </div>

          <p className="text-gray-700 mb-4">
            If you're having trouble deleting your account or have questions
            about the process, please contact us:
          </p>

          <div className="space-y-3 bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">📌</span>
              <div>
                <p className="font-semibold text-gray-900">
                  Arcaknight Alternatives
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">📧</span>
              <div>
                <p className="text-gray-700">arcaknightalt@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">📞</span>
              <div>
                <p className="text-gray-700">+1 980 422 8352</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">👤</span>
              <div>
                <p className="text-gray-700">Joseph V C Toto</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">🏠</span>
              <div>
                <p className="text-gray-700">
                  125 Teal Dr Youngsville, 27596-9704 United States
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletionInstructions;
