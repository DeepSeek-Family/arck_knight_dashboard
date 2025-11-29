import Spinner from "@/components/common/Spinner";
import {
  useOverviewQuery,
  useRecentProjectQuery,
} from "@/redux/apiSlices/homeSlice";

import { FileText, Users, ArrowUpRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { data, isLoading } = useOverviewQuery();
  const { data: recentProject, isLoading: recentProjectLoading } =
    useRecentProjectQuery();

  // Function to convert Tailwind color classes to CSS gradient
  const getGradientStyle = (colorString: string) => {
    const colorMap: any = {
      "from-yellow-400 to-amber-500":
        "linear-gradient(to bottom right, #FBBF24, #F59E0B)",
      "from-blue-400 to-indigo-500":
        "linear-gradient(to bottom right, #60A5FA, #6366F1)",
      "from-orange-400 to-orange-500":
        "linear-gradient(to bottom right, #FB923C, #F97316)",
    };

    return colorMap[colorString] || 'linear-gradient(to bottom right, #60A5FA, #6366F1)';
  };

  if (isLoading || recentProjectLoading) {
    return (
      <div className="flex items-center justify-between">
        <Spinner />
      </div>
    );
  }

  const Overview = data?.data || [];
  console.log("O", Overview);
  const RecentProject = recentProject?.data || [];

  const iconMapper: any = {
    users: <Users className="w-6 h-6 text-white" />,
    projects: <Users className="w-6 h-6 text-white" />,
    cases: <FileText className="w-6 h-6 text-white" />,
  };

  return (
    <div className=" bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Analytics Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {Overview?.map((stat: any, index: number) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl p-6 shadow-md  hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Background gradient circle */}
            <div
              className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-20 blur-3xl"
              style={{
                backgroundImage: getGradientStyle(stat?.color),
              }}
            ></div>

            {/* Card content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {stat.value}
                    </h2>
                  </div>
                </div>

                <div
                  className="p-3 rounded-xl shadow-md flex items-center justify-center"
                  style={{
                    backgroundImage: getGradientStyle(stat.color),
                  }}
                >
                  {/* icon fix */}
                  {iconMapper[stat.icon] || (
                    <TrendingUp className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400">New This Week</p>
                  <p className="text-sm font-bold text-gray-800">
                    {stat.newThisWeek}
                  </p>
                </div>
                <Link to={stat.link}>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                    View All
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <h2 className="text-2xl font-bold p-6 pb-4 text-gray-800">
          Recent Projects
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#CCF3F5]">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Project Name
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {RecentProject.map((project: any, index: number) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-5 px-6 text-gray-800">{project.name}</td>
                  <td className="py-5 px-6 text-gray-600">
                    {project.user.name}
                  </td>
                  <td className="py-5 px-6 text-gray-600">
                    {project.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
