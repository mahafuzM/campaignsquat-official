import React, { useEffect, useState } from "react";
import axios from "../../../axiosConfig";
import toast from "react-hot-toast";
import {
  Trash2,
  Eye,
  FileText,
  Phone,
  Search,
  Calendar,
  Clock,
  Briefcase,
  Download,
  Loader2,
  CheckSquare,
  Square,
  Filter,
  Users,
  CheckCircle,
  MoreVertical,
  ChevronRight
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/applications/all");
      const actualData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setApplications(actualData);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    const dataToExport =
      selectedIds.length > 0
        ? applications.filter((app) => selectedIds.includes(app._id))
        : filteredApplications;

    if (dataToExport.length === 0) return toast.error("No data to export!");

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Position",
      "Experience",
      "Current Salary",
      "Expected Salary",
      "Date",
    ];
    const rows = dataToExport.map((app) => [
      `"${app.full_name || app.fullName || "N/A"}"`,
      `"${app.email}"`,
      `"${app.phone}"`,
      `"${app.applied_for || app.jobTitle || "General"}"`,
      `"${app.total_exp}"`,
      `"${app.current_salary}"`,
      `"${app.expected_salary}"`,
      `"${app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-GB") : "N/A"}"`,
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `applications_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Exported successfully!");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) return;

    setDeletingId(id);
    try {
      await axios.delete(`/api/applications/${id}`);
      setApplications(applications.filter((app) => app._id !== id));
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
      toast.success("Candidate deleted!");
    } catch (error) {
      toast.error("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(`?search=${value}`);
    } else {
      navigate(location.pathname);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const name = (app.full_name || app.fullName || "").toLowerCase();
    const email = (app.email || "").toLowerCase();
    const position = (app.applied_for || app.jobTitle || "").toLowerCase();
    const term = searchTerm.toLowerCase();
    return (
      name.includes(term) || email.includes(term) || position.includes(term)
    );
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredApplications.length && filteredApplications.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApplications.map((app) => app._id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const inputClass = "w-full border border-gray-200 outline-none focus:border-[#F7A400] transition-colors bg-gray-50 focus:bg-white text-gray-900 shadow-sm text-[13px] p-2 rounded";
  const labelClass = "text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/30 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F7A400] mb-2" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Scanning Database...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 font-sans">
      
      {/* Compact Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-6 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F7A400]/10 flex items-center justify-center shrink-0 border border-[#F7A400]/20">
            <Users className="text-[#F7A400]" size={16} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">Job Applications</h1>
            <p className="text-xs text-gray-500 mt-1">Review and manage candidate submissions</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button
            onClick={handleDownloadCSV}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-bold text-[11px] transition-colors shadow-sm border ${selectedIds.length > 0 ? "bg-[#F7A400] text-black border-transparent" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
          >
            <Download size={14} />
            {selectedIds.length > 0 ? `Export (${selectedIds.length})` : "Export CSV"}
          </button>
          <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight">
            {filteredApplications.length} Candidates
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6">
        <div className="relative group max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F7A400] transition-colors" size={16} />
          <input
            type="text"
            placeholder="Quick search: name, email, or position..."
            className="w-full bg-white border border-gray-100 p-2.5 pl-10 rounded-lg text-sm shadow-sm outline-none focus:border-[#F7A400] transition-all placeholder:text-gray-300"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-4 py-3 w-10 text-center">
                  <button onClick={toggleSelectAll} className="text-[#F7A400] hover:scale-110 transition-transform">
                    {selectedIds.length === filteredApplications.length && filteredApplications.length > 0 ? (
                      <CheckSquare size={16} />
                    ) : (
                      <Square size={16} className="text-gray-300" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Candidate Details</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Position</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Experience</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Salary (Curr/Exp)</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Documents</th>
                <th className="px-4 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-wider w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[13px]">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr
                    key={app._id}
                    className={`hover:bg-gray-50/30 transition-colors group ${selectedIds.includes(app._id) ? "bg-[#F7A400]/5" : ""}`}
                  >
                    <td className="px-4 py-4 text-center">
                      <button onClick={() => toggleSelectOne(app._id)} className="transition-transform active:scale-95">
                        {selectedIds.includes(app._id) ? (
                          <CheckSquare size={16} className="text-[#F7A400]" />
                        ) : (
                          <Square size={16} className="text-gray-300 group-hover:text-gray-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 group-hover:text-[#F7A400] transition-colors">{app.full_name || app.fullName}</span>
                        <div className="flex flex-col gap-0.5 mt-1">
                          <span className="text-[10px] text-gray-500 flex items-center gap-1 lowercase italic">
                             <span className="text-gray-400 select-none">@</span> {app.email}
                          </span>
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <Phone size={10} className="text-gray-300" /> {app.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-900 text-[#F7A400] text-[9px] font-bold w-fit uppercase tracking-tighter shadow-sm">
                          <Briefcase size={8} /> {app.applied_for || app.jobTitle || "GENERAL"}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400">
                           <Calendar size={10} /> {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                       <span className={`inline-block px-3 py-0.5 rounded text-[11px] font-bold border ${app.total_exp ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                        {app.total_exp || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <span className="text-red-500 font-bold uppercase select-none w-8">Curr:</span> {app.current_salary}
                        </span>
                        <span className="text-[10px] text-gray-700 flex items-center gap-1 font-bold">
                          <span className="text-emerald-500 font-bold uppercase select-none w-8">Exp:</span> {app.expected_salary}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toast((t) => (
                            <div className="text-xs p-2">
                              <p className="font-bold border-b border-gray-100 mb-2 pb-1 uppercase tracking-widest text-[#F7A400]">Cover Letter Preview</p>
                              <p className="leading-relaxed text-gray-600 italic whitespace-pre-wrap max-h-40 overflow-y-auto">"{app.cover_letter}"</p>
                              <button onClick={() => toast.dismiss(t.id)} className="mt-3 text-[10px] font-bold text-gray-400 hover:text-gray-900 border border-gray-100 px-2 py-1 rounded">CLOSE</button>
                            </div>
                          ), { duration: 6000 })}
                          className="flex items-center gap-1 text-[11px] font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-white border border-gray-200 px-3 py-1 rounded transition-all"
                        >
                          <FileText size={12} /> Letter
                        </button>
                        <a
                          href={app.cv_file}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 bg-gray-900 text-white hover:bg-[#F7A400] hover:text-black px-3 py-1 rounded-[5px] text-[11px] font-bold transition-all shadow-sm active:scale-95"
                        >
                          <MoreVertical size={12} className="rotate-90 select-none opacity-40" /> CV
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        <button
                          onClick={() => navigate(`/admin/application/${app._id}`)}
                          className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-all"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(app._id)}
                          disabled={deletingId === app._id}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                          title="Delete Candidate"
                        >
                          {deletingId === app._id ? <Loader2 size={16} className="animate-spin text-red-500" /> : <Trash2 size={16} />}
                        </button>
                        <div className="w-1 h-8 bg-[#F7A400] rounded-l ml-2" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-20">
                      <Users size={48} className="text-gray-400" />
                      <p className="text-xs font-bold uppercase tracking-widest mt-2">No candidates found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2">
          <CheckCircle size={14} className="text-emerald-500" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">HR System Connected</span>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-[10px] font-bold text-gray-300 uppercase italic">v2.8.0-TALENT-CORE</span>
        </div>
      </div>

    </div>
  );
};

export default AdminApplications;
