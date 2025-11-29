import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import Title from "../../components/common/Title";

import {
  useCreateRuleMutation,
  useGetRulesQuery,
} from "@/redux/apiSlices/ruleSlice";
import { message } from "antd";
import Spinner from "@/components/common/Spinner";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { data, isLoading } = useGetRulesQuery("terms");

  const [createRule, { isLoading: isCreating }] = useCreateRuleMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-between">
        <Spinner />
      </div>
    );
  }

  const termsAndConditionData = data?.data;

  return (
    <div className="p-6 bg-white">
      <Title className="mb-4">Terms and Conditions</Title>

      <JoditEditor
        ref={editor}
        value={termsAndConditionData?.content || ""}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={async () => {
            await createRule({
              type: "terms",
              content: content || termsAndConditionData?.content,
            });
            message.success("Terms and Conditions updated successfully");
          }}
          type="submit"
          className="bg-primary text-white w-[160px] h-[42px] rounded-lg"
        >
          {isCreating ? "Creating..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default TermsAndCondition;
