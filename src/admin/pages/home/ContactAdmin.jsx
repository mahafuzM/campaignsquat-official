import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import {
  Trash2,
  Mail,
  Loader2,
  Inbox,
  DollarSign,
  Briefcase,
  Clock,
  User,
  MoreVertical,
  CheckCircle,
  Phone
} from "lucide-react";

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("/api/contacts/all");
      setContacts(res.data.data || []);
    } catch (err) {
      console.error("Error fetching contacts");
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const deleteMsg = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

    setDeletingId(id);
    try {
      await axios.delete(`/api/contacts/${id}`);
      setContacts(contacts.filter((item) => item._id !== id));
      toast.success("Inquiry deleted successfully");
    } catch (err) {
      toast.error("Failed to delete inquiry");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/30 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F7A400] mb-2" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Accessing Inbox...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 font-sans">
      
      {/* Compact Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-6 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F7A400]/10 flex items-center justify-center shrink-0 border border-[#F7A400]/20">
            <Inbox className="text-[#F7A400]" size={16} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">Inquiry Manager</h1>
            <p className="text-xs text-gray-500 mt-1">Review and manage client contact requests</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight">
            {contacts.length} Total Records
          </div>
        </div>
      </div>

      {/* Modern Data Grid */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Client Details</th>
                <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Service & Project</th>
                <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Requirement</th>
                <th className="px-4 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider w-32">Timestamp</th>
                <th className="px-4 py-2 text-right text-[10px] font-bold text-gray-400 uppercase tracking-wider w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                          <User size={12} className="text-gray-400" />
                          {contact.fullName}
                        </span>
                        <div className="flex flex-col gap-0.5 mt-1">
                          <a href={`mailto:${contact.email}`} className="text-[10px] text-[#F7A400] hover:underline flex items-center gap-1">
                            <Mail size={10} /> {contact.email}
                          </a>
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <Phone size={10} /> {contact.whatsapp || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-900 text-white text-[9px] font-bold w-fit">
                          <Briefcase size={8} /> {contact.service || "N/A"}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 px-2 py-0.5 bg-emerald-50 rounded w-fit">
                          <DollarSign size={10} /> {contact.budget || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-[280px]">
                        <p className="text-[11px] text-gray-600 leading-relaxed italic line-clamp-2" title={contact.details}>
                          "{contact.details}"
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[10px] text-gray-500 font-medium">
                        <div className="flex items-center gap-1 text-gray-900">
                          <Clock size={10} className="text-gray-400" />
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </div>
                        <span className="ml-3.5 opacity-60">
                          {new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteMsg(contact._id)}
                        disabled={deletingId === contact._id}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-all disabled:opacity-50"
                      >
                        {deletingId === contact._id ? <Loader2 size={16} className="animate-spin text-red-500" /> : <Trash2 size={16} />}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-20">
                      <Inbox size={48} className="text-gray-400" />
                      <p className="text-xs font-bold uppercase tracking-widest mt-2">No messages found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ERP Footer Context */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2">
          <CheckCircle size={14} className="text-emerald-500" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Real-time sync active</span>
        </div>
        <div className="text-[10px] font-bold text-gray-300 uppercase italic">
          v2.5.0-ERP-STABLE
        </div>
      </div>

    </div>
  );
};

export default ContactAdmin;