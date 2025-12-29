

import {
  useGetRulesQuery,
} from "@/redux/apiSlices/ruleSlice";
import Spinner from "@/components/common/Spinner";

const TermsAndConditionPublic = () => {
  const { data, isLoading } = useGetRulesQuery("terms");

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
      <h1 className="text-2xl font-semibold">Terms and Conditions</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: termsAndConditionData?.content || "",
        }}
      />
    </div>
  );
};

export default TermsAndConditionPublic;
