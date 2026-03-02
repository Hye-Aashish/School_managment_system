"use client";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function AccordionItem({ title, amount, children, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div className="transition">
      {/* Header */}
      <div
        onClick={onToggle}
        className="accordion-header border-b border-bgray-300 dark:border-darkblack-400 cursor-pointer transition flex justify-between items-center h-16"
      >
        <div className="flex items-center gap-3">
          <FontAwesomeIcon
            icon={isOpen ? faMinus : faPlus}
            className="text-success-300 text-xl"
          />
          <h2 className="title text-bgray-900 dark:text-white md:text-lg text-sm font-bold">
            {title}
          </h2>
        </div>

        {amount && (
          <h2 className="title text-bgray-900 dark:text-white md:text-lg text-sm font-bold">
            {amount}
          </h2>
        )}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
        }}
        className="accordion-content pt-0 overflow-hidden transition-all duration-300 space-y-4"
      >
        {children}
      </div>
    </div>
  );
}
