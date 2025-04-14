// import React from "react";

// const ViewNote = ({ noteData, onClose }) => {
//   return (
//     <div>
//       <h2 className="text-lg font-bold mb-4">{noteData?.title}</h2>
//       <p className="text-sm text-gray-500 mb-2">
//         Created At: {noteData?.createdAt}
//       </p>
//       <div className="bg-gray-100 p-4 rounded-lg">
//         <p>{noteData?.content}</p>
//       </div>
//       <div className="flex flex-wrap mt-2">
//         {noteData?.tags.map((tag, idx) => (
//           <span
//             key={idx}
//             className="px-2 py-1 bg-blue-200 text-blue-800 rounded-lg text-xs mr-2"
//           >
//             #{tag}
//           </span>
//         ))}
//       </div>
//       <button
//         onClick={onClose}
//         className="mt-5 w-[100%] bg-slate-950 text-white px-10 py-2 rounded hover:bg-red-500"
//       >
//         Close
//       </button>
//     </div>
//   );
// };

// export default ViewNote;
import React from "react";
import moment from "moment";

const ViewNote = ({ noteData, onClose }) => {
  return (
    <div className="w-[100%] mx-auto bg-white p-5 rounded shadow-lg " >
      <h2 className="text-lg font-bold mb-4">{noteData?.title}</h2>
      <p className="text-sm text-gray-500 mb-2">
        Created At: {moment(noteData?.createdAt).format("MMMM Do YYYY, h:mm a")}
      </p>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="whitespace-pre-wrap">{noteData?.content}</p>
      </div>
      <div className="flex flex-wrap mt-2">
        {noteData?.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-blue-200 text-blue-800 rounded-lg text-xs mr-2"
          >
            #{tag}
          </span>
        ))}
      </div>
      <button
        onClick={onClose}
        className="mt-5 w-[100%] bg-slate-950 text-white px-10 py-2 rounded hover:bg-red-950 shadow-md"
      >
        Close
      </button>
    </div>
  );
};

export default ViewNote;
