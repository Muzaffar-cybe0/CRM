import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../Css/courses.css";
import { toast } from "react-toastify";
export default function Courses() {
  const today = new Date();
  const options = { month: "numeric", day: "numeric", year: "numeric" };
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [info, setInfo] = useState([]);
  const [idSave, setIdSave] = useState();
  const [idSaver_Ch, setIdSaver_Ch] = useState();
  const [V_display, setV_display] = useState(false);
  const [changer, setChanger] = useState(false);
  const [newTitle, setnewTitle] = useState({
    title: "",
  });
  const [updateTitle, setUpdateTitle] = useState()

  const Delete_div = useRef();
  const ChangeValue = useRef();
  const Update_input = useRef();
  
  const tooggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const Delete_Data = async () => {
    await axios.delete(`/courses/${idSave}`);
    toast("Deleted", { type: "info" });
    setTimeout(() => {
      Delete_div.current.style.opacity = "0";
    }, 700);
    setInfo(info.filter((course) => course.id !== idSave));
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
    const response = await axios.put(`/courses/${idSaver_Ch}`, { title: updateTitle });
    if (response.status === 200) {
      toast("Updated successfully", { type: "success" });
      setTimeout(() => {
        ChangeValue.current.style.opacity = "0";
      }, 700);

      // Update info state (optional)
      if (info?.length) {
        const updatedIndex = info.findIndex((course) => course.id === idSaver_Ch);
        if (updatedIndex !== -1) {
          const updatedInfo = [...info];
          updatedInfo[updatedIndex] = { ...updatedInfo[updatedIndex], title: updateTitle };
          setInfo(updatedInfo);
        }
      }
    } else {
      console.error("Error updating data:", response.data);
    }
  } catch (error) {
    console.error("Error updating data:", error);
  }
};
  const Ch_Get_ID = async (id, title) => {
    ChangeValue.current.style.zIndex = "99";
    setChanger(true);
    setIdSaver_Ch(id);
    Update_input.current.value = `${title}`
  };
  const Ch_Close = () => {
    ChangeValue.current.style.zIndex = "0";
    setChanger(false);
    console.log(ChangeValue);
  };

  const Api_Courses = () => {
    axios.post("/allCourses").then((obj) => setInfo(obj?.data));
  };

  useEffect(() => {
    Api_Courses();
  }, []);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const api = await axios.post("/createCourse", newTitle);
    if (api.status === 200) {
      console.log("Added");
      e.target[0].value = "";
      toast("Created succesfully", { type: "success" });
      Api_Courses();
    } else {
      console.log("Something went wrong");
      toast("Something went wrong", { type: "error" });
    }
  };

  return (
    <div
      className="courses_C"
      style={{ backgroundColor: isDarkMode ? "aqua" : "white" }}
    >
      <Navbar />
      <div className="courses">
        <div className="courses_child-1">
          <p>Courses</p>
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

        <div className="courses_child-2">
          <div className="C_Child2_1">
            <p>Add course:</p>
            <form className="form_addTeacher" onSubmit={(e) => handleSumbit(e)}>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="border border-gray-300 rounded-md py-2 focus:border-2 focus:border-blue-700 transition-colors  px-28 focus:outline-none peer bg-inherit"
                    onChange={(e) =>
                      setnewTitle((old) => ({ ...old, title: e.target.value }))
                    }
                  />
                  <label
                    htmlFor="username"
                    className="absolute text-gray-500 left-2 top-2 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
                  >
                    Title*
                  </label>
                </div>
              </div>

              <button type="submit">sumbit</button>
            </form>
          </div>
          <div className="C_Child2_2">
            <div className="child2_2-1">
              <div>
                <p>#</p>
              </div>
              <div>
                <p>Title</p>
              </div>
              <div>
                <p>Actions</p>
              </div>
            </div>
            {info?.length > 0 ? (
              info?.map((item, index) => {
                return (
                  <div className="child2_2-2" key={item.id}>
                    <div>
                      <p>{index}</p>
                    </div>
                    <div>
                      <p>{item.title}</p>
                    </div>
                    <div className="btn_part">
                      <button type="button" onClick={() => Get_ID(item.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          Ch_Get_ID(item.id, item.title);
                        }}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="loading">
                <h1>Loading...</h1>
              </div>
            )}
          </div>
        </div>
      </div>

      <dialog
        className="Delete_course"
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
        className="Change_Data"
        ref={ChangeValue}
        style={{ opacity: changer ? 1 : 0 }}
      >
        <div>
          <p>Edit Course</p>
        </div>

        <div>
          <p>Cou</p>
          <input
            type="text"
            ref={Update_input}
            onChange={(e)=> setUpdateTitle(e.target.value)}
          />
        </div>

        <div>
          <button type="button" onClick={() => Ch_Close()}>
            Cancel
          </button>
          <button type="button" onClick={()=>Change_Data()}>Submit</button>
        </div>
      </div>

    </div>
  );
}
