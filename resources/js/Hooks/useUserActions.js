export default function useUserActions({ setData, post, put, destroy }) {
  const assignRole = (userId, role) => {
    if (!userId || !role) return;
    setData({ user_id: userId, role });
    post(route("admin.users.assignRole"));
  };

  const revokeRole = (userId, role) => {
    setData({ user_id: userId, role });
    post(route("admin.users.revokeRole"));
  };

  const givePermission = (userId, permission) => {
    if (!userId || !permission) return;
    setData({ user_id: userId, permission });
    post(route("admin.users.givePermissionTo"));
  };

  const updateUser = (id, payload) => {
    put(route("admin.users.update", id), payload);
  };

  const deleteUser = (id) => {
    if (confirm("Yakin hapus user ini?")) {
      destroy(route("admin.users.destroy", id));
    }
  };

  return { assignRole, revokeRole, givePermission, updateUser, deleteUser };
}
