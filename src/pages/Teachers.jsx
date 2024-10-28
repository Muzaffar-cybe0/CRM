import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import "../Css/teachers.css";
import axios from "axios";
import { toast } from "react-toastify";
export default function Teachers() {
  const today = new Date();
  const options = { month: "numeric", day: "numeric", year: "numeric" };
  const [apiData, setApiData] = useState([]);
  const [apiTeachers, setApiTeachers] = useState([]);

  const [idSave, setIdSave] = useState();
  const [idSaver_Ch, setIdSaver_Ch] = useState();
  const [V_display, setV_display] = useState(false);
  const [changer, setChanger] = useState(false);
  const [updateTeacher, setUpdateTeacher] = useState({
    name: "",
    phone: "",
    course: "",
  });

  const Delete_div = useRef();
  const ChangeValue = useRef();
  const Update_inputName = useRef();
  const Update_inputPhone = useRef();
  const Update_Course = useRef();

  const Delete_Data = async () => {
    await axios.delete(`/teachers/${idSave}`);
    toast("Deleted", { type: "info" });
    setTimeout(() => {
      Delete_div.current.style.opacity = "0";
    }, 700);
    setApiTeachers(apiTeachers.filter((course) => course.id !== idSave));
  };

  const Get_ID = async (id) => {
    Delete_div.current.style.zIndex = "99";
    setV_display(true);
    setIdSave(id);
  };

  const Close = () => {
    Delete_div.current.style.zIndex = "0";
    setV_display(false);
  };

  // -----------------------------------------------------------------

  const Change_Data = async () => {
    try {
      const response = await axios.put(`/teachers/${idSaver_Ch}`, {
        name: updateTeacher.name,
        phone: updateTeacher.phone,
      });
      if (response.status === 200) {
        const updatedTeachers = [...apiTeachers]; // Copy existing teachers
        const updatedTeacherIndex = updatedTeachers.findIndex(
          (teacher) => teacher.id === idSaver_Ch
        );
        updatedTeachers[updatedTeacherIndex] = {
          ...updatedTeachers[updatedTeacherIndex],
          ...updateTeacher,
        };
        setApiTeachers(updatedTeachers);
        toast("Updated successfully", { type: "success" });
        console.log(updateTeacher);
        setTimeout(() => {
          ChangeValue.current.style.opacity = "0";
        }, 700);
        setChanger(false);
      } else {
        console.error("Error updating data:", response.data);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const Ch_Get_ID = async (id, name, phone, course) => {
    ChangeValue.current.style.zIndex = "99";
    setChanger(true);
    setIdSaver_Ch(id);
    Update_inputPhone.current.value = `${phone}`;
    Update_inputName.current.value = `${name}`;
    Update_Course.current.value = `${course}`;
  };

  const Ch_Close = () => {
    ChangeValue.current.style.zIndex = "0";
    setChanger(false);
  };

  const Api_Courses = async () => {
    await axios.post("/allCourses").then((obj) => setApiData(obj?.data));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.elements);

    let link;
    const formData = new FormData();

    formData.append("name", e.target.elements["name"].value);
    formData.append("phone", e.target.elements["phone"].value);
    formData.append("course", e.target.elements["course"].value);

    if (e.target.elements["image"].files) {
      const file = e.target.elements["image"].files[0];
      formData.append("file", file);
      formData.append("upload_preset", "start21");

      try {
        const cloudinaryResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dcypqxeyl/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const cloudinaryData = await cloudinaryResponse.json();
        link = cloudinaryData.secure_url; // Assuming response structure
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        toast("Error uploading image", { type: "error" });
        return; // Exit if upload fails
      }
    }

    try {
      const response = await axios.post("/addTeacher", {
        name: formData.get("name"),
        phone: formData.get("phone"),
        course: formData.get("course"),
        image: link,
      });

      toast(response?.data, { type: "success" });
      Api_Teachers()
    } catch (error) {
      toast(error?.response?.data, { type: "error" });
    }

    // e.target.reset(); // Reset form if needed
  }

  const Api_Teachers = async () => {
    await axios.post("/teachers").then((info) => setApiTeachers(info?.data));
  };

  useEffect(() => {
    Api_Courses();
    Api_Teachers();
  }, []);
  return (
    <div className="teachers_C">
      <Navbar />

      <div className="teachers">
        <div className="teachers_child-1">
          <p>Teachers</p>
          <p>{today.toLocaleDateString(undefined, options)}</p>
          <div className="my-body">
            <div className="darkThemeBtn">
              <input
                id="darkmode-toggle"
                type="checkbox"
                onClick={() => tooggle()}
              />
              <label htmlFor="darkmode-toggle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="sun"
                >
                  <g transform="translate(0 512) scale(.1 -.1)">
                    <path d="m2513 5105c-59-25-63-46-63-320 0-266 4-288 54-315 33-17 79-17 112 0 50 27 54 49 54 315 0 275-4 295-65 321-42 17-51 17-92-1z"></path>
                    <path d="m754 4366c-28-28-34-41-34-77 0-42 3-45 188-231l187-188h47c39 0 52 5 77 31 26 25 31 38 31 77v47l-188 187c-186 185-189 188-231 188-36 0-49-6-77-34z"></path>
                    <path d="m4058 4212-188-187v-47c0-39 5-52 31-77 25-26 38-31 77-31h46l188 188c186 186 188 188 188 231 0 36-6 49-34 77s-41 34-77 34c-42 0-45-3-231-188z"></path>
                    <path d="m2440 4224c-453-50-760-192-1056-488-264-264-419-570-475-936-17-109-17-371 0-480 56-366 211-672 475-936s570-419 936-475c109-17 371-17 480 0 366 56 672 211 936 475 225 225 358 455 438 758 38 143 50 249 50 418 0 219-30 388-104 590-137 372-450 719-813 901-143 72-315 128-474 154-89 15-329 26-393 19zm335-235c305-46 582-186 805-409 567-567 567-1473 0-2040s-1473-567-2040 0-567 1473 0 2040c328 328 777 476 1235 409z"></path>
                    <path d="m54 2651c-20-12-37-34-44-55-16-49 2-101 44-127 28-17 52-19 279-19 268 0 289 4 317 54 17 33 17 79 0 112-28 50-49 54-317 54-227 0-251-2-279-19z"></path>
                    <path d="m4512 2657c-73-41-73-155 0-193 21-11 81-14 275-14 227 0 251 2 279 19 42 26 60 78 44 127-7 21-24 43-44 55-28 17-52 19-281 19-181-1-256-4-273-13z"></path>
                    <path d="m908 1062c-185-186-188-189-188-231 0-36 6-49 34-77s41-34 77-34c43 0 45 2 231 188l188 188v46c0 39-5 52-31 77-25 26-38 31-77 31h-47l-187-188z"></path>
                    <path d="m3901 1219c-26-25-31-38-31-77v-47l188-187c186-185 189-188 231-188 36 0 49 6 77 34s34 41 34 77c0 43-2 45-188 231l-188 188h-46c-39 0-52-5-77-31z"></path>
                    <path d="m2540 663c-87-28-90-37-90-330 0-227 2-251 19-279 40-66 142-66 182 0 17 28 19 52 19 279 0 266-4 291-52 314-32 16-60 22-78 16z"></path>
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="moon"
                >
                  <g transform="translate(0 512) scale(.1 -.1)">
                    <path d="m2090 5105c-248-51-443-118-659-226-514-256-909-652-1161-1163-94-191-139-311-185-490-127-500-110-999 51-1468 133-389 331-706 624-998 403-404 875-642 1460-736 147-24 529-24 693 0 539 78 981 283 1390 644 362 319 647 793 766 1270 46 186 56 256 42 299-22 71-80 116-151 117-73 1-104-19-181-116-307-390-733-627-1233-689-119-14-385-7-501 15-582 106-1066 469-1321 991-120 246-171 452-181 731-21 586 230 1126 695 1493 96 75 117 107 117 177 0 85-67 155-153 160-26 1-76-3-112-11zm110-149c0-2-26-23-57-47-81-60-254-230-325-318-213-264-353-573-415-916-22-126-25-508-5-625 62-346 195-651 395-910 72-93 228-250 327-329 266-213 571-349 930-413 117-20 499-17 625 5 343 62 652 202 916 415 88 71 258 244 318 325 24 32 46 56 48 54s-8-60-23-128c-127-606-501-1155-1027-1505-780-521-1798-535-2602-36-295 183-594 482-777 777-335 539-445 1180-308 1795 138 621 515 1158 1060 1511 136 88 374 201 530 253 148 49 390 106 390 92z"></path>
                  </g>
                </svg>
              </label>
              <span className="fake-body"></span>
            </div>
          </div>
        </div>

        <div className="teachers_child-2">
          <div className="teachersChild2-1">
            <p>Add Teacher:</p>
            <form onSubmit={(e) => handleSubmit(e)} className="form_addTeacher">
              <input type="text" name="name" placeholder="Name*" />

              <input type="text" name="phone" placeholder="Phone*" />

              <input type="file" name="image"/>
              {apiData?.length > 0 ? (
                <select name="course">
                  <option>Select group*</option>
                  {apiData?.map((item) => (
                    <option key={item.id}>{item.title}</option>
                  ))}
                </select>
              ) : (
                <select>
                  <option>Select group*</option>
                </select>
              )}
              <button type="submit">Sumbit</button>
            </form>
          </div>

          <table className="teachersChild-2">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {apiTeachers?.length > 0 ? (
                apiTeachers?.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index}</td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img src={item.image} alt="user" />
                      </td>

                      <td>{item.name}</td>

                      <td>{item.phone}</td>

                      <td>{item.course}</td>
                      <td>
                        <button type="button" onClick={() => Get_ID(item.id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            Ch_Get_ID(
                              item.id,
                              item.name,
                              item.phone,
                              item.course
                            )
                          }
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <dialog
        className="Delete_course_Teachers"
        ref={Delete_div}
        style={{ opacity: V_display ? 1 : 0 }}
      >
        <h1>Do you want to delete this course?</h1>
        <p>
          All groups, students and teachers related to this course will be
          deleted!
        </p>
        <div>
          <button type="button" onClick={() => Close()}>
            Cancel
          </button>
          <button type="button" onClick={() => Delete_Data()}>
            Delete
          </button>
        </div>
      </dialog>

      <div
        className="Change_Data_Teachers"
        ref={ChangeValue}
        style={{ opacity: changer ? 1 : 0 }}
      >
        <div>
          <p>Edit Course</p>
        </div>

        <div>
          <p>Edit Teacher</p>
          <input
            type="text"
            ref={Update_inputName}
            onChange={(e) =>
              setUpdateTeacher((old) => ({ ...old, name: e.target.value }))
            }
          />
          <input
            type="text"
            ref={Update_inputPhone}
            onChange={(e) =>
              setUpdateTeacher((old) => ({ ...old, phone: e.target.value }))
            }
          />
          <span>
            <p>
              Course: <span>(Do not unless you want to change)</span>
            </p>
            {apiData?.length > 0 ? (
              <select
                ref={Update_Course}
                onChange={(e) =>
                  setUpdateTeacher((old) => ({
                    ...old,
                    course: e.target.value,
                  }))
                }
              >
                <option>Select group*</option>
                {apiData?.map((item) => (
                  <option key={item.id}>{item.title}</option>
                ))}
              </select>
            ) : (
              <select>
                <option>Select teacher*</option>
              </select>
            )}
          </span>
        </div>

        <div>
          <button type="button" onClick={() => Ch_Close()}>
            Cancel
          </button>
          <button type="button" onClick={() => Change_Data()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
