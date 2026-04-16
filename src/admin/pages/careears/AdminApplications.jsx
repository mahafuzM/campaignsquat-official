import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTrash,
  FaEye,
  FaFilePdf,
  FaPhoneAlt,
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaBriefcase,
  FaDownload,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  // ✅ Local vs Production Dynamic API URL
  const BASE_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000" 
    : "https://api.campaignsquat.com";

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/applications/all`);
      // Data safety parsing
      const actualData = Array.isArray(response.data) ? response.data : (response.data.data || []);
      setApplications(actualData);
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [BASE_URL]);

  const handleDownloadCSV = () => {
    const dataToExport =
      selectedIds.length > 0
        ? applications.filter((app) => selectedIds.includes(app._id))
        : filteredApplications;

    if (dataToExport.length === 0) return alert("No data to export!");

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
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        await axios.delete(`${BASE_URL}/api/applications/${id}`);
        setApplications(applications.filter((app) => app._id !== id));
        setSelectedIds(selectedIds.filter((sid) => sid !== id));
      } catch (error) {
        alert("Failed to delete.");
      }
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

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredApplications.map((app) => app._id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen text-black font-poppins">
      {/* Header Section */}
      <div className="flex flex-col gap-6 mb-10 border-b border-gray-100 pb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-black tracking-tighter">
              JOB <span className="text-[#F7A400]">APPLICATIONS</span>
            </h1>
            <p className="text-blacl text-[12px] mt-2">
              Campaignsquat Ltd. Management
            </p>
          </div>
          {/* --- এক্সপোর্ট বাটন যোগ করা হয়েছে --- */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadCSV}
              className={`flex items-center gap-2 px-6 py-2 rounded-[5px] font-bold text-sm transition-all shadow-md active:scale-95 ${selectedIds.length > 0 ? "bg-[#F7A400] text-black" : "bg-black text-white"}`}
            >
              <FaDownload />{" "}
              {selectedIds.length > 0
                ? `Export (${selectedIds.length})`
                : "Export CSV"}
            </button>
            <div className="bg-black text-[#F7A400] px-5 py-2 rounded-[5px] font-bold text-sm shadow-lg">
              Total: {filteredApplications.length}
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-3xl">
          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search name, email or position..."
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-[5px] text-base focus:outline-none focus:border-[#F7A400] transition-all shadow-sm placeholder:text-gray-300"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[5px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[12px]  text-black font-bold ">
                {/* --- সিলেক্ট অল চেকবক্স --- */}
                <th className="px-6 py-4 w-10">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={
                      selectedIds.length === filteredApplications.length &&
                      filteredApplications.length > 0
                    }
                    className="accent-[#F7A400] cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4">Candidate & Contact</th>
                <th className="px-6 py-4 text-center">Applied Position</th>
                <th className="px-6 py-4">Applied Date & Time</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Salary (Current/Exp)</th>
                <th className="px-6 py-4">Cover Letter</th>
                <th className="px-6 py-4 text-center">Resume</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-20 text-center text-gray-400 animate-pulse font-medium text-lg"
                  >
                    Searching Database...
                  </td>
                </tr>
              ) : filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-20 text-center text-gray-500 bg-gray-50/30 font-medium"
                  >
                    No candidates found matching "{searchTerm}"
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr
                    key={app._id}
                    className={`hover:bg-gray-50/80 transition-all ${selectedIds.includes(app._id) ? "bg-[#F7A400]/5" : ""}`}
                  >
                    {/* --- একক চেকবক্স --- */}
                    <td className="px-6 py-5">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(app._id)}
                        onChange={() => toggleSelectOne(app._id)}
                        className="accent-[#F7A400] cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-900 text-base">
                        {app.full_name}
                      </div>
                      <div className="text-gray-500 text-xs flex items-center gap-2 mt-1 lowercase">
                        <span className="text-gray-400">📧</span> {app.email}
                      </div>
                      <div className="text-gray-500 text-xs flex items-center gap-2">
                        <FaPhoneAlt size={10} className="text-[#F7A400]" />{" "}
                        {app.phone}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-[#F7A400] rounded-[5px] text-[11px] font-black uppercase tracking-tighter">
                        <FaBriefcase size={12} />
                        {app.applied_for || app.jobTitle || "GENERAL"}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-700 flex items-center gap-2">
                          <FaCalendarAlt className="text-[#F7A400]" />
                          {app.createdAt
                            ? new Date(app.createdAt).toLocaleDateString(
                                "en-GB",
                              )
                            : "Date N/A"}
                        </div>
                        <div className="text-[10px] text-gray-400 flex items-center gap-2 ml-1">
                          <FaClock size={10} />
                          {app.createdAt
                            ? new Date(app.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Time N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-[5px] text-[11px] font-bold shadow-sm">
                        {app.total_exp}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-600 flex items-center gap-1">
                          <span className="font-semibold text-red-500 uppercase">
                            Current:
                          </span>{" "}
                          {app.current_salary}
                        </div>
                        <div className="text-xs text-gray-600 flex items-center gap-1">
                          <span className="font-semibold text-green-600 uppercase">
                            Expect:
                          </span>{" "}
                          {app.expected_salary}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <button
                        onClick={() =>
                          alert(`COVER LETTER:\n\n${app.cover_letter}`)
                        }
                        className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-white hover:bg-black transition-all bg-gray-100 px-4 py-2 rounded-[5px] shadow-sm"
                      >
                        <FaEye size={14} /> View Letter
                      </button>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <a
                        href={app.cv_file}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-black text-white hover:bg-[#F7A400] hover:text-black px-4 py-2 rounded-lg text-[11px] font-bold transition-all shadow-md active:scale-95"
                      >
                        <FaFilePdf size={14} /> PDF CV
                      </a>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() =>
                            navigate(`/admin/application/${app._id}`)
                          }
                          className="p-2 bg-gray-100 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all shadow-sm"
                          title="View Profile"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="p-2 bg-gray-100 text-red-500 hover:bg-red-500 hover:text-white rounded-[5px] transition-all shadow-sm"
                          title="Delete Application"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminApplications;
