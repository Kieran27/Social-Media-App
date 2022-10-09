import { useState } from "react";

const CommentForm = () => {
  const [expandedForm, setExpandedForm] = useState(false);

  const toggleExpandedForm = () => {
    setExpandedForm((expandedForm) => !expandedForm);
  };

  return (
    <section className="flex flex-col border-b">
      <div className="px-5 py-3">
        <form>
          <textarea
            onFocus={() => setExpandedForm(true)}
            className="bg-gray-100 resize-none w-full px-5 py-3 rounded-3xl transition-colors"
            rows={expandedForm ? 5 : 1}
            placeholder="Add new comment..."
          />
          <div className="flex justify-end gap-5 mt-3">
            {expandedForm && (
              <>
                <button
                  onClick={toggleExpandedForm}
                  className="text-gray-700 hover:text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 text-white font-medium px-4 py-2 rounded-2xl hover:bg-emerald-300 flex items-center justify-center"
                >
                  Create Post
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CommentForm;
