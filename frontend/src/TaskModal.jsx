import React, { useState, useEffect } from "react";

export default function TaskModal({ isOpen, onClose, onSubmit, initialValue }) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(initialValue || "");
  }, [initialValue]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal show fade"
        style={{ display: "block" }}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {initialValue ? "Edit Task" : "Add Task"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(description);
                }}
              >
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Task Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoFocus
                  required
                />
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </>
  );
}
