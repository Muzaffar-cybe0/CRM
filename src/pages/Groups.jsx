import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import "../Css/groups.css";
import axios from "axios";
import { toast } from "react-toastify";
export default function Groups() {
  const today = new Date();
  const options = { month: "numeric", day: "numeric", year: "numeric" };
  const [info, setInfo] = useState([]);
  const [apiTeachers, setApiTeachers] = useState([]);
  const [apiGroup, setApiGroup] = useState([]);
  const [course, setCourse] = useState("");
  const [group, setGroup] = useState({
    course: "",
    days: "",
    end: "",
    start: "",
    teacher: "",
  });
  const [getDelete_Card_Id, setGetDelete_Card_Id] = useState("");
  const [switch_Delete_M, setSwitch_Delete_M] = useState(false);
  const Delete_Module_Ref = useRef();

  const [getChange_Card_Id, setGetChange_Card_Id] = useState("");
  const [switch_Change_M, setSwitch_Change_M] = useState(false);
  const Change_Module_Ref = useRef();

  const Api_Group = async () => {
    try {
      await axios.post("/groups").then((obj) => setApiGroup(obj?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const Api_Courses = async () => {
    try {
      await axios.post("/allCourses").then((obj) => setInfo(obj?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const Api_Teachers = async () => {
    try {
      await axios.post("/teachers").then((info) => setApiTeachers(info?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Create_Group = await axios.post("/createGroup", group);
      if (Create_Group.status === 200) {
        toast("Created successfully", { type: "success" });
        Api_Group();
        group.course = "";
        group.days = "";
        group.end = "";
        group.start = "";
        group.teacher = "";
      } else {
        toast("Something went wrong", { type: "error" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Open_Delet_Module = (id) => {
    setGetDelete_Card_Id(id);
    setSwitch_Delete_M(true);
    Delete_Module_Ref.current.style.zIndex = "99";
    Delete_Module_Ref.current.style.top = "30%";
    Delete_Module_Ref.current.style.right = "30%";
  };

  const Close_Delet_Module = () => {
    setSwitch_Delete_M(false);
    Delete_Module_Ref.current.style.zIndex = "0";
    Delete_Module_Ref.current.style.top = "-100%";
  };

  const Delete_Group = async () => {
    try {
      const delete_card = await axios.delete(`/groups/${getDelete_Card_Id}`);
      if (delete_card.status === 200) {
        toast("Created successfully", { type: "success" });
        Api_Group();
        Delete_Module_Ref.current.style.zIndex = "0";
        setSwitch_Delete_M(false);
        Delete_Module_Ref.current.style.top = "-100%";
      } else {
        toast("Something went wrong", { type: "error" });
        Delete_Module_Ref.current.style.zIndex = "0";
        setSwitch_Delete_M(false);
        Delete_Module_Ref.current.style.top = "-100%";
      }
    } catch (err) {
      console.log(err);
    }
  };

// ==========================================

  const Open_Change_Module =  (id) =>{
    setGetChange_Card_Id(id);
    setSwitch_Change_M(true);
    Change_Module_Ref.current.style.zIndex = "99";
    Change_Module_Ref.current.style.top = "10%";
    Change_Module_Ref.current.style.right = "30%";
  };

  const Close_Change_Module = () => {
    setSwitch_Delete_M(false);
    Change_Module_Ref.current.style.zIndex = "0";
    Change_Module_Ref.current.style.top = "-100%";
  };

  const Change_Group = async () =>{
    try{
      const Changer_Res = await axios.put(`/groups/${getChange_Card_Id}`,group);
      if (Changer_Res.status === 200) {
        toast("Updated successfully",{type:"success"})
        Api_Group();
        Change_Module_Ref.current.style.zIndex = "0";
        setSwitch_Change_M(false);
        Change_Module_Ref.current.style.top = "-100%";
      } else {
        toast("Something went wrong",{type:"error"});
        Change_Module_Ref.current.style.zIndex = "0";
        setSwitch_Change_M(false);
        Change_Module_Ref.current.style.top = "-100%";
      }
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    Api_Courses();
    Api_Teachers();
    Api_Group();
  }, []);

  return (
    <div className="groups_C">
      <Navbar />
      <div className="groups">
        <div className="groups_child-1">
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

        <div className="groups_child-2">
          <form className="Ggroup_Child2_child-1">
            <p className="title">Add group:</p>

            {info?.length > 0 ? (
              <select
                onChange={(e) => {
                  setCourse(e.target.value.split("%")[1]);
                  setGroup((old) => ({
                    ...old,
                    course: e.target.value.split("%")[0],
                  }));
                }}
              >
                <option>Select course*</option>
                {info?.map((item) => (
                  <option
                    value={item.id + "%" + item.title}
                    className={item.id}
                    key={item.id}
                  >
                    {item.title}
                  </option>
                ))}
              </select>
            ) : (
              <select>
                <option>Select course*</option>
              </select>
            )}

            <select
              onChange={(e) =>
                setGroup((old) => ({
                  ...old,
                  days: e.target.value,
                }))
              }
            >
              <option>Select days</option>
              <option>Even days</option>
              <option>Odd days</option>
              <option>Everyday</option>
            </select>

            {apiTeachers?.length >= 0 ? (
              <select
                onChange={(e) =>
                  setGroup((old) => ({
                    ...old,
                    teacher: e.target.value,
                  }))
                }
              >
                <option>Select teacher*</option>
                {apiTeachers
                  ?.filter(
                    (item) => !item.isDeleted && item.course.includes(course)
                  )
                  ?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            ) : (
              <select>
                <option>Select teacher*</option>
              </select>
            )}

            <div>
              <p>Start time*:</p>
              <input
                type="time"
                onChange={(e) =>
                  setGroup((old) => ({
                    ...old,
                    start: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <p>End time*:</p>
              <input
                type="time"
                onChange={(e) =>
                  setGroup((old) => ({
                    ...old,
                    end: e.target.value,
                  }))
                }
              />
            </div>

            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
          </form>

          <div className="Ggroup_Child2_child-2">
            {apiGroup.length > 0 ? (
              apiGroup.map((item) => {
                return (
                  <div key={item.group_id} className="groups_card">
                    <div className="groups_card_child-1">
                      <h1>{item.title}</h1>
                    </div>

                    <div className="groups_card_child-2">
                      <div>
                        <img src={item.image} alt="teacher" />
                        <div>
                          <p>
                            Teacher: <b>{item.teacher}</b>
                          </p>
                          <p>
                            Phone: <b>{item.phone}</b>
                          </p>
                        </div>
                      </div>

                      <div>
                        <p>
                          <b>Lesson days:</b> {item.days}
                        </p>
                        <p>
                          <b>Lesson hours:</b> {item.start_time} -{" "}
                          {item.end_time}
                        </p>
                        <p>
                          <b>Number of students:</b> {item.number_of_students}
                        </p>
                      </div>
                    </div>

                    <div className="groups_card_child-3">
                      <button
                        type="button"
                        onClick={() => Open_Delet_Module(item.group_id)}
                      >
                        Delete
                      </button>
                      <button type="button" onClick={()=>Open_Change_Module(item.group_id)}>Edit</button>
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

        <div
          className="Groups_delete_model"
          ref={Delete_Module_Ref}
          style={{ opacity: switch_Delete_M ? 1 : 0 }}
        >
          <div>
            <h1>Do you want to delete this group?</h1>
            <p>All students related to this group will be deleted!</p>
          </div>

          <div>
            <button type="button" onClick={() => Close_Delet_Module()}>
              Cancel
            </button>
            <button type="button" onClick={() => Delete_Group()}>
              Delete
            </button>
          </div>
        </div>

        <form className="Groups_Edit_model" 
        ref={Change_Module_Ref}
        style={{ opacity: switch_Change_M ? 1 : 0 }}
        >

          <div>
            <p>Edit Group</p>
            <p>Do not change any input unless you want
             to update this group!</p>
          </div>

          <div>

          {info?.length > 0 ? (
              <select
                onChange={(e) => {
                  console.log(e.target.value.split("%")[1]);
                  setCourse(e.target.value.split("%")[1]);
                  setGroup((old) => ({
                    ...old,
                    course: e.target.value.split("%")[0],
                  }));
                }}
              >
                <option>Select course*</option>
                {info?.map((item) => (
                  <option
                    value={item.id + "%" + item.title}
                    className={item.id}
                    key={item.id}
                  >
                    {item.title}
                  </option>
                ))}
              </select>
            ) : (
              <select>
                <option>Select course*</option>
              </select>
            )}

            <select
              onChange={(e) =>
                setGroup((old) => ({
                  ...old,
                  days: e.target.value,
                }))
              }
            >
              <option>Select days</option>
              <option>Even days</option>
              <option>Odd days</option>
              <option>Everyday</option>
            </select>

            {apiTeachers?.length >= 0 ? (
              <select
                onChange={(e) =>
                  setGroup((old) => ({
                    ...old,
                    teacher: e.target.value,
                  }))
                }
              >
                <option>Select teacher*</option>
                {apiTeachers
                  ?.filter(
                    (item) => !item.isDeleted && item.course.includes(course)
                  )
                  ?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            ) : (
              <select>
                <option>Select teacher*</option>
              </select>
            )}

            <div>
              <p>Start time*:</p>
              <input
                type="time"
                onChange={(e) =>
                  setGroup((old) => ({
                    ...old,
                    start: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <p>End time*:</p>
              <input
                type="time"
                onChange={(e) =>
                  setGroup((old) => ({
                    ...old,
                    end: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div>
            <button type="button" onClick={()=>Close_Change_Module()}>Cancel</button>
            <button type="button" onClick={()=>Change_Group()}>Submit</button>
          </div>

        </form>


    </div>
  );
}
