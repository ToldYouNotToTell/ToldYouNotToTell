"use client";
import React from "react";

import { usePosts } from "@/contexts/PostsContext";
import { useWallet } from "@/hooks/useWallet";

export default function AddPostButton() {
  const {
    isAddPostFormVisible,
    addPostFormData,
    showAddPostForm,
    hideAddPostForm,
    setAddPostFormData,
    handleAddPostSubmit,
    CATEGORIES,
  } = usePosts();

  const { publicKey } = useWallet();

  return (
    <>
      <button className="add-post-btn" onClick={showAddPostForm}>
        + New Note
      </button>

      {isAddPostFormVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>New Note</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPostSubmit(publicKey?.toString());
              }}
            >
              <div className="form-group">
                <label htmlFor="title">
                  Title* ({addPostFormData.title.length}/100)
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  minLength={5}
                  maxLength={100}
                  value={addPostFormData.title}
                  onChange={(e) =>
                    setAddPostFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={addPostFormData.category}
                  onChange={(e) =>
                    setAddPostFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="form-select"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="content">
                  Content* ({addPostFormData.content.length}/600)
                </label>
                <textarea
                  id="content"
                  required
                  minLength={20}
                  maxLength={600}
                  rows={8}
                  value={addPostFormData.content}
                  onChange={(e) =>
                    setAddPostFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="form-textarea"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={hideAddPostForm}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
