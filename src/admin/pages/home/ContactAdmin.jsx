import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Trash2,
  Mail,
  ExternalLink,
  Calendar,
  MessageSquare,
  Tag,
  DollarSign,
} from "lucide-react";

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchContacts = async () => {
    try {
      // ✅ App.jsx এ baseURL দেওয়া আছে, তাই শুধু এন্ডপয়েন্ট ব্যবহার করলেই হবে
      const res = await axios.get("/api/contacts/all");
      setContacts(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching contacts");
      setLoading(false);
    }
  };

  const deleteMsg = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this inquiry?",
      )
    ) {
      try {
        // ✅ baseURL অনুযায়ী পাথ আপডেট করা হয়েছে
        await axios.delete(`/api/contacts/${id}`);
        setContacts(contacts.filter((item) => item._id !== id));
      } catch (err) {
        alert("ডিলিট করতে সমস্যা হয়েছে!");
      }
    }
  };

  if (loading)
    return (
      <div className="p-10 bg-white text-black min-h-screen font-medium">
        Loading Database...
      </div>
    );

  return (
    <div className="p-4 md:p-10 bg-white min-h-screen text-black font-poppins">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-black  tracking-tight text-black">
            Inbox <span className="text-[#F7A400]">Manager</span>
          </h1>
          <p className="text-black text-[12px] font-bold  mt-1">
            Campaignsquat Ltd. Administration
          </p>
        </div>
        <div className="bg-black text-white px-4 py-1 rounded-[5px] text-[12px] font-bold">
          {contacts.length} Messages
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto border border-gray-200 rounded-[5px] shadow-sm">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-[14px] font-bold   text-black">
                Client Info
              </th>
              <th className="px-6 py-4 text-[14px] font-bold  text-black">
                Service & Budget
              </th>
              <th className="px-6 py-4 text-[14px] font-bold  text-black">
                Project Details
              </th>
              <th className="px-6 py-4 text-[14px] font-bold  text-black">
                Date
              </th>
              <th className="px-6 py-4 text-[14px] font-bold  text-black text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contacts.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-20 text-center text-gray-400 font-medium"
                >
                  কোন নতুন ডেটা পাওয়া যায়নি।
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  {/* Client Info */}
                  <td className="px-6 py-5">
                    <div className="font-bold text-black">
                      {contact.fullName}
                    </div>
                    <div className="text-[12px] text-gray-500 flex flex-col gap-1 mt-1">
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-1 hover:text-[#F7A400]"
                      >
                        <Mail size={12} /> {contact.email}
                      </a>
                      <span className="flex items-center gap-1">
                        {contact.whatsapp
                          ? `WA: ${contact.whatsapp}`
                          : "No Phone"}
                      </span>
                    </div>
                  </td>

                  {/* Service & Budget */}
                  <td className="px-6 py-5">
                    <div className="inline-block px-3 py-2 bg-black text-white text-[12px] font-black rounded  mb-1">
                      {contact.service || "N/A"}
                    </div>
                    <div className="text-[12px] font-semibold text-gray-700 flex items-center gap-1">
                      <DollarSign size={14} className="text-green-600" />{" "}
                      {contact.budget || "Unknown"}
                    </div>
                  </td>

                  {/* Details */}
                  <td className="px-6 py-5 max-w-[300px]">
                    <div className="text-[12px] text-gray-800 leading-relaxed line-clamp-2">
                      "{contact.details}"
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-[12px] text-gray-400 font-medium">
                    {new Date(contact.createdAt).toLocaleDateString()} <br />
                    {new Date(contact.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => deleteMsg(contact._id)}
                      className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Branding */}
      <p className="mt-8 text-center text-[14px] text-[#00f721] font-medium">
        Campaignsquat Admin Panel v2.0
      </p>
    </div>
  );
};

export default ContactAdmin;