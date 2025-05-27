// import React, { useState } from "react";

// const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(task.text);

//   const handleSave = () => {
//     if (editText.trim() === "") return; // Prevent empty save
//     onEdit(task.id, editText);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setEditText(task.text);
//     setIsEditing(false);
//   };

//   return (
//     <div
//       className={`flex justify-between items-center p-3 border rounded mb-2 ${
//         task.completed ? "bg-green-100 line-through" : "bg-white"
//       }`}
//     >
//       {isEditing ? (
//         <input
//           type="text"
//           className="flex-1 border px-2 py-1 rounded"
//           value={editText}
//           onChange={(e) => setEditText(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleSave();
//             if (e.key === "Escape") handleCancel();
//           }}
//           autoFocus
//         />
//       ) : (
//         <span
//           onClick={() => onToggle(task.id)}
//           className="cursor-pointer flex-1"
//         >
//           {task.text}
//         </span>
//       )}

//       <div className="ml-4 flex gap-2">
//         {isEditing ? (
//           <>
//             <button
//               onClick={handleSave}
//               className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
//             >
//               Save
//             </button>
//             <button
//               onClick={handleCancel}
//               className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => setIsEditing(true)}
//               className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => onDelete(task.id)}
//               className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskItem;
