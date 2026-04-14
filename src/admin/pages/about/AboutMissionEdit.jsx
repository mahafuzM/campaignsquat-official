import React, { useState, useEffect } from "react";
import axios from "axios";

const AboutMissionEdit = () => {
  const [formData, setFormData] = useState({
    missionIcon: "",
    missionTitle: "",
    missionDesc: "",
    visionIcon: "",
    visionTitle: "",
    visionDesc: "",
  });

  useEffect(() => {
    axios.get("https://api.campaignsquat.com/api/about-mission").then((res) => {
      if (res.data) setFormData(res.data);
    });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://api.campaignsquat.com/api/about-mission/update",
        formData,
      );
      alert("Updated Successfully!");
    } catch (err) {
      alert("Error updating!");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-poppins text-black">
      <h2 className="text-2xl font-semibold text-black mb-6 border-b-4 border-[#F7A400] pb-2 inline-block">
        MISSION & VISION EDIT
      </h2>
      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Mission Section */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold mb-4 text-[#F7A400]">Our Mission Card</h3>
          <input
            className="w-full p-2 border mb-3"
            placeholder="SVG Icon Path"
            value={formData.missionIcon}
            onChange={(e) =>
              setFormData({ ...formData, missionIcon: e.target.value })
            }
          />
          <input
            className="w-full p-2 border mb-3"
            placeholder="Title"
            value={formData.missionTitle}
            onChange={(e) =>
              setFormData({ ...formData, missionTitle: e.target.value })
            }
          />
          <textarea
            className="w-full p-2 border h-32"
            placeholder="Description"
            value={formData.missionDesc}
            onChange={(e) =>
              setFormData({ ...formData, missionDesc: e.target.value })
            }
          />
        </div>
        {/* Vision Section */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-bold mb-4 text-[#F7A400]">Our Vision Card</h3>
          <input
            className="w-full p-2 border mb-3"
            placeholder="SVG Icon Path"
            value={formData.visionIcon}
            onChange={(e) =>
              setFormData({ ...formData, visionIcon: e.target.value })
            }
          />
          <input
            className="w-full p-2 border mb-3"
            placeholder="Title"
            value={formData.visionTitle}
            onChange={(e) =>
              setFormData({ ...formData, visionTitle: e.target.value })
            }
          />
          <textarea
            className="w-full p-2 border h-32"
            placeholder="Description"
            value={formData.visionDesc}
            onChange={(e) =>
              setFormData({ ...formData, visionDesc: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="md:col-span-2 bg-[#F7A400] text-black font-bold py-3 rounded hover:bg-black hover:text-white transition-all"
        >
          SAVE CHANGES
        </button>
      </form>
    </div>
  );
};

export default AboutMissionEdit;
