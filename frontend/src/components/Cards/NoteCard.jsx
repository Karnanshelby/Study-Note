import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin, } from "react-icons/md";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import moment from "moment"

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onPinNote,
  onEdit,
  onOpen,
  onDelete,

}) => {
  return (
    <div className="border rounded p-4 h-52 bg-white hover:border-2 border-slate-950 shadow-black transition-all ease-in-out ml-12">
      <div className="flex items-center justify-between ">
        <div>
          <h6 className="text-sm font-bold">{title}</h6>
          <span className="text-xs font-bold text-green-700">{moment(date).format("Do MMM YYYY")}</span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>

      {/* <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p> */}

      <p className="text-xs font-semibold text-slate-600 mt-2 break-words line-clamp-4 overflow-hidden">
        {content}
      </p>

      <div className="flex items-center justify-between mt-8">
        <div className="text-xs font-extrabold   text-slate-500">{tags.map((item) => `#${item} `)}</div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn text-slate-950 hover:text-green-600"
            onClick={onEdit}
          />

          <MdDelete
            className="icon-btn text-slate-950 hover:text-red-500"
            onClick={onDelete}
          />

          <HiOutlineViewfinderCircle
            className="icon-btn text-slate-950 hover:text-purple-900"
            onClick={onOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
