import { useGetPrivacyRoleQuery } from "@/redux/apiSlices/ruleSlice";
import Spinner from "@/components/common/Spinner";

const PrivacyPolicyPublic = () => {
  const { data, isLoading } = useGetPrivacyRoleQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const privacyData = data?.data;

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-semibold">Privacy Policy</h1>

      <div dangerouslySetInnerHTML={{ __html: privacyData?.content || "" }} />
    </div>
  );
};

export default PrivacyPolicyPublic;
