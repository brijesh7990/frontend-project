import { useGetUserProfileQuery } from "../api/profileApi";
import { Profiles } from "../api/profileApi";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const {
    isLoading,
    error,
    data: profilesfrombackend,
  } = useGetUserProfileQuery();
  return (
    <div>
      {isLoading && <Spinner />}
      {error && <h1>Error occured brijesh dabhi</h1>}
      {profilesfrombackend && (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  ProfilePicture
                </th>
              </tr>
            </thead>
            <tbody>
              {profilesfrombackend?.map((profile: Profiles) => (
                <tr
                  key={profile.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {profile.id}
                  </th>
                  <td className="px-6 py-4">{profile.username}</td>
                  <td className="px-6 py-4">{profile.email}</td>
                  <td className="px-6 py-4">${profile.phone}</td>
                  <td className="px-6 py-4">
                    {profile.profile_pic ? (
                      <img
                        src={profile.profile_pic}
                        alt="not seen"
                        className="w-24 h-24"
                      />
                    ) : (
                      <img
                        src="https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="w-24 h-24"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HomePage;
