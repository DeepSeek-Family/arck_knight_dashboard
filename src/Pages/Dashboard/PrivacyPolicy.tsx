import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import {
  useGetPrivacyRoleQuery,
  useCreatePrivacyRuleMutation,
} from "@/redux/apiSlices/ruleSlice";
import Spinner from "@/components/common/Spinner";

const PrivacyPolicy = () => {
  const editor = useRef<any>(null);
  const [content, setContent] = useState("");

  const { data, isLoading, refetch } = useGetPrivacyRoleQuery(undefined);
  const [createPrivacyRule] = useCreatePrivacyRuleMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-between">
        <Spinner />
      </div>
    );
  }

  const privacyData = data?.data;

  const handleSubmit = async () => {
    try {
      await createPrivacyRule({
        content: content || privacyData?.content,
        type: "privacy",
      });

      toast.success("Privacy policy updated successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to update privacy policy");
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-semibold">Privacy Policy</h1>

      <JoditEditor
        ref={editor}
        value={privacyData?.content || ""}
        onChange={(newContent) => setContent(newContent)}
      />

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-primary text-white w-[160px] h-[42px] rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
