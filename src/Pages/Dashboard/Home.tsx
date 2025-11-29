import { FileText, Users, Eye, ArrowUpRight, TrendingUp } from "lucide-react";

const statsData = [
  {
    title: "Total Users",
    value: 45,
    icon: <Users className="w-6 h-6 text-white" />,
    color: "from-yellow-400 to-amber-500",
    newThisWeek: 8,
  },
  {
    title: "Total Cases",
    value: 127,

    icon: <FileText className="w-6 h-6 text-white" />,
    color: "from-orange-400 to-orange-500",
    newThisWeek: 15,
  },
  {
    title: "Active Projects",
    value: 23,

    icon: <Users className="w-6 h-6 text-white" />,
    color: "from-blue-400 to-indigo-500",
    newThisWeek: 4,
  },
];

const projects = [
  {
    name: "Fiber Expansion",
    type: "Expansion",
    date: "18 Nov 2025",
    location: "Oak Tree Road, Pole 55",
  },
  {
    name: "Downtown Fiber",
    type: "Installation",
    date: "01 Aug 2025",
    location: "NY Tree Road , Pole 55",
  },
  {
    name: "Rural Broad Band",
    type: "Expansion",
    date: "05 Jul 2025",
    location: "Oak Tree Road, Pole 55",
  },
  {
    name: "Fiber Maintenance",
    type: "Maintenance",
    date: "18Jun 2025",
    location: "Oak Tree Road, Pole 55",
  },
  {
    name: "Downtown Fiber",
    type: "Installation",
    date: "01 Aug 2025",
    location: "Oak Tree Road, Pole 55",
  },
];

const Home: React.FC = () => {
  return (
    <div className=" bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Analytics Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl p-6 shadow-md  hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Background gradient circle */}
            <div
              className={`absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-20 bg-gradient-to-br ${stat.color} blur-3xl`}
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
                  className={`p-3 rounded-xl shadow-md bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400">New This Week</p>
                  <p className="text-sm font-bold text-gray-800">
                    {stat.newThisWeek}
                  </p>
                </div>
                <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                  View All
                  <ArrowUpRight className="w-4 h-4" />
                </button>
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
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-5 px-6 text-gray-800">{project.name}</td>
                  <td className="py-5 px-6 text-gray-600">{project.type}</td>
                  <td className="py-5 px-6 text-gray-600">{project.date}</td>
                  <td className="py-5 px-6 text-gray-600">
                    {project.location}
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <button className="text-green-500 hover:text-green-600 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-red-500 hover:text-red-600 transition-colors">
                        Delete
                      </button>
                    </div>
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
