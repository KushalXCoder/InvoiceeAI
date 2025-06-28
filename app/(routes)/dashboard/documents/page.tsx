import React from 'react';
import { BsThreeDots } from "react-icons/bs";

const DocumentPage = () => {
  return (
    <div className="documents-page row-span-2 col-start-2 p-4 font-facultyGlyphic">
      <div className="overflow-x-auto">
        <table className="w-2/5 border-2 rounded-lg table-auto bg-black text-white">
          <thead className="text-left text-sm font-semibold">
            <tr>
              <th className="px-6 py-3 border-b border-gray-300">Status</th>
              <th className="px-6 py-3 border-b border-gray-300">Email</th>
              <th className="px-6 py-3 border-b border-gray-300">Amount</th>
              <th className="px-6 py-3 border-b text-right"></th>
            </tr>
          </thead>
          <tbody className="text-sm font-poppins">
            <tr className="hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 border-b">Success</td>
              <td className="px-6 py-4 border-b">kushal@gmail.com</td>
              <td className="px-6 py-4 border-b">$300.00</td>
              <td className="px-6 py-4 border-b text-right">
                <button className="text-gray-500 hover:text-gray-200">
                  <BsThreeDots size={20}/>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 border-b">Success</td>
              <td className="px-6 py-4 border-b">kushal@gmail.com</td>
              <td className="px-6 py-4 border-b">$300.00</td>
              <td className="px-6 py-4 border-b text-right">
                <button className="text-gray-500 hover:text-gray-200">
                  <BsThreeDots size={20}/>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 border-b">Success</td>
              <td className="px-6 py-4 border-b">kushal@gmail.com</td>
              <td className="px-6 py-4 border-b">$300.00</td>
              <td className="px-6 py-4 border-b text-right">
                <button className="text-gray-500 hover:text-gray-200">
                  <BsThreeDots size={20}/>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 border-b">Success</td>
              <td className="px-6 py-4 border-b">kushal@gmail.com</td>
              <td className="px-6 py-4 border-b">$300.00</td>
              <td className="px-6 py-4 border-b text-right">
                <button className="text-gray-500 hover:text-gray-200">
                  <BsThreeDots size={20}/>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 border-b">Success</td>
              <td className="px-6 py-4 border-b">kushal@gmail.com</td>
              <td className="px-6 py-4 border-b">$300.00</td>
              <td className="px-6 py-4 border-b text-right">
                <button className="text-gray-500 hover:text-gray-200">
                  <BsThreeDots size={20}/>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentPage;