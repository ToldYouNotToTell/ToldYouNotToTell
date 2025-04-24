import { useState } from "react";

export default function PostForm({
  onClose,
  onSubmit,
  initialValues,
}: {
  onClose: () => void;
  onSubmit: (values: {
    title: string;
    content: string;
    category: string;
  }) => void;
  initialValues?: { title: string; content: string; category: string };
}) {
  const [values, setValues] = useState({
    title: initialValues?.title || "",
    content: initialValues?.content || "",
    category: initialValues?.category || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="add-post-form">
      <h2>{initialValues ? "Edit Note" : "New Note"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="postTitle">Title</label>
          <input
            type="text"
            id="postTitle"
            name="title"
            value={values.title}
            onChange={handleChange}
            required
            maxLength={100}
            minLength={10}
          />
          <div className="counter">{values.title.length}/100</div>
        </div>
        <div className="form-group">
          <label htmlFor="postCategory">Category</label>
          <select
            id="postCategory"
            name="category"
            value={values.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Work">Work</option>
            <option value="Love">Love</option>
            {/* Add all other categories */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="postContent">Content</label>
          <textarea
            id="postContent"
            name="content"
            rows={8}
            value={values.content}
            onChange={handleChange}
            required
            maxLength={650}
            minLength={100}
          />
          <div className="counter">{values.content.length}/650</div>
        </div>
        <div className="form-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">{initialValues ? "Save" : "Publish"}</button>
        </div>
      </form>
    </div>
  );
}
