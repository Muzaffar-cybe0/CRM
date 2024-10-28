import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import "../Css/students.css";
import axios from "axios";
import { toast } from "react-toastify";
export default function Students() {
  const today = new Date();
  const options = { month: "numeric", day: "numeric", year: "numeric" };

  const Input_name_Ref = useRef();
  const Input_phone_Ref = useRef();
  const Select_course_Ref = useRef();
  const Select_teacher_Ref = useRef();
  const Select_group_Ref = useRef();

  const [Api_Courses, setApi_Courses] = useState([]);
  const [Api_Teachers, setApi_Teachers] = useState([]);
  const [Api_Students, setApi_Students] = useState([]);
  const [apiGetGroup_Dates, setApiGetGroup_Dates] = useState([]);

  const [getId_Of_Course, setGetId_Of_Course] = useState("");
  const [getId_Of_Group, setGetId_Of_Group] = useState("");
  const [addStudent, setAddStudent] = useState({
    name: "",
    phone: "",
    group_id: "",
  });

  const Input_Change_Name_Ref = useRef();
  const Input_Change_Phone_Ref = useRef();
  const [changeStudent, setChangeStudent] = useState({
    group_id: "",
    name: "",
    phone: "",
  });

  const [turnOn_Delete, setTurnOn_Delete] = useState(false);
  const [turnOn_Edit, setTurnOn_Edit] = useState(false);

  const [saveStudent_Id_Delete, setSaveStudent_Id_Delete] = useState("");
  const [saveStudent_Id_Edit, setSaveStudent_Id_Edit] = useState("");

  const Api_Of_Courses = async () => {
    try {
      await axios.get("/courses").then((obj) => setApi_Courses(obj?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const Api_Of_Teachers = async () => {
    try {
      await axios
        .get(`/teachers/${getId_Of_Course}`)
        .then((info) => setApi_Teachers(info?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const Api_Get_Dates = async () => {
    try {
      await axios
        .get(`groups/teacher/${getId_Of_Group}`)
        .then((info) => setApiGetGroup_Dates(info?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const GetStudents = async () => {
    try {
      await axios.post("/students").then((info) => setApi_Students(info?.data));
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postInfo = await axios.post("/addStudent", addStudent);
      if (postInfo.status === 200) {
        toast("Added successfully", { type: "success" });
        GetStudents();
        Input_name_Ref.current.value = "";
        Input_phone_Ref.current.value = "";
      } else {
        toast("Something went wrong", { type: "error" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Open_Delete_Modal = (id) => {
    setTurnOn_Delete(true);
    setSaveStudent_Id_Delete(id);
  };

  const Close_Delete_Modal = () => {
    setTurnOn_Delete(false);
  };

  const Delete_Student = async () => {
    try {
      const Eliminate_Student = await axios.delete(
        `/students/${saveStudent_Id_Delete}`
      );
      if ((Eliminate_Student.status = 200)) {
        toast("Deleted successfully", { type: "info" });
        setTurnOn_Delete(false);
        GetStudents();
      } else {
        toast("Something went wrong", { type: "error" });
        setTurnOn_Delete(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //=========================================

  const Open_Edit_Modal = (id,name,phone) => {
    setTurnOn_Edit(true);
    setSaveStudent_Id_Edit(id);
    Input_Change_Name_Ref.current.value = `${name}` 
    Input_Change_Phone_Ref.current.value = `${phone}` 
  };

  const Close_Edit_Modal = () => {
    setTurnOn_Edit(false);
  };

  const Edit_Student = async () => {
    try {
      const Change_Student = await axios.put(
        `/students/${saveStudent_Id_Edit}`,
        changeStudent
      );
      if ((Change_Student.status = 200)) {
        toast("Updated successfully", { type: "info" });
        setTurnOn_Edit(false);
        GetStudents();
      } else {
        toast("Something went wrong", { type: "error" });
        setTurnOn_Edit(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Api_Of_Courses();
    GetStudents();
  }, []);

  return (
    <div className="students_C">
      <Navbar />

      <div className="students">
        <div className="students_child-1">
          <p>Students</p>
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

        <div className="students_child-2">
          <div className="students_Child2_child-1">
            <div className="title_of_students">
              <p>Add Student:</p>
            </div>

            <form className="Add_Student_form">
              <input
                type="text"
                placeholder="Name*"
                ref={Input_name_Ref}
                onChange={(e) =>
                  setAddStudent((old) => ({ ...old, name: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Phone*"
                ref={Input_phone_Ref}
                onChange={(e) =>
                  setAddStudent((old) => ({ ...old, phone: e.target.value }))
                }
              />

              <select
                ref={Select_course_Ref}
                onChange={(e) => {
                  setGetId_Of_Course(e.target.value.split("%")[0]);
                  Api_Of_Teachers();
                }}
              >
                <option>Select course*</option>
                {Api_Courses.length > 0 ? (
                  Api_Courses.map((item) => {
                    return (
                      <option value={item.id + "%" + item.title} key={item.id}>
                        {item.title}
                      </option>
                    );
                  })
                ) : (
                  <option>Select course*</option>
                )}
              </select>

              <select
                ref={Select_teacher_Ref}
                onChange={(e) => {
                  setGetId_Of_Group(e.target.value);

                  Api_Get_Dates();
                }}
              >
                <option>Select Teacher*</option>
                {Api_Teachers.length > 0
                  ? Api_Teachers?.filter(
                      (item) => !item.isDeleted && item.name.includes(name)
                    ).map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })
                  : ""}
              </select>

              <select
                ref={Select_group_Ref}
                onChange={(e) =>
                  setAddStudent((old) => ({ ...old, group_id: e.target.value }))
                }
              >
                <option>Select a group</option>
                {apiGetGroup_Dates.length > 0 ? (
                  apiGetGroup_Dates.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.days} {item.start_time} {item.end_time}
                      </option>
                    );
                  })
                ) : (
                  <option>Select a group</option>
                )}
              </select>

              <button
                type="button"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </button>
            </form>
          </div>

          <table className="students_Child2_child-2">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Group</th>
                <th>Teacher Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            {Api_Students.length > 0
              ? Api_Students.map((item, index) => {
                  return (
                    <tbody key={item.student_id}>
                      <tr>
                        <td>{index}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.course}</td>
                        <td>
                          {item.days} {item.start_time} - {item.end_time}
                        </td>
                        <td>{item.teacher}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => Open_Delete_Modal(item.student_id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button
                            type="button"
                            onClick={() => Open_Edit_Modal(item.student_id,item.name,item.phone)}
                          >
                            <i className="fa-solid fa-pen"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              : ""}
          </table>
        </div>
      </div>

      <div
        className="Delete_modal_Of_Students"
        style={{
          opacity: turnOn_Delete ? 1 : 0,
          zIndex: turnOn_Delete ? 3 : 1,
          top: turnOn_Delete ? "40%" : "-100%",
        }}
      >
        <div>
          <p>Do you want to delete this student?</p>
        </div>

        <div>
          <button type="button" onClick={() => Close_Delete_Modal()}>
            Cancel
          </button>
          <button type="button" onClick={() => Delete_Student()}>
            Delete
          </button>
        </div>
      </div>

      <div className="Edit_modal_Of_Students"
      style={{
          opacity: turnOn_Edit ? 1 : 0,
          zIndex: turnOn_Edit ? 3 : 1,
          top: turnOn_Edit ? "5%" : "-100%",
        }}
      >
        <div className="Edit_child-1">
          <p>Edit Student Details</p>
          <p>
            Do not change any input unless you want to edit this student's
            details!
          </p>
        </div>

        <div className="Edit_child-2">
          <div>
            <p>Student name:</p>   
          <input
            type="text"
            placeholder="Name*"
            ref={Input_Change_Name_Ref}
            onChange={(e) =>
              setChangeStudent((old) => ({ ...old, name: e.target.value }))
            }
          />
          </div>

          <div>
            <p>Phone number:</p>   
          <input
            type="text"
            placeholder="Phone*"
            ref={Input_Change_Phone_Ref}
            onChange={(e) =>
              setChangeStudent((old) => ({ ...old, phone: e.target.value }))
            }
          />
          </div>

          <select
            ref={Select_course_Ref}
            onChange={(e) => {
              setGetId_Of_Course(e.target.value.split("%")[0]);
              Api_Of_Teachers();
            }}
          >
            <option>Select course*</option>
            {Api_Courses.length > 0 ? (
              Api_Courses.map((item) => {
                return (
                  <option value={item.id + "%" + item.title} key={item.id}>
                    {item.title}
                  </option>
                );
              })
            ) : (
              <option>Select course*</option>
            )}
          </select>

          <select
            ref={Select_teacher_Ref}
            onChange={(e) => {
              setGetId_Of_Group(e.target.value);

              Api_Get_Dates();
            }}
          >
            <option>Select Teacher*</option>
            {Api_Teachers.length > 0
              ? Api_Teachers?.filter(
                  (item) => !item.isDeleted && item.name.includes(name)
                ).map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  );
                })
              : ""}
          </select>

          <select
            ref={Select_group_Ref}
            onChange={(e) =>
              setChangeStudent((old) => ({ ...old, group_id: e.target.value }))
            }
          >
            <option>Select a group</option>
            {apiGetGroup_Dates.length > 0 ? (
              apiGetGroup_Dates.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.days} {item.start_time} {item.end_time}
                  </option>
                );
              })
            ) : (
              <option>Select a group</option>
            )}
          </select>
        </div>

        <div className="Edit_child-3">
          <button type="button" onClick={()=> Close_Edit_Modal()}>Cancel</button>
          <button type="button" onClick={()=> Edit_Student()}>Submit</button>
        </div>
      </div>
    </div>
  );
}
