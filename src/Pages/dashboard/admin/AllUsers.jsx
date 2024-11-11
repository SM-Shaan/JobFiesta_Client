import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const AllUsers = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: "https://dkfjsdofiewjlfsd/",
          scope: 'read:users',
        });

        const usersResponse = await fetch("https://dev-r7gyhhk1xc6innc8.us.auth0.com/api/v2/users", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IndvZkh0REx1cnVvNGRGQVhJeVAzcSJ9.eyJpc3MiOiJodHRwczovL2Rldi1yN2d5aGhrMXhjNmlubmM4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiIyemQ4b3UxWEk5ZDVyQ2FLQkdpSGVuVmJ2ckM4V3hlN0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9ka2Zqc2RvZmlld2psZnNkLyIsImlhdCI6MTcxODQ5MzAxMywiZXhwIjoxNzE4NTc5NDEzLCJzY29wZSI6InJlYWQ6dXNlcnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiIyemQ4b3UxWEk5ZDVyQ2FLQkdpSGVuVmJ2ckM4V3hlNyJ9.H_PoeY3jF9ngU0vTJRBk6DWSTDKnp3_sRXDqxIUx7zy-mwNAB-qy4YnF09G8353YJphbL04ygtfzU-Hk8cYgz7ACuTYa6Oxo3ig-mtTwRFxT9TgfkcWMMXg-UAgzd7TJsOPsXakXx71ilRymPJn1VxbEy-aXn9ySCrja-tuo9-ZvctDxTJGLBNfcwT31hbJycIplX0O12itil6E3kTE8Y0WlQ8pTi53YoCRgvaF2se96C2kpNvfZh3BT5lKBeEcYk_uuOIWpbGOErxTafl8YBDoLV2rN5DlNh6p6a1s6vaqSOPg0jFD35dw0js9U-Tb88LQJQsDO-eCPNgpgdTbhKw`,
          },
        });

        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users data');
        }

        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    if (isAuthenticated) {
      fetchUsers();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(filter.toLowerCase()) ||
    user.email?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    isAuthenticated && (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        <input
          type="text"
          placeholder="Search by name or email"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 mb-4"
        />

        <div>
          <table className="min-w-full bg-white mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Creation Date</th>
                <th className="py-2 px-4 border-b">Roles</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.user_id}>
                  <td className="py-2 px-4 border-b">{user.user_id}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">
                    {user.roles?.map((role, index) => (
                      <span key={index} className="block">{role.name}</span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default AllUsers;
