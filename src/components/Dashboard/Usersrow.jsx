import { useState } from "react";
import Swal from "sweetalert2";
import { BsFillTrash3Fill } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
const Usersrow = ({ user, index }) => {
  const { email, role, name, photo } = user || {};

  const [ibtn, setIbtn] = useState(false);
  const [abtn, setAbtn] = useState(false);

  const makeInstructor = (email) => {
    // console.log("clicked" + email);
    setIbtn(true),
      Swal.fire({
        icon: "success",
        title: "Congratulations",
        text: "The person is Instructor now",
      });
    const currentUser = {
      role: "Instructor",
    };
    return fetch(`https://criptofia-server.vercel.app/users/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    }).then((res) => res.json());
  };
  const makeAdmin = (email) => {
    // console.log("clicked" + email);
    setAbtn(true),
      Swal.fire({
        icon: "success",
        title: "Congratulations",
        text: "The person is Admin now",
      });
    const currentUser = {
      role: "Admin",
    };
    return fetch(`https://criptofia-server.vercel.app/users/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    }).then((res) => res.json());
  };

  const DeleteUser = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://criptofia-server.vercel.app/deleteUsers/${email}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <>
      <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
        <td className="p-3">
          <p>{index + 1}</p>
        </td>
        <td className="p-3">
          <img src={photo} className="w-12 h-12 rounded-xl" alt="" />
        </td>
        <td className="p-3">
          <p>{name}</p>
        </td>
        <td className="p-3">
          <p>{email}</p>
        </td>
        <td className="p-3">
          <p>{role}</p>
        </td>
        <td className="p-3 flex gap-1">
          <button
            disabled={ibtn}
            className={`bg-transparent ${
              ibtn ? "hover:bg-red-700 bg-red-700" : "hover:bg-blue-700"
            }  text-blue-600 hover:text-white rounded shadow hover:shadow-lg py-1 px-3 border border-blue-600 hover:border-transparent`}
            onClick={() => {
              makeInstructor(email);
            }}
          >
            Instructor
          </button>
          <button
            disabled={abtn}
            className={`bg-transparent ${
              abtn ? "hover:bg-red-700 bg-red-700" : "hover:bg-blue-700"
            } hover:bg-blue-700 text-blue-600 hover:text-white rounded shadow hover:shadow-lg py-1 px-3 border border-blue-600 hover:border-transparent`}
            onClick={() => {
              makeAdmin(email);
            }}
          >
            Admin
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              DeleteUser(email);
            }}
          >
            <BsFillTrash3Fill
              size={20}
              className="hover:text-red-600"
            ></BsFillTrash3Fill>
          </button>
        </td>
      </tr>
    </>
  );
};

export default Usersrow;
